<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\House;


class HouseController extends Controller
{
    //
    public function show($slug)
    {

        $house = House::where('slug', $slug)->with([
            'rooms.residents' => function ($query) {
                $query->select('id', 'room_id', 'name', 'phone_number', 'status')->where('status', 'active');
            }
        ])->firstOrFail();

        return Inertia::render('Houses/Show', [
            'house' => $house,
        ]);
    }
}
