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
            $table->string('slug')->unique();

            // Location
            $table->string('address');
            $table->string('city');
            $table->string('state', 2);
            $table->string('zip_code', 10);
            $table->string('coordinates')->nullable();
            $table->string('timezone')->default('America/Phoenix');

            // Management
            $table->foreignId('house_manager_id')->nullable()->constrained('users');
            $table->integer('max_residents');
            $table->integer('current_residents_count')->default(0);

            // Licensing
            $table->string('license_number_1')->nullable();
            $table->date('license_1_expiration')->nullable();
            $table->string('license_number_2')->nullable();
            $table->date('license_2_expiration')->nullable();

            // Financials
            $table->decimal('monthly_operating_cost', 10, 2)->default(0);
            $table->decimal('average_weekly_revenue', 10, 2)->default(0);

            // Status
            $table->enum('status', ['active', 'maintenance', 'closed'])->default('active');
            $table->date('opening_date');
            $table->date('closing_date')->nullable();

            // Timestamps
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('status');
            $table->index('license_expiration');
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
