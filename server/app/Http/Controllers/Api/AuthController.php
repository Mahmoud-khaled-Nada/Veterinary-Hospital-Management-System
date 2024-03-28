<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;


class AuthController extends Controller
{

    public function createUser(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:100', 'unique:users'],
            'phone' => ['nullable', 'string', 'between:2,50'],
            'password' => ['required', 'string', 'min:3'],
            'permission' => ['nullable', 'string', 'max:255'],
            'extra_info' => ['nullable', 'string'],
            'is_doctor' => ['nullable', 'boolean'], // Assuming is_doctor is boolean
            'specialty_id' => ['nullable', 'exists:specialties,id'], // Assuming specialties table exists
        ]);

        // Create the user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'permission' => $validatedData['permission'],
            'extra_info' => $validatedData['extra_info'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // If the user is marked as a doctor and a specialty ID is provided
        if ($validatedData['is_doctor'] && $validatedData['specialty_id']) {
            $user->update([
                'is_doctor' => true // Assuming is_doctor is boolean
            ]);

            // Create a new doctor record for the user
            $user->doctor()->create([
                'user_id' => $user->id,
                'specialty_id' => $validatedData['specialty_id'],
            ]);
        }

        return response()->json(['message' => 'User created successfully'], 201);
    }



    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                throw new \Exception($validator->errors(), 422);
            }

            if (!$token = auth()->attempt($validator->validated())) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $user = Auth::user();
            // return $this->respondWithToken($token);

            return response()->json(
                [
                    "token" => $this->respondWithToken($token),
                   "user" => $user
                ]
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }


    public function profile()
    {
        return response()->json(auth()->user());
    }


    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }
}
