<?php

// app/Http/Controllers/ExpenseController.php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\TourPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::with('salesPerson','images', 'tourPlan')->latest()->get();
        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Expenses/Create', [
            'tourPlans' => TourPlan::all(),
            'salesPersons' => User::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sales_person_id' => 'required',
            'tour_plan_id' => 'required',
            'type' => 'required|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'status' => 'required|in:paid,unpaid',
        ]);

        Expense::create($request->all());

        return redirect()->route('expenses.index')->with('success', 'Expense created.');
    }

    public function edit(Expense $expense)
    {
        return Inertia::render('Expenses/Edit', [
            'expense' => $expense,
            'tourPlans' => TourPlan::all(),
            'salesPersons' => User::all(),
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'sales_person_id' => 'required',
            'tour_plan_id' => 'required',
            'type' => 'required|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'status' => 'required|in:paid,unpaid',
        ]);

        $expense->update($request->all());

        return redirect()->route('expenses.index')->with('success', 'Expense updated.');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
        return redirect()->route('expenses.index')->with('success', 'Expense deleted.');
    }

    //new add here 
    public function updateStatus(Request $request, Expense $expense)
{
    $request->validate([
        'expense_status' => 'required|in:pending,confirmed,cancelled',
    ]);

    $expense->expense_status = $request->expense_status;
    $expense->save();

    return back()->with('success', 'Expense status updated.');
}

}
