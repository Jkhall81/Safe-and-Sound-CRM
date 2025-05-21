<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    //
    public function manager() {
        return $this->hasOne(HouseManager::class);
    }

    public function licenses() {
        return $this->hasMany(License::class);
    }

    public function rooms() {
        return $this->hasMany(Room::class);
    }

    public function residents() {
        return $this->hasMany(Resident::class);
    }
}
