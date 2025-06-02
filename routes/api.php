<?php

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Route;

Route::post('/intake-links', function (Request $request) {
    $request->validate([
        'house_id' => 'required|exists:houses,id',
    ]);

    $token = Str::uuid();

    $link = \App\Models\IntakeLink::create([
        'house_id' => $request->house_id,
        'token' => $token,
    ]);

    return response()->json(['token' => $link->token]);
});
