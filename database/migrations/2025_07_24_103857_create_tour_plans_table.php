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
        Schema::create('tour_plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key to users table
            // $table->string('destination');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('tour_plan_option'); // e.g., 'standard', 'premium', 'luxury'
            $table->date('visit_date')->nullable(); // Date of the visit
            $table->text('visit_purpose')->nullable(); // Additional notes for the tour plan
            $table->string('visit_name')->nullable(); // e.g., 'pending', 'confirmed', 'cancelled'
            // $table->string(())
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending'); // e.g., 'pending', 'confirmed', 'cancelled'// e.g., 'pending', 'confirmed', 'cancelled'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_plans');
    }
};
