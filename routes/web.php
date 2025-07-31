<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\TourPlanController;
use App\Http\Controllers\ExpenseController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('home');

 /// rolepermission route
  Route::get('settings/roles', [RolePermissionController::class, 'index'])->name('roles.index');
    Route::get('settings/roles/create', [RolePermissionController::class, 'create'])->name('roles.create');
    Route::post('/roles', [RolePermissionController::class, 'store'])->name('roles.store');
    Route::get('/roles/{role}/edit', [RolePermissionController::class, 'edit'])->name('roles.edit');
    Route::put('/roles/{role}', [RolePermissionController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RolePermissionController::class, 'destroy'])->name('roles.destroy');


    //expense route
    Route::resource('expenses', ExpenseController::class);
    Route::get('/tour-plans/{id}/expenses', [TourPlanController::class, 'expenses'])->name('tour-plans.expenses');

    //lead type route
    Route::get('/leadtype', [MasterController::class, 'leadtype'])->name('leadtype.index');
    Route::post('/leadtype', [MasterController::class, 'store'])->name('leadtype.store');

    Route::put('/leadtype/{id}', [MasterController::class, 'update'])->name('leadtype.update');
    Route::delete('/leadtype/{id}', [MasterController::class, 'destroy'])->name('leadtype.destroy');

//toures fetch routes
Route::get('/tour-plans', [TourPlanController::class, 'index']);
// routes/web.php
Route::post('/expenses/{expense}/status', [ExpenseController::class, 'updateStatus']);

// Route::get('/tour-plans/{status?}', [TourPlanController::class, 'TourStatus'])->name('tour-plans.index');
// Route::get('/tour-plans/{status?}', [TourPlanController::class, 'TourStatus']);
Route::put('/tour-plans/{id}/status', [TourPlanController::class, 'updateStatus'])->name('tour-plans.updateStatus');

Route::get('/tour-plans/{status?}', [TourPlanController::class, 'TourStatus'])->name('tour-plans.status');

//lead source route
    Route::get('/leadsource', [MasterController::class, 'leadsource'])->name('leadsource.index');
    Route::post('/leadsource', [MasterController::class, 'leadsourcestore'])->name('leadsource.store');

    Route::put('/leadsource/{id}', [MasterController::class, 'leadsourceupdate'])->name('leadsource.update');
    Route::delete('/leadsource/{id}', [MasterController::class, 'leadsourcedestroy'])->name('leadsource.destroy');

    //business route
    Route::get('/business', [MasterController::class, 'busniessindex']);
    Route::post('/business', [MasterController::class, 'busniessstore']);
    Route::put('/business/{business}', [MasterController::class, 'update']);
    Route::delete('/business/{business}', [MasterController::class, 'destroy']);
   

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
