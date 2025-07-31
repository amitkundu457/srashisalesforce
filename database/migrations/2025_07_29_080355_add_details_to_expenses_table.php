<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->enum('expensetype', ['conveyance', 'non_conveyance'])->after('type')->nullable();
            $table->string('departure_town')->nullable();
            $table->string('arrival_town')->nullable();
            $table->timestamp('departure_time')->nullable();
            $table->timestamp('arrival_time')->nullable();
            $table->string('mode_of_travel')->nullable();
            $table->decimal('fare', 10, 2)->nullable();
            $table->string('location')->nullable();
            // $table->decimal('hotel_amount', 10, 2)->nullable();
            $table->string('da_type')->nullable();
            $table->decimal('other_amount', 10, 2)->nullable();
            $table->decimal('non_conveyance_amount', 10, 2)->nullable();
            $table->text('remarks')->nullable();

           
            $table->enum('expense_status', ['pending', 'confirmed', 'cancelled'])->default('pending');
        });
    }

    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropColumn([
                'expensetype',
                'departure_town',
                'arrival_town',
                'departure_time',
                'arrival_time',
                'mode_of_travel',
                'fare',
                'location',
                // 'hotel_amount',
                'da_type',
                'other_amount',
                'non_conveyance_amount',
                'remarks',
                'expense_status',
                
            ]);

            // Optional: revert status change
            // $table->enum('status', ['paid', 'unpaid'])->default('unpaid')->change();
        });
    }
};
