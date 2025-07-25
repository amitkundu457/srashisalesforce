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
      Schema::create('leads', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('visit_id');
    $table->string('lead_type');
    $table->string('primary_no');
    $table->string('lead_source');
    $table->string('contact_person')->nullable();
    $table->string('state')->nullable();
    $table->decimal('current_balance', 10, 2)->nullable();
    $table->json('products')->nullable();

    $table->timestamps();

    // $table->foreign('visit_id')->references('id')->on('visits')->onDelete('cascade');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
