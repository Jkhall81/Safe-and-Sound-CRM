<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\House;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
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
            'room_number' => 'Room ' . $this->faker->unique()->numberBetween(100, 999),
            'type' => $this->faker->randomElement(['single', 'shared-standard', 'shared-master']),
            'weekly_price' => $this->faker->randomFloat(2, 50, 250),
            'capacity' => $this->faker->numberBetween(1, 4),
            'is_occupied' => $this->faker->boolean(50),
        ];
    }
}
