<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Constructor extends Model
{
    protected $fillable = [
        'user_id', 'company_name', 'slug', 'description', 'logo',
        'cover_image', 'location', 'city', 'country',
        'established_year', 'specializations', 'certifications',
        'website', 'phone', 'email', 'is_verified', 'status',
        'rating', 'review_count'
    ];

    protected $casts = [
        'specializations' => 'array',
        'certifications' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getRatingAttribute($value)
    {
        return number_format($value, 1);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function hasActiveSubscription(): bool
    {
        return $this->subscriptions()
            ->where('status', 'active')
            ->where('end_date', '>', now())
            ->exists();
    }

    public function activeSubscription()
    {
        return $this->subscriptions()
            ->where('status', 'active')
            ->where('end_date', '>', now())
            ->latest()
            ->first();
    }
}