<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'house_id',
        'room_number',
        'type',
        'weekly_price',
        'capacity',
        'is_occupied'
    ];

    protected $casts = [
        'is_occupied' => 'boolean',
        'weekly_price' => 'decimal:2'
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function residents()
    {
        return $this->hasMany(Resident::class);
    }

    public function isSingle(): bool
    {
        return $this->type === 'single';
    }

    public function isShared(): bool
    {
        return str_starts_with($this->type, 'shared-');
    }

    public function markAsOccupied(): void
    {
        $this->update(['is_occupied' => true]);
    }

    public function markAsVacant(): void
    {
        $this->update(['is_occupied' => false]);
    }
}
