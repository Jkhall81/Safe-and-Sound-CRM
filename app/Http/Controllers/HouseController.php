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
                $query->select('id', 'room_id', 'name', 'phone_number', 'room_label', 'status')->where('status', 'active');
            },
            'manager',
            'activeResidents.room',
        ])->firstOrFail();

        $totalRooms = $house->max_residents;

        // Total weekly price of all rooms
        $totalWeeklyPriceAllRooms = $house->rooms->reduce(function ($total, $room) {
            $price = floatval($room->weekly_price ?? 0);
            $capacity = $room->capacity ?? 0;
            return $total + ($price * $capacity);
        }, 0);

        // Total active residents
        $totalActiveResidents = $house->activeResidents->count();

        // Total weekly price of occupied rooms
        $totalWeeklyPriceOccupiedRooms = $house->activeResidents->reduce(function ($total, $resident) {
            $price = floatval(optional($resident->room)->weekly_price ?? 0);
            return $total + $price;
        }, 0);

        return Inertia::render('Houses/Show', [
            'house' => $house,
            'totalRooms' => $totalRooms,
            'totalWeeklyPriceAllRooms' => $totalWeeklyPriceAllRooms,
            'totalActiveResidents' => $totalActiveResidents,
            'totalWeeklyPriceOccupiedRooms' => $totalWeeklyPriceOccupiedRooms,
        ]);
    }
}
