<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grievance extends Model
{
    //
    protected $fillable = [
        'nature',
        'title',
        'email',
        'date_of_incident',
        'incident_type',
        'incident_description',
        'parties_involved',
        'expectations',
        'attachments',
        'house_id', // important if using $fillable with relationships
    ];

    protected $casts = [
        'email' => 'array',
        'attachments' => 'array',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
