<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->unique()->after('email');
            $table->enum('role', ['admin', 'constructor', 'client'])->default('client')->after('phone');
            $table->timestamp('phone_verified_at')->nullable()->after('role');
            $table->boolean('is_active')->default(true)->after('phone_verified_at');
            $table->timestamp('last_login_at')->nullable()->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'role', 'phone_verified_at', 'is_active', 'last_login_at']);
        });
    }
};