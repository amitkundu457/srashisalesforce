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
        Schema::create('expense_images', function (Blueprint $table) {
            $table->id();

            // Foreign key to expenses table
            $table->foreignId('expense_id')->constrained('expenses')->onDelete('cascade');

            // Image path column (relative or full path depending on storage)
            $table->string('image_path');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_images');
    }
};
