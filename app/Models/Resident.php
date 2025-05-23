<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resident extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
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
        'user_id' => 'integer',
        'house_id' => 'integer',
        'room_id' => 'integer',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
