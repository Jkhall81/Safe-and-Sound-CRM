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
        Schema::create('geo_cocs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained();

            $table->string('first_name');
            $table->string('last_name');
            $table->string('doc_number');
            $table->string('releasing_facility');
            $table->string('case_manager');
            $table->date('move_in_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('geo_cocs');
    }
};
