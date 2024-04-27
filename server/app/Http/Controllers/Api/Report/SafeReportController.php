<?php

namespace App\Http\Controllers\Api\Report;

use App\Helpers\GeneralFunction;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SafeReportController extends Controller
{
    public function safe(Request $request)
    {
        try {

            $startDate = Carbon::parse($request->input('startDate'));
            $endDate = Carbon::parse($request->input('endDate'));
            
            $safe = GeneralFunction::safe()
                ->whereBetween('bookings.created_at', [$startDate, $endDate])
                ->orderBy('bookings.created_at')
                ->get();

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
