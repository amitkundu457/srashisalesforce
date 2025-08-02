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
        Schema::create('sales_man_visits', function (Blueprint $table) {
            $table->id();
             $table->foreignId('tour_plans_id')->constrained()->onDelete('cascade');
             $table->timestamp('checkin_in')->nullable();
            // $table->timestamp('clock_out')->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_man_visits');
    }
};
