<?php

namespace App\Http\Controllers\Api\Report;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Repositories\Booking\IBookingRepository;
use BookingRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingReportController extends Controller
{

    protected $bookingRepository;

    public function __construct(IBookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function booking(Request $request)
    {
        try {
            $statue = $request->input('statue');
            $startDate = Carbon::parse($request->input('startDate'));
            $endDate = Carbon::parse($request->input('endDate'));

            $bookings = $this->bookingRepository->getBookings()
                ->where('bookings.booking_status', $statue)
                ->whereBetween('bookings.created_at', [$startDate, $endDate])
                ->orderBy('bookings.created_at')
                ->get();
                
            return response()->json($bookings);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteBooking(int $id)
    {
        $delete = $this->bookingRepository->deleteBooking($id);

        if ($delete) {
            return response()->json([
                'message' => 'Booking deleted successfully',
                'status' => true
            ], 201);
        } else {
            return response()->json([
                'message' => 'Booking not found or could not be deleted',
                'status' => false
            ], 404);
        }
    }
}
