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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained();
            $table->foreignId('room_id')->constrained();
            $table->string('room_label')->nullable();
            $table->string('name');
            $table->date('dob');
            $table->date('move_in_date');
            $table->date('move_out_date')->nullable();
            $table->enum('status', ['active', 'on_leave', 'discharged']);
            $table->json('phone_number');
            $table->json('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
