<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficeAttendance extends Model
{
     protected $fillable = [
        'user_id',
        'date',
        'clock_in',
        'clock_out',
        'lat',
        'lng',
    ];

    public function salesMan(){
        return $this->belongsTo(User::class,'user_id');
    }
}
