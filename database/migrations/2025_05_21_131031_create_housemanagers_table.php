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
        Schema::create('housemanagers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('house_id')->constrained()->unique();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_cpr_certified')->default(false);
            $table->string('cpr_certification_number')->nullable();
            $table->date('cpr_expiration_date');
            $table->timestamps();
            $table->index(['house_id', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('housemanagers');
    }
};
