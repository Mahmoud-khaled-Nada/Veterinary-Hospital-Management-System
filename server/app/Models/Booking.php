<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;


    protected $fillable = [
        'patient_id', 'user_id', 'specialty_id',
        'detection_price', 'booking_date', 'medications',
        'doctor_report', 'booking_status'
    ];

    // relationship

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class);
    }
}
