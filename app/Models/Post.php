<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'external_id', // ID from external API
        'title',
        'body',
    ];
}
