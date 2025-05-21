<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HouseManager extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'user_id',
        'house_id',
        'is_cpr_certified',
        'cpr_certification_number',
        'cpr_expiration_date',
    ];

    protected $casts = [
        'start_date' => 'datetime:Y-m-d',
        'end_date' => 'datetime:Y-m-d',
        'cpr_expiration_date' => 'datetime:Y-m-d',
        'is_cpr_certified' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
