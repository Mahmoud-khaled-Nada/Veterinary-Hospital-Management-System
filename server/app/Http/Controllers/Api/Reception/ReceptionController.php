<?php

namespace App\Http\Controllers\Api\Reception;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReceptionController extends Controller
{
    

    public function transferPatientToDoctor(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'booking_id' => 'required|exists:bookings,id',
                'booking_status' => 'required|in:cancel,in_progress',
            ]);
    
            $booking = Booking::findOrFail($validatedData['booking_id']);
    
            if ($validatedData['booking_status'] === 'cancel') {
                $booking->update(['booking_status' => 'cancel']);
                return response()->json([$booking, 'message' => 'Booking canceled successfully'], 200);
            }
    
            if ($validatedData['booking_status'] === 'in_progress') {
                $booking->update(['booking_status' => 'in_progress']);
                DB::table('booking_queues')->insert(['booking_id' => $booking->id]);
                return response()->json([$booking,'message' => 'Booking transferred to doctor successfully'], 200);
            }
            
            return response()->json(['message' => 'Invalid booking status'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function bookingDone(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'booking_id' => 'required|exists:bookings,id',
                'booking_status' => 'required',
                'medications' => 'nullable',
                'doctor_report' => 'nullable',
            ]);
    
            $booking = Booking::findOrFail($validatedData['booking_id']);
    
            $medications = $validatedData['medications'];
            $doctorReport = $validatedData['doctor_report'];
    
            $dataToUpdate = ['booking_status' => 'done'];
            if ($medications || $doctorReport) {
                $dataToUpdate['medications'] = $medications;
                $dataToUpdate['doctor_report'] = $doctorReport;
            }
    
            $booking->update($dataToUpdate);
    
            return response()->json(['message' => 'Booking finished successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
