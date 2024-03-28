<?php

use App\Events\PatientBookingCreated;
use App\Http\Controllers\Api\AdministrativeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorsController;
use App\Http\Controllers\Api\PatientBookingController;
use App\Http\Controllers\Api\ReceptionController;
use App\Http\Controllers\Api\SpecialtiesController;
use App\Models\User;
use App\Notifications\SendPatientCreatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('create-user', [AuthController::class, 'createUser']);
    Route::post('login', [AuthController::class, 'login']);
});
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [AuthController::class, 'profile']);
});



// Route::group(['middleware' => 'auth:api'], function () {
Route::resource('specialties', SpecialtiesController::class)->only([
    'store', 'index', 'destroy', 'update'
]);
// });


Route::group(['prefix' => 'doctors'], function () {
    Route::get('/', [DoctorsController::class, 'doctors']);
    Route::delete('/delete/doctor/{id}', [DoctorsController::class, 'destroyDoctor']);
    Route::patch('/update/doctor/{id}', [DoctorsController::class, 'updateDoctor']);

    //appointments
    Route::post('/create/{id}/appointments', [DoctorsController::class, 'createAppointments']);
    Route::get('/get/appointments', [DoctorsController::class, 'getAppointments']);
    // Route::get('/get-by-date/appointments', [DoctorsController::class, 'getByAppointments']);
    Route::get('/get-by/{id}/appointment', [DoctorsController::class, 'getByAppointment']);
    Route::delete('/delete/{id}/appointment', [DoctorsController::class, 'deleteAppointment']);
});

Route::group(['prefix' => 'administratives'], function () {
    Route::get('/', [AdministrativeController::class, 'administratives']);
    Route::delete('/delete/administrative/{id}', [AdministrativeController::class, 'destroyAdministrative']);
    Route::patch('/update/administrative/{id}', [AdministrativeController::class, 'updateAdministrative']);
});



Route::group(['prefix' => 'reception'], function () {
    Route::post('/add/patient', [ReceptionController::class, 'addPatient']);
    Route::get('/patients', [ReceptionController::class, 'patients']);
    Route::get('/patient/{id}', [ReceptionController::class, 'patientById']);
    Route::patch('/update/patient/{id}', [ReceptionController::class, 'updatePatient']);
    Route::delete('/delete/patient/{id}', [ReceptionController::class, 'destroyPatient']);
});

Route::group(['prefix' => 'bookings'], function () {
    Route::post('/add/patient/booking', [PatientBookingController::class, 'addBooking']);
    Route::get('/', [PatientBookingController::class, 'getBookings']);
    Route::get('/booking/search', [PatientBookingController::class, 'bookingSearch']);
    Route::delete('delete/bookings/{id}', [PatientBookingController::class, 'deleteBookings']);
});


//PatientBookingCreated

Route::get('/nada', function () {

    // PatientBookingCreated::dispatch();

    // event(new PatientBookingCreated("Hello Mahmoud event and listener is working "));

    // return 'welcome';


    $user = User::find(1); // Example user
    $user->notify(new SendPatientCreatedNotification());
});