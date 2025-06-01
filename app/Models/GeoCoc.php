<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeoCoc extends Model
{
    //
    protected $fillable = [
        'first_name',
        'last_name',
        'doc_number',
        'releasing_facility',
        'case_manager',
        'move_in_date',
    ];

    protected $casts = [
        'move_in_date' => 'date',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
