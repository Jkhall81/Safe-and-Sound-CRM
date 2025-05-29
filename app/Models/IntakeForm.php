<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntakeForm extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'intake_form';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'house_id',
        'resident_id',
        'full_name',
        'dob',
        'phones',
        'dl_number',
        'last_address',
        'email',
        'sobriety_date',
        'referred_by',
        'drug_of_choice',
        'car',
        'car_make_and_model',
        'license_plate_number',
        'program_fee',
        'covid_exposure',
        'positive_covid_test',
        'symptoms',
        'covid_swear',
        'current_meds',
        'allergies',
        'infections',
        'criminal_record',
        'criminal_record_details',
        'mental_illness',
        'mental_illness_details',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relationship',
        'move_in_date',
    ];

    // Cast the attributes to the appropriate data types
    protected $casts = [
        'phones' => 'array',
        'email' => 'array',
        'emergency_contact_phone' => 'array',
        'dob' => 'date',
        'sobriety_date' => 'date',
        'move_in_date' => 'date',
    ];

    /**
     * Get the house that owns the intake form.
     */
    public function house()
    {
        return $this->belongsTo(House::class);
    }

    /**
     * Get the resident that owns the intake form.
     */
    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
