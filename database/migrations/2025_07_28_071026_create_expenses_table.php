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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sales_person_id'); // FK to sales_people
            $table->unsignedBigInteger('tour_plan_id');    // FK to tour_plans
            $table->string('type'); // Travel, Food, etc.
            $table->decimal('amount', 10, 2);
            $table->date('date');
            $table->text('description')->nullable();
            $table->enum('status', ['paid', 'unpaid'])->default('unpaid');
            $table->timestamps();
        
            // $table->foreign('sales_person_id')->references('id')->on('user')->onDelete('cascade');
            // $table->foreign('tour_plan_id')->references('id')->on('tour_plans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
