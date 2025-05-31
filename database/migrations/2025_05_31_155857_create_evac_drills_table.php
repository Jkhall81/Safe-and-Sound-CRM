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
        Schema::create('evac_drills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained();

            $table->string('drill_coordinator_name');
            $table->string('drill_coordinator_title');
            $table->date('drill_date');
            $table->time('drill_time');
            $table->string('time_to_complete');
            $table->string('type_of_drill');

            $table->json('drill_objectives');
            $table->string('alarm_activation');
            $table->json('staff_response');
            $table->text('staff_response_comments');
            $table->json('resident_response');
            $table->text('resident_response_comments');
            $table->string('mobility_assistance');
            $table->string('designated_assembly_area');
            $table->string('accurate_headcount');
            $table->json('strengths_observed');
            $table->text('strengths_observed_comments');
            $table->json('opportunities_observed');
            $table->text('opportunities_observed_comments');
            $table->string('debriefing_conducted');
            $table->text('suggestions');
            $table->json('attachments');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evac_drills');
    }
};
