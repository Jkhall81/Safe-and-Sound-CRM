<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class License extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'license_number',
        'type',
        'issue_date',
        'expiration_date',
        'document_path',
        'house_id'
    ];

    protected $casts = [
        'issue_date' => 'date:Y-m-d',
        'expiration_date' => 'date:Y-m-d',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function isExpired(): bool
    {
        return $this->expiration_date->isPast();
    }
}
