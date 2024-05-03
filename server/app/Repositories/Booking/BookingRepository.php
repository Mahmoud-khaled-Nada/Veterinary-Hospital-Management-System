<?php

namespace App\Repositories\Booking;

use App\Helpers\Helper;
use App\Models\Booking;
use App\Models\User;
use App\Notifications\SendCreateNewBookingNotification;
use Illuminate\Support\Facades\DB;

class BookingRepository implements IBookingRepository
{


    public function create(array $data)
    {
        try {

            if (!Helper::checkDoctorExists($data['user_id'])) {
                return response()->json(['message' => 'The ID you entered is not a doctor'], 404);
            }

            if (!Helper::checkPatientExists($data['patient_id'])) {
                return response()->json(['message' => 'The patient you are trying to admit does not exist'], 404);
            }

            DB::beginTransaction();

            $booking = Booking::create($data);

            $user = User::find($data['user_id']);
            $user->notify(new SendCreateNewBookingNotification($booking));

            DB::commit();

            return response()->json(['message' => 'Booking created successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed to create booking',
            ], 500);
        }
    }



    public function getBookings()
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

    public function bookingSearch($searchQuery)
    {
        $currentDate = now()->setTimezone('Africa/Cairo')->toDateString();
       
        $bookingsQuery = $this->getBookings()->where('booking_date', '>=', $currentDate);
    
        if ($searchQuery) {
            $bookingsQuery->where(function ($query) use ($searchQuery) {
                $query->whereHas('patient', function ($patientQuery) use ($searchQuery) {
                    $patientQuery->where('owner_name', 'like', '%' . $searchQuery . '%');
                })->orWhere('bookings.created_at', 'like', '%' . $searchQuery . '%');
            });
        }
    
        return $bookingsQuery->get();
    }
    


    public function deleteBooking($id)
    { 
        return Booking::destroy($id);
    }

    public function getBookinWithDetectionPrice()
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
