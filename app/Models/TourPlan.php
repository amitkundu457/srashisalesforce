<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourPlan extends Model
{
    public function visits()
{
    return $this->hasMany(Visit::class);
}
protected $fillable = [
    'user_id',
    'start_date',
    'end_date',
    'tour_plan_option',
];

 public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sales_man_visits()
    {
        return $this->hasMany(SalesManVisit::class);
    }

}
