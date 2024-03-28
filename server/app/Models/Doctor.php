<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id', 'specialty_id'
    ];

    /**
     * Create all relationships 
     *
     * @return Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
