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
        Schema::create('sale_people', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('departments_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('department_name')->nullable();
            $table->string('designation_name')->nullable();
            $table->string('shift_start_time')->nullable();
            $table->string('shift_end_time')->nullable();
            $table->string('employee_id')->nullable();
            $table->string('phone')->nullable();
            $table->string('join_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_people');
    }
};
