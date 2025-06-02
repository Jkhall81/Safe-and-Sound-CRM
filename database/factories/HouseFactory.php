<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Room;
use App\Models\Resident;
use App\Models\HouseManager;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\House>
 */
class HouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company;
        $slug = Str::slug($name) . '-' . Str::random(5);

        return [
            //
            'name' => $name,
            'description' => $this->faker->paragraph,
            'slug' => $slug,

            // Location
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'state' => $this->faker->stateAbbr,
            'zip_code' => $this->faker->postcode,
            'coordinates' => $this->faker->latitude . ',' . $this->faker->longitude,
            'timezone' => 'America/Phoenix',

            // Management
            'house_manager_id' => User::factory(),
            'max_residents' => $this->faker->numberBetween(10, 13),
            'current_residents_count' => 0,

            // Licensing
            'license_number_1' => strtoupper(Str::random(10)),
            'license_1_expiration' => $this->faker->dateTimeBetween('+1 year', '+3 years'),
            'license_number_2' => $this->faker->boolean ? strtoupper(Str::random(10)) : null,
            'license_2_expiration' => $this->faker->boolean ? $this->faker->dateTimeBetween('+1 year', '+3 years') : null,

            // Financials
            'monthly_operating_cost' => $this->faker->randomFloat(2, 1000, 10000),
            'average_weekly_revenue' => $this->faker->randomFloat(2, 500, 5000),

            // Status
            'status' => $this->faker->randomElement(['active', 'maintenance', 'closed']),
            'opening_date' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'closing_date' => $this->faker->boolean(20) ? $this->faker->dateTimeBetween('now', '+2 years') : null,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (\App\Models\House $house) {


            HouseManager::create([
                'user_id' => $house->house_manager_id,
                'house_id' => $house->id,
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'email' => fake()->unique->safeEmail(),
                'phone_number' => fake()->phoneNumber(),
                'start_date' => now()->subMonths(rand(0, 24)),
                'end_date' => null,
                'is_cpr_certified' => true,
                'cpr_certification_number' => strtoupper(fake()->bothify('CPR-#####')),
                'cpr_expiration_date' => now()->addYears(rand(1, 3)),
            ]);


            $remainingCapacity = $house->max_residents;
            $totalResidents = 0;

            $rooms = Room::factory()->count(rand(5, 8))->create([
                'house_id' => $house->id,
            ]);

            foreach ($rooms as $room) {
                if ($remainingCapacity <= 0) {
                    break;
                }

                $maxResidentsForRoom = min($room->capacity, $remainingCapacity);
                $residentCount = rand(1, $maxResidentsForRoom);

                $residents = Resident::factory()->count($residentCount)->create([
                    'house_id' => $house->id,
                    'room_id' => $room->id,
                ]);

                foreach ($residents as $i => $resident) {
                    $resident->update([
                        'room_label' => $room->room_number . chr(65 + $i),
                    ]);
                }

                $remainingCapacity -= $residentCount;
                $totalResidents += $residentCount;
            }

            $house->current_residents_count = $totalResidents;
            $house->save();
        });
    }
}
