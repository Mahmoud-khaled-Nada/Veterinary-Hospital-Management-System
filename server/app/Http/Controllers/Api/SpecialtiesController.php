<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SpecialtiesController extends Controller
{

    public function index()
    {
        $specialties = Specialty::orderBy('id')->get();
    
        if ($specialties->isEmpty()) {
            return response()->json(["message" => "Specialties are empty"], 400);
        }
    
        return response()->json($specialties, 200);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'specialty_name' => 'required|string|max:100'
        ]);

       $specialty =  Specialty::create($request->all());

        return response()->json([
            $specialty,
            'message' => 'Specialty created successfully'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'specialty_name' => ['required', 'string', 'max:100', Rule::unique('specialties')->ignore($id)],
        ]);
    
        $specialty = Specialty::find($id);
    
        if (!$specialty) {
            return response()->json([
                'message' => 'Specialty not found'
            ], 404);
        }
    
        $specialty->update($request->all());
    
        return response()->json([
            $specialty,
            'message' => 'Specialty updated successfully'
        ], 200);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Specialty::destroy($id);
        return response()->json(['message' => 'Specialty deleted successfully', 'id' => $id], 200);
    }
}
