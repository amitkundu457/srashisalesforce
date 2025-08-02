<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendanceBreaksTable extends Migration
{
    public function up()
    {
        Schema::create('attendance_breaks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attendance_session_id')->constrained('attendance_sessions')->onDelete('cascade');
            $table->dateTime('break_start');
            $table->dateTime('break_end')->nullable();
            $table->string('break_type')->default('lunch');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('attendance_breaks');
    }
}
