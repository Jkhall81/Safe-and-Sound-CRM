<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Room;
use App\Models\House;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'house_id' => House::factory(),
            'room_id' => Room::factory(),
            'name' => $this->faker->name(),
            'move_in_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'move_out_date' => null,
            'status' => $this->faker->randomElement(['active', 'on_leave', 'discharged']),
            'phone_number' => $this->faker->phoneNumber,
            'email' => $this->faker->safeEmail,
        ];
    }
}
