<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use Inertia\Inertia;

class EvacDrillController extends Controller
{
    //
    public function show(House $house)
    {
        return Inertia::render('EvacDrill/Show', [
            'house' => $house,
        ]);
    }

    public function store(Request $request, House $house)
    {
        $validated = $request->validate([
            'drill_coordinator_name' => 'required|string|max:255',
            'drill_coordinator_title' => 'required|string|max:255',
            'drill_date' => 'required|date',
            'drill_time' => 'required',
            'time_to_complete' => 'required|string|max:255',
            'type_of_drill' => 'required|string|max:255',

            'drill_objectives' => 'required|array',
            'alarm_activation' => 'required|string',
            'staff_response' => 'required|array',
            'staff_response_comments' => 'required|string',
            'resident_response' => 'required|array',
            'resident_response_comments' => 'required|string',
            'mobility_assistance' => 'required|string',
            'designated_assembly_area' => 'required|string',
            'accurate_headcount' => 'required|string',
            'strengths_observed' => 'required|array',
            'strengths_observed_comments' => 'required|string',
            'opportunities_observed' => 'required|array',
            'opportunities_observed_comments' => 'required|string',
            'debriefing_conducted' => 'required|string',
            'suggestions' => 'required|string',

            'attachments.*' => 'nullable|file|max:10240',
        ]);

        $attachments = [];

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $attachments[] = $file->store('evac_drill_attachments', 'public');
            }
        }

        $house->evacDrills()->create(array_merge(
            $validated,
            ['attachments' => $attachments]
        ));
    }
}
