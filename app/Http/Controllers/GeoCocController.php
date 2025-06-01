<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use Inertia\Inertia;

class GeoCocController extends Controller
{
    //
    public function show(House $house)
    {
        return Inertia::render('GeoCoc/Show', [
            'house' => $house,
        ]);
    }

    public function store(Request $request, House $house)
    {

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'doc_number' => 'required|string|max:255',
            'releasing_facility' => 'required|string|max:255',
            'case_manager' => 'required|string|max:255',
            'move_in_date' => 'required|date',
        ]);

        $house->geoCocs()->create($validated);
    }
}
