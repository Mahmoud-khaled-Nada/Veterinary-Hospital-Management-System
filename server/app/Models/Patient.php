<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_name', 'owner_email', 'owner_number', 'animal_name', 'animal_type'
    ];


    // relationship

    public function patientBookings()
    {
        return $this->hasMany(PatientBooking::class);
    }
}