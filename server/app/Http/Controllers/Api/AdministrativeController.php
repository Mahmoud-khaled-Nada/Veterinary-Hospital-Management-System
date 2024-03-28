<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdministrativeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function administratives()
    {
        $administratives = User::where('is_doctor', '=', '0')->get();
        return response()->json($administratives, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function updateAdministrative(Request $request, string $id)
    {
        try {
            $user = User::where('id', '=', $id)->where('is_doctor', '=', 0)->first();

            if (!$user) return response()->json(['message' => 'Administrative not found'], 400);
            
            $validatedData = $request->validate([
                'name' => ['nullable', 'string', 'min:3', 'max:100'],
                'email' => ['nullable', 'string', 'email', 'max:100', 'unique:users,email,' . $id],
                'phone' => ['nullable', 'string', 'between:2,50'],
                'password' => ['nullable', 'string', 'min:3'],
                'permission' => ['nullable', 'string', 'max:100'],
                'extra_info' => ['nullable', 'string'],
            ]);

            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);

            return response()->json(['message' => 'Administrative updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update administrative user'], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroyAdministrative(string $id)
    {
        try {
            $administrative = User::where('id', $id)->where('is_doctor', 0)->first();

            if (!$administrative) {
                return response()->json(['message' => 'Administrative user not found'], 404);
            }

            $administrative->delete();

            return response()->json(['message' => 'Administrative user deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete administrative user'], 500);
        }
    }
}
