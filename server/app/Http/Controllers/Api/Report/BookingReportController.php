<?php

namespace App\Http\Controllers\Api\Report;

use App\Helpers\GeneralFunction;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingReportController extends Controller
{
    public function booking(Request $request)
    {
        try {
            $statue = $request->input('statue');
            $startDate = Carbon::parse($request->input('startDate'));
            $endDate = Carbon::parse($request->input('endDate'));

            $bookings = GeneralFunction::bookings()
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
        $delete = GeneralFunction::deleteBooking($id);

        if ($delete) {
            return response()->json([
                'message' => 'Booking deleted successfully',
                'status' => true
            ]);
        } else {
            return response()->json([
                'message' => 'Booking not found or could not be deleted',
                'status' => false
            ], 404);
        }
    }
}
