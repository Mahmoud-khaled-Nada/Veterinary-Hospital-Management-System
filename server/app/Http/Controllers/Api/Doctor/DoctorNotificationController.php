<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorNotificationController extends Controller
{
    public function newBooking()
    {
        try {
            $user = auth()->user();
            if (!$user->notifications->isEmpty()) {
                $notificationsData = [];
                foreach ($user->notifications as $notification) {
                    $notificationData = $notification->data;
                    $notificationData['notification_id'] = $notification->id;
                    $notificationData['notification_unread'] = $notification->unread();
                    $notificationsData[] = $notificationData;
                }
                return response()->json($notificationsData, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function readBookin(string $id)
    {
        if (!$id)
            return response()->json(["error" => "Notification ID is required"], 400);


        $user = auth()->user();

        $notification = $user->unreadNotifications()->find($id);

        if (!$notification) {
            return response()->json(["error" => "Notification not found"], 404);
        }

        $notification->markAsRead();

        return response()->json(["message" => "Notification marked as read"], 200);
    }
}
