<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\DoctorNotFoundException;
use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\DoctorAppointment;
use App\Models\Specialty;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function doctors()
    {
        $doctors = DB::table('doctors')
            ->join('users', 'users.id', '=', 'doctors.user_id')
            ->join('specialties', 'specialties.id', '=', 'doctors.specialty_id')
            ->select(
                'users.id',
                'users.name',
                'users.email',
                'users.phone',
                'users.permission',
                'users.created_at',
                'users.extra_info',
                'specialties.specialty_name',
                'specialties.id as specialty_id',
            )
            ->get();

        return response()->json($doctors, 200);
    }

    public function updateDoctor(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => ['nullable', 'string', 'min:3', 'max:100'],
            'email' => ['nullable', 'string', 'email', 'max:100', 'unique:users'],
            'phone' => ['nullable', 'string', 'between:2,50'],
            'password' => ['nullable', 'string', 'min:3'],
            'permission' => ['nullable', 'string', 'max:255'],
            'extra_info' => ['nullable', 'string'],
            'is_doctor' => ['nullable', 'boolean'],
            'specialty_id' => ['nullable', 'exists:specialties,id'],
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);


        if (isset($validatedData['is_doctor']) && isset($validatedData['specialty_id'])) {
            $user->doctor()->updateOrCreate(
                ['user_id' => $user->id],
                ['specialty_id' => $validatedData['specialty_id']]
            );
        }

        return response()->json(['message' => 'Doctor updated successfully'], 200);
    }

    public function destroyDoctor(string $id)
    {
        try {
            $doctor = Doctor::where('user_id', $id)->first();
            if (!$doctor) {
                return response()->json(['message' => 'Doctor not found'], 404);
            }
            $doctor->delete();
            User::destroy($id);
            return response()->json(['message' => 'Doctor deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete doctor'], 500);
        }
    }

    // the private method

    private function getUserAsDoctor(string $id)
    {
        $doctor = User::where('id', $id)->where('is_doctor', 1)->first();

        if (!$doctor) throw new DoctorNotFoundException('Doctor not found');

        return $doctor;
    }

    //Doctor Appointments

    public function createAppointments(Request $request,  $id)
    {
        $doctor = $this->getUserAsDoctor($id);

        $validatedData = $request->validate([
            'day' => ['required', 'string'],
            'start_time' => ['required', 'string'],
            'end_time' => ['required', 'string'],
            'cases_number' => ['required', 'string'],
        ]);

        $isExist = $doctor->doctorAppointments()->where('day', '=',  $request->post('day'))->first();
        if ($isExist)
            return response()->json(['message' => 'Appointment already exists'], 400);

        // Create the appointment
        $create = $doctor->doctorAppointments()->create($validatedData);

        // Return response
        return $create
            ? response()->json([
                'message' => 'Appointment created successfully',
                'data' => $create
            ], 200)
            : response()->json(['message' => 'Failed to create appointment'], 500);
    }

    public function getAppointments()
    {
        // $appointments = DoctorAppointment::with('doctor')->get();
        $appointments = DB::table('doctor_appointments as appointments')
            ->join('users', 'appointments.user_id', '=', 'users.id')
            ->join('doctors', 'users.id', '=', 'doctors.user_id')
            ->join('specialties', 'doctors.specialty_id', '=', 'specialties.id')
            ->select(
                'appointments.id',
                'appointments.user_id',
                'users.name as doctor_name',
                'appointments.day',
                'appointments.start_time',
                'appointments.end_time',
                'appointments.cases_number',
                'specialties.specialty_name'
            )->get();

        return response()->json($appointments, 200);
    }


    public function getByAppointment(string $id)
    {
        $user = Auth::user();

        // if ($id != $user->id) return response()->json(404);
        $doctor = $this->getUserAsDoctor($id);

        $appointments = $doctor->doctorAppointments()->get();

        return response()->json($appointments, 200);
    }

    public function deleteAppointment(string $id)
    {
        DoctorAppointment::destroy($id);
        return response()->json(['message' => 'Appointment deleted successfully'], 200);
    }


    public function patientsQueue()
    {
        $doctor = Auth::id();
        $currentDate = Carbon::now()->toDateString();

        $patients = DB::table('patient_bookings')
            ->join('patients', 'patients.id', '=', 'patient_bookings.patient_id')
            ->where('patient_bookings.user_id', '=', $doctor)
            ->where('patient_bookings.booking_status', '=', "in_progress")
            ->whereDate('patient_bookings.booking_date', '=', $currentDate)
            ->select(
                'patient_bookings.id as booking_id',
                'patient_bookings.booking_status',
                'patient_bookings.patient_id',
                'patient_bookings.user_id',
                'patient_bookings.specialty_id',
                'patient_bookings.booking_date',
                'patients.owner_name',
                'patients.animal_name',
                'patients.animal_type'
            )
            ->orderBy('patient_bookings.booking_status')
            ->orderBy('patient_bookings.created_at')
            ->get();
        return response()->json($patients, 200);
    }

    // public function currentPatients()
    // {
    //     $doctor = Auth::id();
    //     $currentDate = Carbon::now()->toDateString();

    //     $patient = DB::table('patient_bookings')
    //         ->join('patients', 'patients.id', '=', 'patient_bookings.patient_id')
    //         ->where('patient_bookings.user_id', '=', $doctor)
    //         ->where('patient_bookings.booking_status', '=', "in_progress")
    //         ->whereDate('patient_bookings.booking_date', '=', $currentDate)
    //         ->select(
    //             'patient_bookings.patient_id',
    //             'patient_bookings.user_id as doctor_id',
    //             'patients.owner_name',
    //             'patients.animal_name',
    //             'patients.animal_type'
    //         )
    //         ->orderBy('patient_bookings.created_at')
    //         ->first();

    //     return response()->json($patient, 200);
    // }
}
