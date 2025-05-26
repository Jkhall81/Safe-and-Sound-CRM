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
            'house' => $house->load('activeResidents'),
        ]);
    }

    public function store(Request $request, House $house)
    {
        // dd($request->all());

        $request->merge([
            'result' => strtolower($request->input('result')),
        ]);

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
        // dd($request->all(), $request->hasFile('attachments'), $request->file('attachments'));

        UaTest::create([
            'house_id' => $house->id,
            'resident_id' => $validated['resident_id'],
            'test_date' => $validated['test_date'],
            'result' => $validated['result'],
            'notes' => $validated['notes'] ?? null,
            'attachments' => json_encode($paths),
        ]);;
    }
}
