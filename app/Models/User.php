<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Message; // <-- Added this import

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'role'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
    ];

    public const ROLE_ADMIN = 'admin';
    public const ROLE_CONSTRUCTOR = 'constructor';
    public const ROLE_CLIENT = 'client';

    // Relationships
    public function constructor(): HasOne
    {
        return $this->hasOne(Constructor::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function tenders(): HasMany
    {
        return $this->hasMany(Tender::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'client_id');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    // ============================================================
    // MESSAGING HELPER METHODS (MOVED INSIDE THE CLASS)
    // ============================================================

    public function unreadMessagesCount()
    {
        return Message::where('receiver_id', $this->id)
                      ->whereNull('read_at')
                      ->count();
    }

    public function conversations()
    {
        $ids = Message::where('sender_id', $this->id)
                      ->orWhere('receiver_id', $this->id)
                      ->pluck('sender_id')
                      ->merge(Message::where('sender_id', $this->id)->pluck('receiver_id'))
                      ->unique()
                      ->filter(fn($id) => $id != $this->id);
        return User::whereIn('id', $ids)->get();
    }

    // Role check methods
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isConstructor(): bool
    {
        return $this->role === self::ROLE_CONSTRUCTOR;
    }

    public function isClient(): bool
    {
        return $this->role === self::ROLE_CLIENT;
    }
}