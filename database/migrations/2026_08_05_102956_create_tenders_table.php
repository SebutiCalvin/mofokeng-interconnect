<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('location')->nullable();
            $table->string('category')->nullable();
            $table->string('budget')->nullable();
            $table->date('submission_deadline');
            $table->enum('status', ['open', 'closing_soon', 'closed', 'awarded'])->default('open');
            $table->json('documents')->nullable();
            $table->integer('views')->default(0);
            $table->integer('applications_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenders');
    }
};