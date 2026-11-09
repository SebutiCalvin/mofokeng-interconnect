<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Constructor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User - Password: ranyali123
        $admin = User::create([
            'name' => 'Ranyali Admin',
            'email' => 'admin@ranyali.com',
            'password' => Hash::make('ranyali123'),
            'phone' => '+266 5888 0000',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Constructor User - Password: ranyali123
        $constructor = User::create([
            'name' => 'John Mwangi',
            'email' => 'constructor@ranyali.com',
            'password' => Hash::make('ranyali123'),
            'phone' => '+266 5888 1111',
            'role' => 'constructor',
            'email_verified_at' => now(),
        ]);

        Constructor::create([
            'user_id' => $constructor->id,
            'company_name' => 'Mwangi Construction Ltd',
            'slug' => Str::slug('Mwangi Construction Ltd') . '-' . time(),
            'description' => 'Leading construction company specializing in residential and commercial projects.',
            'location' => 'Nairobi, Kenya',
            'city' => 'Nairobi',
            'country' => 'Kenya',
            'established_year' => 2010,
            'is_verified' => true,
            'status' => 'active',
            'rating' => 4.8,
            'review_count' => 156,
        ]);

        // Create Client User - Password: ranyali123
        User::create([
            'name' => 'Mary Lebeko',
            'email' => 'client@ranyali.com',
            'password' => Hash::make('ranyali123'),
            'phone' => '+266 5888 2222',
            'role' => 'client',
            'email_verified_at' => now(),
        ]);

        echo "✅ Admin, Constructor, and Client users created!\n";
        echo "============================================\n";
        echo "Admin Login: admin@ranyali.com\n";
        echo "Constructor Login: constructor@ranyali.com\n";
        echo "Client Login: client@ranyali.com\n";
        echo "Password for all: ranyali123\n";
        echo "============================================\n";
    }
}