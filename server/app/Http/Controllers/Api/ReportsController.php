<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    //booking
    public function booking(Request $request)
    {
       $req =  $request->validate([
        "booking_status" => "required",
        "from" => "required",
        "to" => "required",
        ]);

        return $req['booking_status'];

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
            'pb.booking_status',
            'pb.created_at'
        )->orderBy('pb.booking_date');
    return $bookings;
    }
}