<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use Inertia\Inertia;

class IntakeFormController extends Controller
{
    //
    public function show(House $house)
    {
        return inertia('IntakeForm/Show', [
            'house' => $house,
        ]);
    }


    public function store() {}
}
