<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class ReceptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function addPatient(Request $request)
    {
        try {
            $request->validate([
                'owner_name' => ['required', 'min:3'],
                'owner_email' => ['required', 'email'],
                'owner_number' => ['required', 'min:3'],
                'animal_name' => ['required'],
                'animal_type' => ['required'],
            ]);

            $ownerName = $request->input('owner_name');
            $animalName = $request->input('animal_name');
            $animalType = $request->input('animal_type');
            $patientExists = $this->checkIsPatientHasAlready($ownerName, $animalName, $animalType);

            if ($patientExists) {
                return response()->json(['message' => 'Patient already exists'], 201);
            } else {
                $patient = Patient::create($request->all());
                return response()->json( [$patient->id ,  'message' => 'Patient created successfully'], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create patient'], 500);
        }
    }

    public function patients()
    {
        try {
            $patients = Patient::paginate(20);
            return response()->json($patients, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get patients'], 500);
        }
    }

    public function patientById($id)
    {
        try {
            $patient = Patient::findOrFail($id);
            return response()->json($patient, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get patient'], 500);
        }
    }


    public function updatePatient(Request $request, string $id)
    {
        try {
            $patient = Patient::findOrFail($id);

            $ownerName = $request->input('owner_name');
            $animalName = $request->input('animal_name');
            $animalType = $request->input('animal_type');
            $patientExistsonRequest = $this->checkIsPatientHasAlready($ownerName, $animalName, $animalType);

            if ($patientExistsonRequest || ($patient->owner_name === $ownerName && $patient->animal_name === $animalName && $patient->animal_type === $animalType)) {
                return response()->json(['message' => 'Patient already exists'], 201);
            }

            $patient->update($request->all());

            return response()->json(['message' => 'Patient updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update patient'], 500);
        }
    }


    public function destroyPatient(string $id)
    {
        try {
            $patient = Patient::findOrFail($id);
            $patient->delete();
            return response()->json(['message' => 'Patient deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete patient'], 500);
        }
    }


    private function checkIsPatientHasAlready($ownerName, $animalName, $animalType)
    {
        $exist = Patient::where('owner_name', $ownerName)
            ->where('animal_name', $animalName)
            ->where('animal_type', $animalType)->first();
        return $exist ? true : false;
    }
}
