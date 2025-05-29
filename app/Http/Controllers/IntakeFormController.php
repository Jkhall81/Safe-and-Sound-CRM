<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use App\Models\IntakeForm;
use App\Models\Resident;
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


    public function store(Request $request, House $house)
    {

        // Big form need validate DATA
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'dob' => 'required|date',
            'sobriety_date' => 'required|date',
            'move_in_date' => 'required|date',
            'phones' => 'required|array',
            'phones.*.type' => 'required|string',
            'phones.*.value' => 'required|string',
            'email' => 'required|array',
            'email.*.type' => 'required|string',
            'email.*.value' => 'required|email',
            'referred_by' => 'required|string',
            'drug_of_choice' => 'required|string',
            'car' => 'required|string',
            'car_make_and_model' => 'nullable|string',
            'license_plate_number' => 'nullable|string',
            'program_fee' => 'required|string',
            'covid_exposure' => 'required|string',
            'positive_covid_test' => 'required|string',
            'symptoms' => 'required|string',
            'covid_swear' => 'required|string',
            'current_meds' => 'required|string',
            'allergies' => 'required|string',
            'infections' => 'required|string',
            'criminal_record' => 'required|string',
            'criminal_record_details' => 'nullable|string',
            'mental_illness' => 'required|string',
            'mental_illness_details' => 'nullable|string',
            'emergency_contact_name' => 'required|string',
            'emergency_contact_phone' => 'required|array',
            'emergency_contact_relationship' => 'required|string',
        ]);

        $resident = Resident::create([
            'house_id' => $house->id,
            'name' => $validated['full_name'],
            'dob' => $validated['dob'],
            'move_in_date' => $validated['move_in_date'],
            'move_out_date' => null,
            'status' => 'active',
            'phone_number' => $validated['phones'],
            'email' => $validated['emails'],
        ]);

        $vacantRoom = $house->rooms()->where('is_occupied', false)->first();

        if ($vacantRoom) {
            $resident->room_id = $vacantRoom->id;
            $resident->save();

            $vacantRoom->update(['is_occupied' => true]);
            $house->increment('current_residents_count');
        } else {
            return response()->json(['error' => 'No vacant rooms available'], 400);
        }

        // Make the record
        $intakeForm = IntakeForm::create([
            'full_name' => $validated['full_name'],
            'house_id' => $house->id,
            'dob' => $validated['dob'],
            'sobriety_date' => $validated['sobriety_date'],
            'move_in_date' => $validated['move_in_date'],
            'phones' => json_encode($validated['phones']),
            'email' => json_encode($validated['email']),
            'referred_by' => $validated['referred_by'],
            'drug_of_choice' => $validated['drug_of_choice'],
            'car' => $validated['car'],
            'car_make_and_model' => $validated['car_make_and_model'],
            'license_plate_number' => $validated['license_plate_number'],
            'program_fee' => $validated['program_fee'],
            'covid_exposure' => $validated['covid_exposure'],
            'positive_covid_test' => $validated['positive_covid_test'],
            'symptoms' => $validated['symptoms'],
            'covid_swear' => $validated['covid_swear'],
            'current_meds' => $validated['current_meds'],
            'allergies' => $validated['allergies'],
            'infections' => $validated['infections'],
            'criminal_record' => $validated['criminal_record'],
            'criminal_record_details' => $validated['criminal_record_details'],
            'mental_illness' => $validated['mental_illness'],
            'mental_illness_details' => $validated['mental_illness_details'],
            'emergency_contact_name' => $validated['emergency_contact_name'],
            'emergency_contact_phone' => json_encode($validated['emergency_contact_phone']),
            'emergency_contact_relationship' => $validated['emergency_contact_relationship'],
            'resident_id' => $resident->id,
        ]);
    }
}
