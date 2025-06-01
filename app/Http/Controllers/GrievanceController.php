<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use Inertia\Inertia;

class GrievanceController extends Controller
{
    //
    public function show(House $house)
    {
        return Inertia::render('Grievance/Show', [
            'house' => $house,
        ]);
    }
    public function store(Request $request, House $house)
    {
        $validated = $request->validate([
            'nature' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'email' => 'required|array',
            'email.*.type' => 'required|string',
            'email.*.value' => 'required|email',
            'date_of_incident' => 'required|date',
            'incident_type' => 'required|string|max:255',
            'incident_description' => 'required|string',
            'parties_involved' => 'required|string',
            'expectations' => 'required|string',
            'attachments.*' => 'nullable|file|max:10240', // optional attachments
        ]);

        $attachments = [];

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $attachments[] = $file->store('grievance_attachments', 'public');
            }
        }

        $house->grievances()->create(array_merge(
            $validated,
            ['attachments' => $attachments]
        ));
    }
}
