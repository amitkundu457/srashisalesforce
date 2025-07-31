<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;


class ExpenseImage extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'expense_id',
        'image_path',
    ];

    /**
     * Get the expense this image belongs to.
     */
    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

}
