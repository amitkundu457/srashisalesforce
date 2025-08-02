<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceSession extends Model
{
    protected $fillable = [
        'user_id',
        'clock_in',
        'clock_in_lat',
        'clock_in_lng',
        'clock_out',
        'clock_out_lat',
        'clock_out_lng',
    ];

    protected $casts = [
        'clock_in' => 'datetime',
        'clock_out' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function breaks()
{
    return $this->hasMany(AttendanceBreak::class);
}


}
