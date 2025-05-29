<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resident extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'dob',
        'house_id',
        'room_id',
        'move_in_date',
        'move_out_date',
        'status',
        'phone_number',
        'email',
    ];

    protected $casts = [
        'move_in_date' => 'date:Y-m-d',
        'move_out_date' => 'date:Y-m-d',
        'dob' => 'date:Y-m-d',
        'user_id' => 'integer',
        'house_id' => 'integer',
        'room_id' => 'integer',
        'phone_numbers' => 'array',
        'emails' => 'array',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
