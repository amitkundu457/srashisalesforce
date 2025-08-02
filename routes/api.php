<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TourPlanController;
use App\Http\Controllers\Api\ExpenseController; 
use App\Http\Controllers\Api\OfficeAttendanceController;
use App\Http\Controllers\Api\AttendanceSessionController;
use App\Http\Controllers\Api\AttendanceBreakController;  
use App\Http\Controllers\Api\SalePersonController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login', [AuthController::class, 'login']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    //expenses rouets
    // Route::post('expenses/create', [ExpenseController::class, 'store']);

    
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

// // Attendance session routes
// Route::post('/attendance/clock-in', [AttendanceSessionController::class, 'clockIn']);
// Route::post('/attendance/clock-out', [AttendanceSessionController::class, 'clockOut']);

// Attendance break routes
// Route::post('/attendance/break/start', [AttendanceBreakController::class, 'start']);
// Route::post('/attendance/break/end', [AttendanceBreakController::class, 'end']);


});
Route::post('tourplans', [TourPlanController::class, 'store']);
Route::post('expenses/create', [ExpenseController::class, 'store']);
Route::put('expenses/update/{id}', [ExpenseController::class, 'update']);
Route::get('expenses/all', [ExpenseController::class, 'index']);
Route::delete('expenses/delete/{id}', [ExpenseController::class, 'destroy']);


Route::post('password/email', [AuthController::class, 'forgotpassword'])
    ->name('password.email');
// Attendance session routes
Route::post('/attendance/clock-in', [AttendanceSessionController::class, 'clockIn']);
Route::post('/attendance/clock-out', [AttendanceSessionController::class, 'clockOut']);
Route::post('/attendance/break/start', [AttendanceBreakController::class, 'start']);
Route::post('/attendance/break/end', [AttendanceBreakController::class, 'end']);
Route::get('/attendance/sessions', [AttendanceSessionController::class, 'getSessions']);


//sales person create routes form api
Route::prefix('salespersons')->group(function () {
    Route::get('/', [SalePersonController::class, 'index']);           // GET all
    Route::post('/', [SalePersonController::class, 'store']);          // POST create
    Route::get('/{id}', [SalePersonController::class, 'show']);        // GET single
    Route::put('/{id}', [SalePersonController::class, 'update']);      // PUT update
    Route::delete('/{id}', [SalePersonController::class, 'destroy']);  // DELETE
});

