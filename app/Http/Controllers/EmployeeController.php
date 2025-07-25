<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
       $employees = User::with('employee')->get();
        return Inertia::render('usermanagement.employee',compact('employees'));
    }
}
