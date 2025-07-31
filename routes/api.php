<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TourPlanController;
use App\Http\Controllers\Api\ExpenseController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login', [AuthController::class, 'login']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    //expenses rouets
    // Route::post('expenses/create', [ExpenseController::class, 'store']);

    

});
Route::post('tourplans', [TourPlanController::class, 'store']);
Route::post('expenses/create', [ExpenseController::class, 'store']);
Route::put('expenses/update/{id}', [ExpenseController::class, 'update']);
Route::get('expenses/all', [ExpenseController::class, 'index']);
Route::delete('expenses/delete/{id}', [ExpenseController::class, 'destroy']);


