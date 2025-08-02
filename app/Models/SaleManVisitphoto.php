<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleManVisitphoto extends Model
{
      protected $fillable = ['sales_man_visits_id', 'photo_path'];

    public function visit()
    {
        return $this->belongsTo(SalesManVisit::class, 'sales_man_visit_id');
    }
}
