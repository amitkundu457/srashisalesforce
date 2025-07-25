<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    public function visit()
{
    return $this->belongsTo(Visit::class);
}
protected $fillable = [
 'lead_type',
'primary_no',
'lead_source',
'contact_person',
'state',
'current_balance',
'products',
];

}
