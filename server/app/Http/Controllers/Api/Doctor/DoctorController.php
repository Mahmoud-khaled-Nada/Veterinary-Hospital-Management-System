<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use App\Http\Resources\Doctor\DoctorResource;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorController extends Controller
{
    public function doctors(): JsonResource
    {
        $doctors = DB::table('doctors')
            ->join('users', 'users.id', '=', 'doctors.user_id')
            ->join('specialties', 'specialties.id', '=', 'doctors.specialty_id')
            ->select(
                'users.*',
                'specialties.specialty_name',
                'specialties.id as specialty_id',
            )
            ->get();

        return DoctorResource::collection($doctors);
    }

    public function update(Request $request, string $id)
    {
        try {
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'name' => ['nullable', 'string', 'min:3', 'max:100'],
                'email' => ['nullable', 'string', 'email', 'max:100', 'unique:users'],
                'phone' => ['nullable', 'string', 'between:2,50'],
                'password' => ['nullable', 'string', 'min:3'],
                'permission' => ['nullable', 'string', 'max:255'],
                'specialty_id' => ['nullable', 'exists:specialties,id'],
            ]);

            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

           


            if (isset($validatedData['specialty_id'])) {
                $user->doctor()->updateOrCreate(
                    ['user_id' => $user->id],
                    ['specialty_id' => $validatedData['specialty_id']]
                );
            }

            $user->update($validatedData);
            return response()->json(['message' => 'Doctor updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update doctor'], 500);
        }
    }

    public function delete(int $id)
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
}
