<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorAppointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'day', 'start_time', 'end_time', 'cases_number'
    ];


    public function doctor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
