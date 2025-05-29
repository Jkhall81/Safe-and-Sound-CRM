<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('intake_form', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained('houses');
            $table->foreignId('resident_id')->constrained('houses');
            $table->string('full_name');
            $table->date('dob');
            $table->json('phones');
            $table->string('dl_number')->nullable();
            $table->string('last_address')->nullable();
            $table->json('email');
            $table->date('sobriety_date')->nullable();
            $table->string('referred_by')->nullable();
            $table->text('drug_of_choice')->nullable();
            $table->string('car')->nullable();
            $table->text('car_make_and_model')->nullable();
            $table->string('license_plate_number')->nullable();
            $table->string('program_fee')->nullable();
            $table->string('covid_exposure')->nullable();
            $table->string('positive_covid_test')->nullable();
            $table->string('symptoms')->nullable();
            $table->string('covid_swear')->nullable();
            $table->text('current_meds')->nullable();
            $table->text('allergies')->nullable();
            $table->string('infections')->nullable();
            $table->string('criminal_record')->nullable();
            $table->text('criminal_record_details')->nullable();
            $table->string('mental_illness')->nullable();
            $table->text('mental_illness_details')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->json('emergency_contact_phone')->nullable();
            $table->string('emergency_contact_relationship')->jnullable();
            $table->date('move_in_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intake_form');
    }
};
