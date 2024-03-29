<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function bookingPatientsNotifications(Request $request)
    {
        $user = Auth::id();
        $authenticatedUser = User::find($user);
        $unreadPatientNotifications = [];
        foreach ($authenticatedUser->unreadNotifications as $notification) {
            $patientId = $notification->data['patient_id'];
            $patient = Patient::find($patientId);

            if ($patient) {
                $unreadPatientNotifications[] = [
                    'owner_name' => $patient->owner_name,
                    'owner_email' => $patient->owner_email,
                    'animal_name' => $patient->animal_name,
                    'animal_type' => $patient->animal_type,
                    'booking_at' => $notification->created_at->longAbsoluteDiffForHumans(),
                ];
            }
        }

        return $unreadPatientNotifications;
    }
}
