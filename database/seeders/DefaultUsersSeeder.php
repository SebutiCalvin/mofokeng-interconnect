<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Constructor;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DefaultUsersSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@ranyali.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '+266 5888 0000',
            ]
        );

        // 2. Constructor User
        $constructorUser = User::firstOrCreate(
            ['email' => 'constructor@ranyali.com'],
            [
                'name' => 'John Constructor',
                'password' => Hash::make('password'),
                'role' => 'constructor',
                'phone' => '+266 5888 1111',
            ]
        );

        // Create related Constructor profile if it doesn't exist
        Constructor::firstOrCreate(
            ['user_id' => $constructorUser->id],
            [
                'company_name' => 'Mwangi Construction Ltd',
                'slug' => Str::slug('Mwangi Construction Ltd') . '-' . uniqid(),
                'description' => 'Leading construction company specializing in residential and commercial projects.',
                'location' => 'Nairobi, Kenya',
                'city' => 'Nairobi',
                'country' => 'Kenya',
                'phone' => '+266 5888 1111',
                'email' => 'constructor@ranyali.com',
                'established_year' => 2010,
                'specializations' => ['Residential', 'Commercial', 'Renovation'],
                'certifications' => ['ISO 9001:2015', 'CIDB Grade 6'],
                'is_verified' => true,
                'status' => 'active',
                'rating' => 4.8,
                'review_count' => 156,
            ]
        );

        // 3. Client User
        User::firstOrCreate(
            ['email' => 'client@ranyali.com'],
            [
                'name' => 'Mary Client',
                'password' => Hash::make('password'),
                'role' => 'client',
                'phone' => '+266 5888 2222',
            ]
        );

        $this->command->info('✅ Default users created (or already exist):');
        $this->command->info('Admin: admin@ranyali.com / password');
        $this->command->info('Constructor: constructor@ranyali.com / password');
        $this->command->info('Client: client@ranyali.com / password');
    }
}