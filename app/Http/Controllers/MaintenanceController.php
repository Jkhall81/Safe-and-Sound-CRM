<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    //
    public function show(House $house)
    {
        return inertia('Maintenance/Show', [
            'house' => $house,
        ]);
    }

    public function store(Request $request, House $house)
    {
        $validated = $request->validate([
            'biweekly_report' => 'required|date',
            'heating_and_cooling' => 'required|string',
            'heating_and_cooling_notes' => 'required|string',
            'electrical' => 'required|string',
            'electrical_notes' => 'required|string',
            'plumbing' => 'required|string',
            'plumbing_notes' => 'required|string',
            'bedrooms' => 'required|string',
            'bedroom_notes' => 'required|string',
            'common_areas' => 'required|string',
            'common_area_notes' => 'required|string',
            'exterior' => 'required|string',
            'exterior_notes' => 'required|string',
            'attachments.*' => 'nullable|file|max:10240', // up to 10MB per file
        ]);

        $attachments = [];

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $attachments[] = $file->store('maintenance_attachments', 'public');
            }
        }

        $house->maintenanceReports()->create(array_merge(
            $validated,
            ['attachments' => $attachments]
        ));
    }
}
