<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesManVisit extends Model
{
      protected $fillable = ['tour_plans_id', 'clock_in', 'clock_out', 'lat', 'lng'];

    public function tourPlan()
    {
        return $this->belongsTo(TourPlan::class);
    }

    public function photos()
    {
        return $this->hasMany(SaleManVisitphoto::class);
    }
}
