<?php

namespace App\Http\Resources\Doctor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'is_doctor' => $this->is_doctor,
            'permission' => $this->permission,
            'specialty_id' => $this->specialty_id,
            'specialty_name' => $this->specialty_name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}