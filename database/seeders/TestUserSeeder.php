<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create a test user
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // Create a second user (to send messages to)
        User::create([
            'name' => 'John Constructor',
            'email' => 'john@constructor.com',
            'password' => Hash::make('password'),
        ]);

        $this->command->info('Test users created!');
    }
}