<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SalePerson;

use Illuminate\Support\Facades\Hash;

class SalePersonController extends Controller
{
    //


    // public function index()
    // {
    //     $salespersons = SalePerson::with('user','Tours','attendanceSessions')->get();
    //     return response()->json([
    //         'message' => 'Salespersons fetched successfully',
    //         'data' => $salespersons
    //     ]);
    // }
    
    public function index()
    {
        $salespersons = SalePerson::with('user','user.Tours','user.Tours.expenses','user.attendanceSessions','user.attendanceSessions.breaks')
        ->orderBy('created_at', 'desc') // or any other field you want to order by
        ->get();
        return response()->json([
            'message' => 'Salespersons fetched successfully',
            'data' => $salespersons
        ]);
    }


    // ✅ Create new Salesperson
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
            'phone' => 'nullable|string',
            'join_date' => 'nullable|date',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

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

        return response()->json([
            'message' => 'Salesperson created successfully',
            'data' => $salePerson->load('user')
        ], 201);
    }

    // ✅ Update Salesperson
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

        return response()->json([
            'message' => 'Salesperson updated successfully',
            'data' => $salePerson->load('user')
        ]);
    }

    // ✅ Delete Salesperson
    public function destroy($id)
    {
        $salePerson = SalePerson::findOrFail($id);
        $salePerson->user()->delete(); // cascade deletes SalePerson via relationship

        return response()->json([
            'message' => 'Salesperson deleted successfully'
        ]);
    }

    // ✅ Show single Salesperson
    public function show($id)
    {
        $salePerson = SalePerson::with('user')->findOrFail($id);
        return response()->json([
            'message' => 'Salesperson fetched successfully',
            'data' => $salePerson
        ]);
    }
}
