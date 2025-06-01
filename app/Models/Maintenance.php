<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    //
    protected $fillable = [
        'house_id',
        'biweekly_report',
        'heating_and_cooling',
        'heating_and_cooling_notes',
        'electrical',
        'electrical_notes',
        'plumbing',
        'plumbing_notes',
        'bedrooms',
        'bedroom_notes',
        'common_areas',
        'common_area_notes',
        'exterior',
        'exterior_notes',
        'attachments',
    ];

    protected $casts = [
        'biweekly_report' => 'date',
        'attachments' => 'array',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
