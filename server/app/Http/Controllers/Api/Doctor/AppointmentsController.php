<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Exceptions\DoctorNotFoundException;
use App\Http\Controllers\Controller;
use App\Models\DoctorAppointment;
use App\Models\User;
use App\Rules\FutureDate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AppointmentsController extends Controller
{
    public function createAppointments(Request $request)
    {
        try {
            $doctor = $this->getUserAsDoctor();
            $validatedData = $request->validate([
                'day' => ['required', 'string', new FutureDate],
                'start_time' => ['required', 'string'],
                'end_time' => ['required', 'string'],
                'cases_number' => ['required', 'string'],
            ]);

            $exist = $doctor->doctorAppointments()->where('day', '=',  $request->post('day'))->first();
            if ($exist)
                return response()->json(['message' => 'Appointment already exists'], 400);

            // Create the appointment
            $create =   $doctor->doctorAppointments()->create($validatedData);

            // Return response
            return response()->json([
                $create,
                'message' => 'Appointment created successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create appointment'], 500);
        }
    }
    public function getAppointments()
    {
        try {
            $appointments = DB::table('doctor_appointments as appointments')
                ->join('users', 'users.id', '=', 'appointments.user_id')
                ->join('doctors', 'doctors.user_id', '=', 'users.id')
                ->join('specialties', 'doctors.specialty_id', '=', 'specialties.id')
                ->select(
                    'appointments.user_id',
                    'appointments.day',
                    'appointments.start_time',
                    'appointments.end_time',
                    'appointments.cases_number',
                    'users.name as doctor_name',
                    'specialties.specialty_name'
                )->get();

            if (!$appointments)  return response()->json(['message' => 'appointments is empty'], 404);

            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create appointment'], 500);
        }
    }
    public function doctorAppointment()
    {
        $doctor = $this->getUserAsDoctor();
        try {
            $appointments = $doctor->doctorAppointments()->get();

            if ($appointments->isEmpty()) {
                return response()->json(['message' => 'No appointments found'], 404);
            }

            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch appointments'], 500);
        }
    }



    public function deleteAppointment(int $id)
    {
        DoctorAppointment::destroy($id);
        return response()->json(['id' => $id, 'status' => true], 200);
    }



    private function getUserAsDoctor()
    {
        $id = auth()->user()->id;
        $doctor = User::where('id', $id)->where('is_doctor', 1)->first();
        if (!$doctor) throw new DoctorNotFoundException('Doctor not found');
        return $doctor;
    }
}
