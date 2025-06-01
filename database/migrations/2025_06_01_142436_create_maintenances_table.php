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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained();

            $table->date('biweekly_report');

            $table->string('heating_and_cooling');
            $table->text('heating_and_cooling_notes');

            $table->string('electrical');
            $table->text('electrical_notes');

            $table->string('plumbing');
            $table->text('plumbing_notes');

            $table->string('bedrooms');
            $table->text('bedroom_notes');

            $table->string('common_areas');
            $table->text('common_area_notes');

            $table->string('exterior');
            $table->text('exterior_notes');

            $table->json('attachments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};
