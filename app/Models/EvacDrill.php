<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvacDrill extends Model
{
    //
    protected $fillable = [
        'house_id',
        'drill_coordinator_name',
        'drill_coordinator_title',
        'drill_date',
        'drill_time',
        'time_to_complete',
        'type_of_drill',
        'drill_objectives',
        'alarm_activation',
        'staff_response',
        'staff_response_comments',
        'resident_response',
        'resident_response_comments',
        'mobility_assistance',
        'designated_assembly_area',
        'accurate_headcount',
        'strengths_observed',
        'strengths_observed_comments',
        'opportunities_observed',
        'opportunities_observed_comments',
        'debriefing_conducted',
        'suggestions',
        'attachments',
    ];

    protected $casts = [
        'drill_date' => 'date',
        'drill_time' => 'datetime:H:i',
        'drill_objectives' => 'array',
        'staff_response' => 'array',
        'resident_response' => 'array',
        'strengths_observed' => 'array',
        'opportunities_observed' => 'array',
        'attachments' => 'array',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
