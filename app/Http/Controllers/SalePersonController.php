<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SalePerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SalePersonController extends Controller
{
    // public function index(){
    //     $salespersons = SalePerson::with('user')->get();
    //     // dd($salePeople);
    //     return Inertia::render('salesperson/create', compact('salespersons'));
    // }


    public function index()
    {
        $salespersons = SalePerson::with([
            'user.tours.expenses',
            'user.attendanceSessions.breaks'
        ])
        ->latest()
        ->get();
    
        return Inertia::render('salesperson/index', [
            'salespersons' => $salespersons
        ]);
    }
    
    public function show($id)
    {
        $salesperson = SalePerson::with([
            'user.tours.expenses',
            'user.tours.visits',
            'user.attendanceSessions.breaks'
        ])->findOrFail($id);
    
        return Inertia::render('salesperson/Show', [
            'salesperson' => $salesperson
        ]);
    }



    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'department_name' => 'nullable|string',
        'designation_name' => 'nullable|string',
        'shift_start_time' => 'nullable|string',
        'shift_end_time' => 'nullable|string',
        // 'employee_id' => 'nullable|string', // Remove this from validation
        'phone' => 'nullable|string',
        'join_date' => 'nullable|date',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Auto-generate employee_id like EMP-001
    $lastSalePerson = SalePerson::orderBy('id', 'desc')->first();
    $nextNumber = $lastSalePerson ? $lastSalePerson->id + 1 : 1;
    $employeeId = 'EMP-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

    $salePerson = SalePerson::create([
        'user_id' => $user->id,
        'department_name' => $request->department_name,
        'designation_name' => $request->designation_name,
        'shift_start_time' => $request->shift_start_time,
        'shift_end_time' => $request->shift_end_time,
        'employee_id' => $employeeId,
        'phone' => $request->phone,
        'join_date' => $request->join_date,
    ]);

    return back()->with('success', 'Salesperson created successfully')->with('data', $salePerson->load('user'));
}

    // ✅ Edit/Update
    public function update(Request $request, $id)
    {
        $salePerson = SalePerson::with('user')->findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $salePerson->user_id,
            'password' => 'nullable|min:6',
        ]);

        $salePerson->user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $salePerson->user->password,
        ]);

        $salePerson->update([
            'department_name' => $request->department_name,
            'designation_name' => $request->designation_name,
            'shift_start_time' => $request->shift_start_time,
            'shift_end_time' => $request->shift_end_time,
            'employee_id' => $request->employee_id,
            'phone' => $request->phone,
            'join_date' => $request->join_date,
        ]);

        return back()->with('success', 'Salesperson updated successfully')->with('data', $salePerson->load('user'));

    }

    // ✅ Delete
    public function destroy($id)
    {
        $salePerson = SalePerson::findOrFail($id);
        $salePerson->user()->delete(); // deletes user and cascades to sale_people

        return response()->json(['message' => 'Salesperson deleted']);
    }


    // ✅ Single
    // public function show($id)
    // {
    //     return SalePerson::with('user')->findOrFail($id);
    // }
}
