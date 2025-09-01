<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'email@example.com',
            'password' => Hash::make('12345678'),
        ]);

        $roles = [
            ['name' => 'Administrator'],
            ['name' => 'Editor'],
            ['name' => 'Author'],
            ['name' => 'Subscriber'],
        ];

        Role::insert($roles);
    }
}
