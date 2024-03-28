<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\PatientBooking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PatientBookingController extends Controller
{
    public function addBooking(Request $request)
    {
        try {
            // Validate request inputs
            $request->validate([
                'patient_id' => 'required|exists:patients,id',
                'user_id' => 'required|exists:users,id',
                'specialty_id' => 'required|exists:specialties,id',
                'booking_date' => 'required',
                'detection_price' => 'required',
            ]);

            // Retrieve inputs from request
            $userId = $request->input('user_id');
            $specialtyId = $request->input('specialty_id');
            $patientId = $request->input('patient_id');

            // Check if the user is a doctor
            if (!$this->checkIsDoctor($userId)) {
                return response()->json(['message' => 'The ID you entered is not a doctor'], 404);
            }

            // Check if patient exists
            if (!$this->checkPatient($patientId)) {
                return response()->json(['message' => 'The patient you are trying to admit does not exist'], 404);
            }

            // Create booking
            PatientBooking::create([
                'patient_id' => $patientId,
                'user_id' => $userId,
                'specialty_id' => $specialtyId,
                'booking_date' => $request->input('booking_date'),
                'detection_price' => $request->input('detection_price'),
            ]);

            return response()->json(['message' => 'Booking created successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    public function getBookings()
    {
        $bookings = $this->bookings()->get();

        return response()->json($bookings, 200);
    }

    public function deleteBookings($id)
    {
        $booking = PatientBooking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }

    public function bookingSearch(Request $request)
    {
        $searchQuery = $request->input('query');
    
        // Get the base query for bookings
        $bookingsQuery = $this->bookings();
    
        if ($searchQuery) {
            $bookingsQuery->where(function ($query) use ($searchQuery) {
                $query->where('p.owner_name', 'like', '%' . $searchQuery . '%')
                    ->orWhere('pb.created_at', 'like', '%' . $searchQuery . '%');
            });
        }
    
        $bookings = $bookingsQuery->get();
    
        // Return the results
        return response()->json($bookings, 200);
    }
    
    private function bookings()
    {
        $bookings = DB::table('patient_bookings as pb')
            ->join('patients as p', 'p.id', '=', 'pb.patient_id')
            ->join('users as u', 'u.id', '=', 'pb.user_id')
            ->join('specialties as s', 's.id', '=', 'pb.specialty_id')
            ->select(
                'pb.id',
                'p.owner_name',
                'u.name as doctor_name',
                's.specialty_name',
                'pb.booking_date',
                'pb.detection_price',
                'pb.medications',
                'pb.doctor_report',
                // 'pb.booking_status', // Corrected field name
                'pb.created_at'
            )->orderBy('pb.booking_date');
        return $bookings;
    }
    

    private function checkIsDoctor($doctorId)
    {
        return User::where('id', $doctorId)->where('is_doctor', '=', '1')->exists();
    }

    private function checkPatient($patientId)
    {
        return Patient::find($patientId) !== null;
    }
}
