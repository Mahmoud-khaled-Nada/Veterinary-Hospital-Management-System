<?php

namespace App\Helpers;

use App\Models\Patient;
use App\Models\User;

class GeneralValidation
{

    public static  function checkDoctorExists($doctorId): bool
    {
        return User::where('id', $doctorId)->where('is_doctor', 1)->exists();
    }

    public static function checkPatientExists($patientId): bool
    {
        return Patient::where('id', $patientId)->exists();
    }
}
