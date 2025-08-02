<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalePerson extends Model
{
    protected $fillable = [
       'user_id',
        'department_name',
        'designation_name',
        'shift_start_time',
        'shift_end_time',
        'employee_id',
        'phone',
        'join_date',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
