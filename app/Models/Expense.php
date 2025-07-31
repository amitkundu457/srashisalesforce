<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    //
    protected $fillable = [
        'sales_person_id', 'tour_plan_id', 'type', 'amount', 'date', 'description', 'status',
       
      

        'expensetype',
        'departure_town',
        'arrival_town',
        'departure_time',
        'arrival_time',
        'mode_of_travel',
        'fare',
        'location',
        // 'hotel_amount', // Uncomment when using
        'da_type',
        'other_amount',
        'non_conveyance_amount',
        'remarks',
        'expense_status',
      
        
    ];

    public function salesPerson()
    {
        return $this->belongsTo(User::class);
    }

    public function tourPlan()
    {
        return $this->belongsTo(TourPlan::class);
    }
    public function tourPlanDetails(){
        return $this->belongsTo(TourPlan::class, 'tour_plan_id');
    }
    public function images()
{
    return $this->hasMany(ExpenseImage::class);
}
}
