<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    protected $fillable = [
        'constructor_id', 'plan', 'status', 'amount', 'payment_method',
        'transaction_id', 'reference', 'start_date', 'end_date'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function constructor(): BelongsTo
    {
        return $this->belongsTo(Constructor::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Check if the subscription is active
     */
    public function isActive(): bool
    {
        return $this->status === 'active' && ($this->end_date === null || $this->end_date > now());
    }

    /**
     * Generate a unique reference
     */
    public static function generateReference(): string
    {
        return 'SUB-' . strtoupper(uniqid());
    }

    /**
     * Calculate end date based on plan (30 days for all plans)
     */
    public function calculateEndDate(): \Carbon\Carbon
    {
        $days = match($this->plan) {
            'basic' => 30,
            'professional' => 30,
            'enterprise' => 30,
            default => 30,
        };
        return now()->addDays($days);
    }

    /**
     * Get the plan label
     */
    public function getPlanLabelAttribute(): string
    {
        return match($this->plan) {
            'basic' => 'Basic',
            'professional' => 'Professional',
            'enterprise' => 'Enterprise',
            default => ucfirst($this->plan),
        };
    }

    /**
     * Get the plan price
     */
    public function getPlanPriceAttribute(): int
    {
        return match($this->plan) {
            'basic' => 5000,
            'professional' => 12000,
            'enterprise' => 25000,
            default => 0,
        };
    }

    /**
     * Scope for active subscriptions
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where('end_date', '>', now());
    }

    /**
     * Scope for pending subscriptions
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}