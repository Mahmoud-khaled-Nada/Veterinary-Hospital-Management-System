<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PatientBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PatientProcessController extends Controller
{
    public function transferToDoctor(Request $request)
    {
        try {
            $request->validate([
                'booking_id' => 'required|exists:patient_bookings,id',
                'booking_status' => 'required|in:cancel,in_progress',
            ]);

            $booking = PatientBooking::findOrFail($request->input('booking_id'));

            $status = $request->input('booking_status');

            if ($status === 'cancel') {
                $booking->update(['booking_status' => 'cancel']);
                return response()->json(['message' => 'Booking canceled successfully'], 200);
            }

            if ($status === 'in_progress') {
                $booking->update(['booking_status' => 'in_progress']);
                DB::table('patients_queue')->insert([
                    'booking_id' => $booking->id,
                ]);
                return response()->json(['message' => 'Booking transferred to doctor successfully'], 200);
            }

            return response()->json(['message' => 'Invalid booking status'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
