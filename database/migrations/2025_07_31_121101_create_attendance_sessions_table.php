<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendanceSessionsTable extends Migration
{
    public function up()
    {
        Schema::create('attendance_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('clock_in');
            $table->decimal('clock_in_lat', 10, 6)->nullable();
            $table->decimal('clock_in_lng', 10, 6)->nullable();
            $table->dateTime('clock_out')->nullable();
            $table->decimal('clock_out_lat', 10, 6)->nullable();
            $table->decimal('clock_out_lng', 10, 6)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('attendance_sessions');
    }
}
