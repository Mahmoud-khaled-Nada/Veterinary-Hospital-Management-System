<?php

namespace App\Http\Controllers\Api\Report;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Repositories\Booking\IBookingRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SafeReportController extends Controller
{

    protected $bookingRepository;

    public function __construct(IBookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function safe(Request $request)
    {
        try {
            $startDate = Carbon::parse($request->input('startDate'));
            $endDate = Carbon::parse($request->input('endDate'));

            $safe = $this->bookingRepository->getBookinWithDetectionPrice()
                ->whereBetween('bookings.created_at', [$startDate, $endDate])
                ->orderBy('bookings.created_at')->get();

            $total = $safe->sum('detection_price');

            return response()->json([
                'safe' => $safe,
                'total' =>  $total
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
