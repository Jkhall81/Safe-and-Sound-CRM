<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\IntakeFormController;
use App\Http\Controllers\UaTestController;
use App\Http\Controllers\ProgramFeeController;
use App\Http\Controllers\EvacDrillController;
use App\Http\Controllers\GrievanceController;
use App\Http\Controllers\GeoCocController;
use App\Http\Controllers\MaintenanceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Houses
Route::get('/house/{house}', [HouseController::class, 'show'])->middleware(['auth', 'verified'])->name('house.show');

// Rooms
Route::get('/rooms/{room}', [RoomController::class, 'show'])->middleware(['auth', 'verified'])->name('room.show');
Route::post('/rooms/{room}/resident', [RoomController::class, 'updateResident'])->middleware(['auth', 'verified'])->name('room.resident.update');

// Forms
Route::middleware(['auth', 'verified'])->group(function () {
    // Intake Form
    Route::get('/house/{house}/intake-form', [IntakeFormController::class, 'show'])->name('intake.show');
    Route::post('/house/{house}/intake-form', [IntakeFormController::class, 'store'])->name('intake.store');

    // UA Tests
    Route::get('/ua-tests/{house}', [UaTestController::class, 'show'])->name('ua.show');
    Route::post('/ua-tests/{house}', [UaTestController::class, 'store'])->name('ua.store');

    // Program Fee Tracker
    Route::get('/program-fee', [ProgramFeeController::class, 'show'])->name('program-fee.show');
    Route::post('/program-fee', [ProgramFeeController::class, 'store'])->name('program-fee.store');

    // Evac Drill
    Route::get('/evac-drill/{house}', [EvacDrillController::class, 'show'])->name('evac.show');
    Route::post('/evac-drill/{house}', [EvacDrillController::class, 'store'])->name('evac.store');

    // Grievance Form
    Route::get('/grievance/{house}', [GrievanceController::class, 'show'])->name('grievance.show');
    Route::post('/grievance/{house}', [GrievanceController::class, 'store'])->name('grievance.store');

    // GEO/COC Form
    Route::get('/geo-coc/{house}', [GeoCocController::class, 'show'])->name('geo-coc.show');
    Route::post('/geo-coc/{house}', [GeoCocController::class, 'store'])->name('geo-coc.store');

    // Maintenance Form
    Route::get('/maintenance/{house}', [MaintenanceController::class, 'show'])->name('maintenance.show');
    Route::post('/maintenance/{house}', [MaintenanceController::class, 'store'])->name('maintenance.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
