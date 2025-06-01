<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EvacDrill;
use App\Models\Grievance;

class House extends Model
{
    //
    use SoftDeletes;
    use HasFactory;

    protected $casts = [
        'opening_date' => 'date:Y-m-d',
        'closing_date' => 'date:Y-m-d',
        'license_expiration' => 'date:Y-m-d',
        'additional_licenses' => 'array',
        'coordinates' => 'array',
    ];

    public function manager()
    {
        return $this->hasOne(HouseManager::class);
    }

    public function licenses()
    {
        return $this->hasMany(License::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function residents()
    {
        return $this->hasMany(Resident::class);
    }

    public function activeResidents()
    {
        return $this->hasMany(Resident::class)->where('status', ['active', 'on_leave']);
    }

    public function activeManagers()
    {
        return $this->hasMany(HouseManager::class)->whereNull('end_date');
    }

    public function evacDrills()
    {
        return $this->hasMany(EvacDrill::class);
    }

    public function grievances()
    {
        return $this->hasMany(Grievance::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeNeedsLicenseRenewal($query)
    {
        return $query->whereDate('license_expiration', '<', now()->addDays(30));
    }

    // Business Logic Methods
    public function isAcceptingResidents(): bool
    {
        return $this->status === 'active' && $this->current_residents_count < $this->max_residents;
    }

    public function hasVacandies(): bool
    {
        return $this->rooms()->where('is_occupied', false)->exists();
    }

    public function renewLicense(array $data): void
    {
        $this->update([
            'license_number' => $data['number'],
            'license_expiration' => $data['expiration']
        ]);
    }

    protected static function booted()
    {
        static::saving(function ($house) {
            if ($house->current_residents_count > $house->max_residents) {
                throw new \Exception('Cannot exceed maximum resident capacity');
            }
        });
    }

    // Helper Functions
    public function getFullAddressAttribute(): string
    {
        return "{$this->address} {$this->city}, {$this->state} {$this->zip_code}";
    }

    public function getLicenseStatusAttribute(): string
    {
        if ($this->license_expiration < now()) {
            return 'expired';
        }
        return $this->license_expiration < now()->addDays(30) ? 'expiring_soon' : 'valid';
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
