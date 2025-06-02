<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\House;
use App\Models\HouseManager;
use App\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => Role::ADMIN->value,
        ]);

        $house = House::create([
            'name' => 'Test House',
            'slug' => 'test-house',
            'address' => '123 Main St',
            'city' => 'Testville',
            'state' => 'TX',
            'zip_code' => '75001',
            'max_residents' => 10,
            'current_residents_count' => 0,
            'status' => 'active',
            'opening_date' => now(),
        ]);

        $manager = User::create([
            'name' => 'House Manager',
            'email' => 'manager@example.com',
            'password' => Hash::make('password'),
            'role' => Role::HOUSE_MANAGER->value,
        ]);

        HouseManager::create([
            'user_id' => $manager->id,
            'house_id' => $house->id,
            'first_name' => "Jason",
            'last_name' => "Hall",
            'email' => "jason.kei.hall@gmail.com",
            'phone_number' => '623-206-2944',
            'start_date' => now()->subMonth(),
            'is_cpr_certified' => true,
            'cpr_certification_number' => 'CPR-TEST-123',
            'cpr_expiration_date' => now()->addYear(),
        ]);

        $house->house_manager_id = $manager->id;
        $house->save();

        $this->call([
            HouseSeeder::class,
        ]);
    }
}
