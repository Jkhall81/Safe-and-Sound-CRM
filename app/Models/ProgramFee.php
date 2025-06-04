<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramFee extends Model
{
    protected $fillable = [
        'house_id',
        'program_fee_date',
        'notes',
        'total_collected',
        'resident_count',
    ];

    // Relationships
    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function payments()
    {
        return $this->hasMany(ProgramFeePayment::class);
    }
}
