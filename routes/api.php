<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/intake-links', function (Request $request) {
    $request->validate([
        'house_id' => 'required|exists:houses,id',
    ]);

    $token = Str::uuid();

    $link = \App\Models\IntakeLink::create([
        'house_id' => $request->house_id,
        'token' => $token,
        'expires_at' => Carbon::now()->addDays(3),
    ]);

    return response()->json(['token' => $link->token]);
});
