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
        Schema::create('visits', function (Blueprint $table) {
              $table->unsignedBigInteger('tour_plan_id');
    $table->enum('type', ['ho', 'warehouse', 'dealer', 'department', 'transit', 'new_lead']);
    $table->date('visit_date');
    $table->string('name'); // can be dealer name, dept name, or lead name
    $table->string('dept_name')->nullable(); // optional if applicable
    $table->text('visit_purpose')->nullable();
    $table->timestamps();

    $table->foreign('tour_plan_id')->references('id')->on('tour_plans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
