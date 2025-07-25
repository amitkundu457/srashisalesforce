<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
   public function tourPlan()
{
    return $this->belongsTo(TourPlan::class);
}

public function lead()
{
    return $this->hasOne(Lead::class);
}
protected $fillable = [
    'tour_plan_id',
    'type',
    'visit_date',
    'name',
    'visit_purpose',
    'visit_name',
];

}
