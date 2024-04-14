<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProcessController extends Controller
{
    public function patientsQueue()
    {
        // Get the current doctor's ID
        $doctorId = Auth::id();
    
        // Get the current date
        $currentDate = Carbon::today();
    
        $patients = Booking::join('patients', 'patients.id', '=', 'bookings.patient_id')
            ->where('bookings.user_id', $doctorId)
            ->where('bookings.booking_status', 'in_progress')
            ->whereDate('bookings.booking_date', $currentDate)
            ->select(
                'bookings.id as booking_id',
                'bookings.booking_status',
                'bookings.patient_id',
                'bookings.user_id',
                'bookings.specialty_id',
                'bookings.booking_date',
                'patients.owner_name',
                'patients.animal_name',
                'patients.animal_type'
            )
            ->orderBy('bookings.booking_status')
            ->orderBy('bookings.created_at')
            ->get();
    
        // Check if any patients exist in the queue for the current doctor and date
        if ($patients->isEmpty()) {
            return response()->json(["message" => "No patients in the queue today"], 404);
        }
    
        // Return the list of patients in the queue
        return response()->json($patients, 200);
    }
}
