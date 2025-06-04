<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramFeePayment extends Model
{
    protected $fillable = [
        'program_fee_id',
        'resident_id',
        'amount',
    ];

    public function programFee()
    {
        return $this->belongsTo(ProgramFee::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
