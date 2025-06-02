<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use Inertia\Inertia;

class ProgramFeeController extends Controller
{
    //
    public function show(House $house)
    {
        return inertia('ProgramFee/Show', [
            'house' => $house->load('activeResidents.room', 'rooms'),
        ]);
    }

    public function store() {}
}
