<?php

namespace App\Helpers;

use App\Models\Booking;

class GeneralFunction implements Helpers
{
    public static function bookings()
    {
        return  Booking::join('patients', 'patients.id', '=', 'bookings.patient_id')
            ->join('users', 'users.id', '=', 'bookings.user_id')
            ->join('specialties', 'specialties.id', '=', 'bookings.specialty_id')
            ->select(
                'bookings.*',
                'patients.owner_name',
                'users.name as doctor_name',
                'specialties.specialty_name'
            );
    }


    public static function deleteBooking($id)
    {
        return  $id ? Booking::destroy($id) : false;
    }


    public static function safe()
    {
        return  Booking::join('patients', 'patients.id', '=', 'bookings.patient_id')
            ->join('users', 'users.id', '=', 'bookings.user_id')
            ->join('specialties', 'specialties.id', '=', 'bookings.specialty_id')
            ->select(
                'bookings.id',
                'bookings.booking_date',
                'bookings.detection_price',
                'bookings.booking_status',
                'bookings.created_at',
                'patients.owner_name',
                'users.name as doctor_name',
                'specialties.specialty_name'
            );
    }
}
