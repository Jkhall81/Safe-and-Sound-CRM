<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    //
    public function show(Room $room)
    {
        return Inertia::render('Rooms/Show', [
            'room' => $room->load('residents', 'house'),
            'houseslug' => $room->house->slug,
        ]);
    }

    public function updateResident(Request $request, Room $room)
    {
        $validated = $request->validate([
            'resident_name' => 'required|string|max:255',
            'resident_phone' => 'required|string|max:25',
            'resident_email' => 'required|email|max:255',
        ]);

        $existingResident = $room->residents()->where('status', 'active')->first();

        if ($existingResident && $existingResident->name === $validated['resident_name']) {
            // If the name matches, just update this resident
            $existingResident->update([
                'phone_number' => $validated['resident_phone'],
                'email' => $validated['resident_email'],
            ]);
        } else {
            // Either no active resident, or it's a new name → create new record
            if ($existingResident) {
                $existingResident->update([
                    'status' => 'discharged',
                    'move_out_date' => now(),
                ]);
            }
        }

        Resident::create([
            'room_id' => $room->id,
            'house_id' => $room->house_id,
            'name' => $validated['resident_name'],
            'phone_number' => $validated['resident_phone'],
            'email' => $validated['resident_email'],
            'status' => 'active',
            'move_in_date' => now(),
        ]);
        return redirect()->route('house.show', $room->house->slug)
            ->with('success', 'Resident info updated successfully.');
    }
}
