<?php

namespace App\Http\Middleware;

use App\Models\DoctorAppointment;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeletePastDoctorAppointmentsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $currentDate = Carbon::now('Africa/Cairo')->format('Y-m-d');
            DoctorAppointment::where('day', '<', $currentDate)->delete();
            return $next($request);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting past appointments'], 500);
        }
    }
}
