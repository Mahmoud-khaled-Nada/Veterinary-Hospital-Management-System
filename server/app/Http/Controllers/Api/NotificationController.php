<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;

class NotificationController extends Controller
{

    public function bookingPatientsNotifications()
    {
        try {
            $user = Auth::id();
            $authenticatedUser = User::find($user);
            $patientNotifications = [];
            foreach ($authenticatedUser->notifications as $notification) {
                $patientId = $notification->data['patient_id'];
                $patient = Patient::find($patientId);

                if ($patient) {
                    $patientNotifications[] = [
                        'unread' => $notification->unread(),
                        'notification_id' => $notification->id,
                        'owner_name' => $patient->owner_name,
                        'owner_email' => $patient->owner_email,
                        'animal_name' => $patient->animal_name,
                        'animal_type' => $patient->animal_type,
                        'booking_at' => $notification->created_at->longAbsoluteDiffForHumans(),
                    ];
                }
            }
            if (!$patientNotifications)
                return response()->json(['message' => "This doctor not have any notifications"], 404);

            return response()->json($patientNotifications, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function readBookingPatientsNotifications($id)
    {
        if ($id) {
            $user = Auth::id();
            $authenticatedUser = User::find($user);
            $notification = $authenticatedUser->unreadNotifications()->find($id);
            $notification->markAsRead();
            return response()->json(["message" => "Notification marked as read"], 200);
        }
    }
}
