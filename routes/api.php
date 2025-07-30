<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TourPlanController;
use App\Http\Controllers\Api\OfficeAttendanceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login', [AuthController::class, 'login']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    
Route::post('tourplans', [TourPlanController::class, 'store']);
Route::post('salesman-visti', [TourPlanController::class, 'SalesManVisit']);
Route::post('salesman-visti-capture', [TourPlanController::class, 'Salesmanstorephoto']);
Route::post('salesman-visti-capture/{id}', [TourPlanController::class, 'SalesmanphotoUpdate']);
Route::delete('salesman-visti-capture/{id}', [TourPlanController::class, 'Salesmandestroy']);

//attendance 
Route::post('/office-attendance', [OfficeAttendanceController::class, 'store']);
Route::put('/office-attendance/{id}', [OfficeAttendanceController::class, 'update']);
Route::delete('/office-attendance/{id}', [OfficeAttendanceController::class, 'destroy']);
Route::get('/office-attendance/{id}', [OfficeAttendanceController::class, 'show']);


});
Route::post('password/email', [AuthController::class, 'forgotpassword'])
    ->name('password.email');
