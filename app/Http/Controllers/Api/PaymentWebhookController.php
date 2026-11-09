<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request)
    {
        Log::info('Webhook hit', $request->all());

        $payload = $request->all();

        if (empty($payload['reference']) || empty($payload['status'])) {
            return response()->json(['error' => 'Invalid payload'], 400);
        }

        $subscription = Subscription::where('reference', $payload['reference'])->first();
        if (!$subscription) {
            return response()->json(['error' => 'Subscription not found'], 404);
        }

        switch ($payload['status']) {
            case 'completed':
            case 'success':
                $this->completePayment($subscription, $payload);
                break;
            case 'failed':
            case 'cancelled':
                $this->failPayment($subscription, $payload);
                break;
            default:
                Log::warning('Unknown webhook status', $payload);
        }

        return response()->json(['status' => 'ok']);
    }

    private function completePayment($subscription, $payload)
    {
        Payment::create([
            'subscription_id' => $subscription->id,
            'transaction_id' => $payload['transaction_id'] ?? 'webhook-' . time(),
            'amount' => $subscription->amount,
            'payment_method' => $subscription->payment_method,
            'status' => 'completed',
            'gateway_response' => $payload,
        ]);

        $subscription->update([
            'status' => 'active',
            'transaction_id' => $payload['transaction_id'] ?? null,
            'start_date' => now(),
            'end_date' => $subscription->calculateEndDate(),
        ]);

        Log::info('Subscription activated via webhook', ['ref' => $subscription->reference]);
    }

    private function failPayment($subscription, $payload)
    {
        Payment::create([
            'subscription_id' => $subscription->id,
            'transaction_id' => $payload['transaction_id'] ?? null,
            'amount' => $subscription->amount,
            'payment_method' => $subscription->payment_method,
            'status' => 'failed',
            'gateway_response' => $payload,
        ]);

        $subscription->update(['status' => 'cancelled']);
    }
}