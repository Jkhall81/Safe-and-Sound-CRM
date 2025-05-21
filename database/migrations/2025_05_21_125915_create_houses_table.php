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
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();

            // Location
            $table->string('address');
            $table->string('city');
            $table->string('state', 2);
            $table->string('zip_code', 10);
            $table->point('coordinates')->nullable();

            // Management
            $table->foreignId('house_manager_id')->constrained('users');
            $table->integer('max_residents');
            $table->integer('current_residents_count')->default(0);

            // Licensing
            $table->string('license_number_1');
            $table->date('license_1_expiration');
            $table->string('license_number_2')->nullable();
            $table->date('license_2_expiration')->nullable();

            // Financials

            // Status
            $table->enum('status', ['active', 'maintenance', 'closed'])->default('active');
            $table->date('opening_date');
            $table->date('closing_date')->nullable();

            // Timestamps
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houses');
    }
};
