<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UaTest extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'house_id',
        'resident_id',
        'test_date',
        'result',
        'notes',
        'attachments',
    ];

    protected $casts = [
        'text_date' => 'date',
        'attachments' => 'array',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
