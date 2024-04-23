<?php

namespace App\Http\Controllers\Api\Reception;

use App\Helpers\GeneralValidation;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Notifications\SendCreateNewBookingNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{

    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'required|exists:patients,id',
                'user_id' => 'required|exists:users,id',
                'specialty_id' => 'required|exists:specialties,id',
                'booking_date' => 'required|date',
                'detection_price' => 'required|numeric',
            ]);

            if (!GeneralValidation::checkDoctorExists($validatedData['user_id'])) {
                return response()->json(['message' => 'The ID you entered is not a doctor'], 404);
            }

            if (!GeneralValidation::checkPatientExists($validatedData['patient_id'])) {
                return response()->json(['message' => 'The patient you are trying to admit does not exist'], 404);
            }

            $booking = Booking::create($validatedData);

            $user = User::find($validatedData['user_id']);
            $user->notify(new SendCreateNewBookingNotification($booking));

            return response()->json(['message' => 'Booking created successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed to create booking',
            ], 500);
        }
    }
    public function booking()
    {
        try {
            $currentDate = now()->setTimezone('Africa/Cairo')->toDateString();
            $bookings = $this->bookings()
                ->where('booking_date', '>=', $currentDate)
                ->where(function ($query) {
                    $query->where('booking_status', 'waiting')
                        ->orWhere('booking_status', 'in_progress');
                })
                ->orderByRaw("CASE WHEN booking_status = 'in_progress' THEN 0 ELSE 1 END")
                ->paginate(20);


            if ($bookings->isEmpty())
                return response()->json(["message" => "Booking is empty"], 404);

            return response()->json($bookings, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed get booking',
            ], 500);
        }
    }
    public function search(Request $request)
    {
        $searchQuery = $request->input('query');
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
    public function delete($id)
    {
        $booking = Booking::find($id);
        if (!$booking)
            return response()->json(['message' => 'Booking not found'], 404);

        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }


    private function bookings()
    {
        return Booking::join('patients', 'patients.id', '=', 'bookings.patient_id')
            ->join('users', 'users.id', '=', 'bookings.user_id')
            ->join('specialties', 'specialties.id', '=', 'bookings.specialty_id')
            ->select(
                'bookings.*',
                'patients.owner_name',
                'users.name as doctor_name',
                'specialties.specialty_name',
            )->orderBy('bookings.booking_date');
    }
}
