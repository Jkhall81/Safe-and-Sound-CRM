<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IntakeLink extends Model
{
    //
    protected $fillable = ['house_id', 'token', 'expires_at'];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
