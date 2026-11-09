<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MpesaPaymentController extends Controller
{
    private $consumerKey;
    private $consumerSecret;
    private $shortcode;
    private $baseUrl;
    private $passkey;

    public function __construct()
    {
        $this->consumerKey = env('MPESA_CONSUMER_KEY');
        $this->consumerSecret = env('MPESA_CONSUMER_SECRET');
        $this->shortcode = env('MPESA_SHORTCODE');
        $this->passkey = env('MPESA_PASSKEY');
        $this->baseUrl = env('MPESA_ENV') === 'sandbox' 
            ? 'https://sandbox.m-pesa.com/openapi/v1'
            : 'https://api.m-pesa.com/openapi/v1';
    }

    /**
     * Get OAuth 2.0 Access Token
     */
    private function getAccessToken()
    {
        $response = Http::withBasicAuth($this->consumerKey, $this->consumerSecret)
            ->post($this->baseUrl . '/oauth/v1/token', [
                'grant_type' => 'client_credentials'
            ]);

        if ($response->successful()) {
            return $response->json()['access_token'];
        }

        Log::error('Failed to get M-Pesa access token', [
            'response' => $response->body()
        ]);

        throw new \Exception('Failed to authenticate with M-Pesa');
    }

    /**
     * Initiate C2B Single Payment
     */
    public function initiate(Request $request)
    {
        $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
            'phone_number' => 'required|string|regex:/^\+266[5-8][0-9]{7}$/',
        ]);

        $subscription = Subscription::findOrFail($request->subscription_id);

        // Format phone number (ensure +266 format)
        $phoneNumber = $this->formatPhoneNumber($request->phone_number);

        try {
            $token = $this->getAccessToken();

            $payload = [
                'from' => [
                    'phoneNumber' => $phoneNumber,
                    'currency' => 'LSL',
                    'amount' => number_format($subscription->amount, 2, '.', ''),
                ],
                'to' => [
                    'shortCode' => $this->shortcode,
                    'accountNumber' => 'SUB-' . $subscription->reference,
                ],
                'reference' => $subscription->reference,
                'description' => 'Subscription payment - ' . $subscription->plan,
                'callbackUrl' => env('MPESA_CALLBACK_URL'),
                'timeout' => 300,
            ];

            $response = Http::withToken($token)
                ->post($this->baseUrl . '/c2b/v1/single/payment', $payload);

            if ($response->successful()) {
                $data = $response->json();
                
                // Store transaction ID
                $subscription->update([
                    'transaction_id' => $data['transactionId'] ?? null,
                ]);

                Log::info('M-Pesa C2B payment initiated', [
                    'reference' => $subscription->reference,
                    'transactionId' => $data['transactionId'] ?? null,
                    'phone' => $phoneNumber,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Payment initiated. Please check your phone for the M-Pesa push notification.',
                    'transactionId' => $data['transactionId'] ?? null,
                    'reference' => $subscription->reference,
                ]);
            }

            Log::error('M-Pesa C2B payment failed', [
                'reference' => $subscription->reference,
                'response' => $response->body(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment initiation failed. Please try again.',
                'error' => $response->json()['message'] ?? 'Unknown error',
            ], 400);

        } catch (\Exception $e) {
            Log::error('M-Pesa payment exception', [
                'reference' => $subscription->reference,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment failed. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Callback Webhook Handler
     */
    public function callback(Request $request)
    {
        Log::info('M-Pesa callback received', $request->all());

        $data = $request->all();

        // Verify signature (optional but recommended)
        // $signature = $request->header('X-MPesa-Signature');
        // if (!$this->verifySignature($signature, $request->getContent())) {
        //     return response()->json(['error' => 'Invalid signature'], 401);
        // }

        $resultCode = $data['resultCode'] ?? null;
        $transactionId = $data['transactionId'] ?? null;
        $reference = $data['reference'] ?? null;

        if (!$reference) {
            Log::warning('M-Pesa callback missing reference', $data);
            return response()->json(['error' => 'Reference missing'], 400);
        }

        $subscription = Subscription::where('reference', $reference)->first();

        if (!$subscription) {
            Log::warning('M-Pesa callback: Subscription not found', ['reference' => $reference]);
            return response()->json(['error' => 'Subscription not found'], 404);
        }

        if ($resultCode === '0') {
            // Success
            $this->completePayment($subscription, $transactionId, $data);
        } else {
            // Failure
            $this->failPayment($subscription, $transactionId, $data);
        }

        return response()->json(['status' => 'received']);
    }

    /**
     * Complete payment and activate subscription
     */
    private function completePayment($subscription, $transactionId, $data)
    {
        \App\Models\Payment::create([
            'subscription_id' => $subscription->id,
            'transaction_id' => $transactionId ?? 'mpesa-' . time(),
            'amount' => $subscription->amount,
            'payment_method' => 'mpesa',
            'status' => 'completed',
            'gateway_response' => $data,
        ]);

        $subscription->update([
            'status' => 'active',
            'transaction_id' => $transactionId,
            'start_date' => now(),
            'end_date' => $subscription->calculateEndDate(),
        ]);

        Log::info('Subscription activated via M-Pesa', [
            'reference' => $subscription->reference,
            'transactionId' => $transactionId,
        ]);
    }

    /**
     * Handle failed payment
     */
    private function failPayment($subscription, $transactionId, $data)
    {
        \App\Models\Payment::create([
            'subscription_id' => $subscription->id,
            'transaction_id' => $transactionId ?? 'failed-' . time(),
            'amount' => $subscription->amount,
            'payment_method' => 'mpesa',
            'status' => 'failed',
            'gateway_response' => $data,
        ]);

        $subscription->update(['status' => 'cancelled']);

        Log::warning('M-Pesa payment failed', [
            'reference' => $subscription->reference,
            'resultCode' => $data['resultCode'] ?? 'unknown',
            'resultDescription' => $data['resultDescription'] ?? 'No description',
        ]);
    }

    /**
     * Format phone number to +266 format
     */
    private function formatPhoneNumber($phone)
    {
        // Remove any non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);
        
        // If it starts with 0, replace with 266
        if (substr($phone, 0, 1) === '0') {
            $phone = '266' . substr($phone, 1);
        }
        
        // If it starts with 266, add +
        if (substr($phone, 0, 3) === '266') {
            return '+' . $phone;
        }
        
        // If it's a 9-digit number (local format without 0)
        if (strlen($phone) === 9) {
            return '+266' . $phone;
        }
        
        // Default: assume it's already in +266 format
        return '+' . $phone;
    }

    /**
     * Verify webhook signature
     */
    private function verifySignature($signature, $payload)
    {
        // Implement signature verification using your consumer secret
        $computed = hash_hmac('sha256', $payload, $this->consumerSecret);
        return hash_equals($computed, $signature);
    }
}