<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $plans = [
        'basic' => ['price' => 5000, 'label' => 'Basic'],
        'professional' => ['price' => 12000, 'label' => 'Professional'],
        'enterprise' => ['price' => 25000, 'label' => 'Enterprise'],
    ];

    /**
     * Initiate a payment for subscription
     */
    public function initiate(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:basic,professional,enterprise',
            'payment_method' => 'required|in:mpesa,ecocash,bank',
        ]);

        $constructor = $request->user()->constructor;

        // Check if already has active subscription
        if ($constructor->hasActiveSubscription()) {
            return response()->json([
                'message' => 'You already have an active subscription.'
            ], 400);
        }

        $plan = $this->plans[$request->plan];
        $amount = $plan['price'];

        // Create subscription record
        $subscription = Subscription::create([
            'constructor_id' => $constructor->id,
            'plan' => $request->plan,
            'amount' => $amount,
            'payment_method' => $request->payment_method,
            'reference' => Subscription::generateReference(),
            'status' => 'pending',
        ]);

        // Redirect to payment gateway based on method
        $paymentUrl = $this->getPaymentUrl($subscription, $request->payment_method);

        return response()->json([
            'subscription' => $subscription,
            'payment_url' => $paymentUrl,
            'reference' => $subscription->reference,
        ]);
    }

    private function getPaymentUrl($subscription, $method)
    {
        // In production, you'd integrate with actual payment gateway
        $baseUrl = config('app.url');
        return $baseUrl . '/api/payments/' . $method . '/redirect/' . $subscription->reference;
    }

    /**
     * Simulated payment redirect
     */
    public function redirect($method, $reference)
    {
        $subscription = Subscription::where('reference', $reference)->firstOrFail();
        // In real implementation, redirect to payment gateway
        return response()->json([
            'message' => "Redirect to $method payment gateway",
            'reference' => $reference,
            'subscription' => $subscription,
        ]);
    }

    /**
     * Webhook handler
     */
    public function webhook(Request $request)
    {
        Log::info('Payment webhook received', $request->all());

        $data = $request->all();
        $reference = $data['reference'] ?? null;
        $status = $data['status'] ?? null;
        $transactionId = $data['transaction_id'] ?? null;

        if (!$reference) {
            return response()->json(['error' => 'Reference missing'], 400);
        }

        $subscription = Subscription::where('reference', $reference)->first();

        if (!$subscription) {
            return response()->json(['error' => 'Subscription not found'], 404);
        }

        if ($status === 'completed' || $status === 'success') {
            $this->completePayment($subscription, $transactionId, $data);
        } elseif ($status === 'failed' || $status === 'cancelled') {
            $this->failPayment($subscription, $data);
        }

        return response()->json(['status' => 'received']);
    }

    private function completePayment($subscription, $transactionId, $gatewayData)
    {
        Payment::create([
            'subscription_id' => $subscription->id,
            'transaction_id' => $transactionId,
            'amount' => $subscription->amount,
            'payment_method' => $subscription->payment_method,
            'status' => 'completed',
            'gateway_response' => $gatewayData,
        ]);

        $subscription->update([
            'status' => 'active',
            'transaction_id' => $transactionId,
            'start_date' => now(),
            'end_date' => $subscription->calculateEndDate(),
        ]);

        Log::info('Subscription activated', ['reference' => $subscription->reference]);
    }

    private function failPayment($subscription, $gatewayData)
    {
        Payment::create([
            'subscription_id' => $subscription->id,
            'transaction_id' => $gatewayData['transaction_id'] ?? null,
            'amount' => $subscription->amount,
            'payment_method' => $subscription->payment_method,
            'status' => 'failed',
            'gateway_response' => $gatewayData,
        ]);

        $subscription->update(['status' => 'cancelled']);
    }

    public function status($reference)
    {
        $subscription = Subscription::where('reference', $reference)
            ->with('payments')
            ->firstOrFail();

        return response()->json($subscription);
    }
}