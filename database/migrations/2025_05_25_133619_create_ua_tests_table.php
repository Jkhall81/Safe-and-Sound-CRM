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
        Schema::create('ua_tests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('house_id')->constrained();
            $table->foreignId('resident_id')->constrained();

            $table->date('test_date');
            $table->enum('result', ['pass', 'fail']);
            $table->text('notes')->nullable();
            $table->json('attachments')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ua_tests');
    }
};
