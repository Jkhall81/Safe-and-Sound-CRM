<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;

class HouseManager extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'user_id',
        'house_id',
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'is_cpr_certified',
        'cpr_certification_number',
        'cpr_expiration_date',
    ];

    protected $casts = [
        'start_date' => 'datetime:Y-m-d',
        'end_date' => 'datetime:Y-m-d',
        'cpr_expiration_date' => 'datetime:Y-m-d',
        'is_cpr_certified' => 'boolean',
    ];

    // RELATIONSHIPS
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    // SCOPES
    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('end_date')->orWhere('end-date', '>', now());
    }

    public function scopeCurrent(Builder $query): Builder
    {
        return $query->where('start_date', '<=', now())->where(function ($q) {
            $q->whereNull('end_date')->orWhere('end_date', '>', now());
        });
    }

    // HELPERS
    public function isActive(): bool
    {
        return is_null($this->end_date) || $this->end_date > now();
    }

    public function isCprCurrent(): bool
    {
        return $this->is_cpr_certified && $this->cpr_expiration_date > now();
    }

    public function terminate(): void
    {
        $this->update(['end_date' => now()]);
    }
}
