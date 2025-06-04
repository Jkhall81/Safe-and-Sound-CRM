<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\House;
use App\Models\ProgramFee;
use App\Models\ProgramFeePayment;
use Illuminate\Support\Facades\DB;
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

    public function store(Request $request, House $house)
    {
        $validated = $request->validate([
            'program_fee_date' => 'required|date',
            'notes' => 'nullable|string',
            'amounts_collected' => 'required|array',
            'amounts_collected.*' => 'nullable|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated, $house) {
            $totalCollected = array_sum(array_map('floatval', $validated['amounts_collected']));
            $residentCount = count(array_filter($validated['amounts_collected'], fn($v) => $v !== null));

            $programFee = ProgramFee::create([
                'house_id' => $house->id,
                'program_fee_date' => $validated['program_fee_date'],
                'notes' => $validated['notes'] ?? null,
                'total_collected' => $totalCollected,
                'resident_count' => $residentCount,
            ]);

            foreach ($validated['amounts_collected'] as $residentId => $amount) {
                if ($amount === null) continue;

                ProgramFeePayment::create([
                    'program_fee_id' => $programFee->id,
                    'resident_id' => $residentId,
                    'amount' => $amount,
                ]);
            }
        });
    }
}
