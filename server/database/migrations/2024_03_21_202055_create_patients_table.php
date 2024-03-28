<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('patients', function (Blueprint $table) {
        $table->id();
        $table->string('owner_name', 100);
        $table->string('owner_email', 200);
        $table->string('owner_number', 100);
        $table->string('animal_name', 100);
        $table->string('animal_type', 100);
        $table->timestamps();

        $table->unique(['owner_name', 'animal_name', 'animal_type']);
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};


