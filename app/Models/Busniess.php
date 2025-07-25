<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Busniess extends Model
{
    protected $table = 'busniesses'; // Ensure the table name is correct
protected $fillable = ['name', 'created_by'];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // public function leads()
    // {
    //     return $this->hasMany(Lead::class);
    // }
}
