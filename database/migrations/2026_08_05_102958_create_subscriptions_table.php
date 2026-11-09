<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('constructor_id')->constrained()->onDelete('cascade');
            $table->enum('plan', ['basic', 'professional', 'enterprise'])->default('basic');
            $table->enum('status', ['pending', 'active', 'expired', 'cancelled'])->default('pending');
            $table->decimal('amount', 10, 2);
            $table->string('payment_method')->nullable(); // mpesa, ecocash, bank
            $table->string('transaction_id')->nullable()->unique();
            $table->string('reference')->unique();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
};