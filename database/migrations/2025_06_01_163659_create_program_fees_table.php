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
        Schema::create('program_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained();
            $table->date('program_fee_date');
            $table->text('notes')->nullable();
            $table->decimal('total_collected', 10, 2);
            $table->unsignedInteger('resident_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_fees');
    }
};
