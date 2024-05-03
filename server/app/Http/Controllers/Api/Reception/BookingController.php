<?php

namespace App\Http\Controllers\Api\Reception;

use App\Helpers\GeneralValidation;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Notifications\SendCreateNewBookingNotification;
use App\Repositories\Booking\IBookingRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingController extends Controller
{

    protected $bookingRepository;

    public function __construct(IBookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

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

            // Call the repository's create method
            $response = $this->bookingRepository->create($validatedData);

            return $response;
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
            $bookings = $this->bookingRepository->getBookings()
                ->where('booking_date', '>=', $currentDate)
                ->where(function ($query) {
                    $query->where('booking_status', 'waiting')
                        ->orWhere('booking_status', 'in_progress');
                })
                ->orderByRaw("CASE WHEN booking_status = 'in_progress' THEN 0 ELSE 1 END")
                ->paginate(10);

            cache()->put('bookings',  $bookings);
            $value = cache()->get('bookings');
            if ($bookings->isEmpty())
                return response()->json(["message" => "Booking is empty"], 404);

            return response()->json($value, 200);
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
        $bookings = $this->bookingRepository->bookingSearch($searchQuery);

        return response()->json($bookings, 200);
    }
    public function delete($id)
    {
        $booking = Booking::find($id);
        if (!$booking) return response()->json(['message' => 'Booking not found'], 404);

        $this->bookingRepository->deleteBooking($id);

        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }
}
