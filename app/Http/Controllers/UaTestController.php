<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use App\Models\UaTest;
use Inertia\Inertia;

class UaTestController extends Controller
{
    //
    public function show(House $house)
    {
        return Inertia::render('UaTests/Show', [
            'house' => $house->load('residents')->toArray(),
        ]);
    }

    public function store(Request $request, House $house)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'test_date' => 'required|date',
            'result' => 'required|in:pass,fail',
            'notes' => 'nullable|string',
            'attachments.*' => 'nullable|file|mimes:jpg,jpeg,png,pdf,txt|max:2048',
        ]);

        $paths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $paths[] = $file->store('ua_tests', 'public');
            }
        }

        UaTest::create([
            'house_id' => $house->id,
            'resident_id' => $validated['resident_id'],
            'test_date' => $validated['test_date'],
            'result' => $validated['result'],
            'notes' => $validated['notes'] ?? null,
            'attachments' => $paths,
        ]);

        return redirect()->route('house.show', $house->slug)->with('success', 'UA test submitted.');
    }
}
