<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\TourPlan;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\ExpenseImage;

use Illuminate\Support\Facades\Storage;

class ExpenseController extends Controller
{
    // GET /api/expenses
    public function index()
    {
        $expenses = Expense::with('salesPerson','images', 'tourPlan')->latest()->get();
        return response()->json([
            'status' => true,
            'data' => $expenses,
        ]);
    }

    // GET /api/expenses/create (optional - usually handled by frontend)
    public function create()
    {
        return response()->json([
            'status' => true,
            'tourPlans' => TourPlan::all(),
            'salesPersons' => User::all(),
        ]);
    }

    

    public function store(Request $request)
{
    $validated = $request->validate([
        'sales_person_id' => 'required|exists:users,id',
        'tour_plan_id' => 'required|exists:tour_plans,id',
        'type' => 'nullable|string',
        'expensetype' => 'required|in:conveyance,non_conveyance',
        'date' => 'required|date',
        'expense_status' => 'in:pending,confirmed,cancelled',
        'remarks' => 'nullable|string',
        'description' => 'nullable|string',
        'amount'=>'0',

        // Optional: for image uploads
        'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
    ]);

    // Merge conditional fields based on type
    if ($request->expensetype === 'conveyance') {
        $validated += $request->validate([
            'departure_town' => 'required|string',
            'arrival_town' => 'required|string',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date',
            'mode_of_travel' => 'required|string',
            'fare' => 'required|numeric',
        ]);
    } elseif ($request->expensetype === 'non_conveyance') {
        $validated += $request->validate([
            'location' => 'required|string',
            'hotel_amount' => 'nullable|numeric',
            'da_type' => 'nullable|string',
            'other_amount' => 'nullable|numeric',
            'non_conveyance_amount' => 'required|numeric',
        ]);
    }

    // Create the expense record
    $expense = Expense::create($validated);

    // Handle multiple image uploads if provided
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('expense_images', 'public');

            ExpenseImage::create([
                'expense_id' => $expense->id,
                'image_path' => $path,
            ]);
        }
    }

    return response()->json([
        'status' => true,
        'message' => 'Expense created successfully.',
        'data' => $expense->load('images'),
    ]);
}

    // GET /api/expenses/{id}/edit
    public function edit(Expense $expense)
    {
        return response()->json([
            'status' => true,
            'expense' => $expense,
            'tourPlans' => TourPlan::all(),
            'salesPersons' => User::all(),
        ]);
    }

    public function update(Request $request, $id)
{
    $validated = $request->validate([
        'type' => 'required|string',
        'amount' => 'required|numeric',
        'date' => 'required|date',
        'description' => 'nullable|string',
        'status' => 'required|in:paid,unpaid',
    ]);

    $expense = Expense::findOrFail($id); // 🔥 Lookup by ID
    $expense->update($validated);

    return response()->json([
        'status' => true,
        'message' => 'Expense updated successfully.',
        'data' => $expense,
    ]);
}

    // DELETE /api/expenses/{id}
    public function destroy($id)
    {
        $expense = Expense::findOrFail($id); // 🔍 Find by ID
        $expense->delete(); // 🗑️ Delete the record
    
        return response()->json([
            'status' => true,
            'message' => 'Expense deleted successfully.',
        ]);
    }
    
}
