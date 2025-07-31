<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TourPlan;
use Inertia\Inertia;
class TourPlanController extends Controller
{
    //




// public function index(Request $request)
// {
//     $search = $request->input('search');
//     $status = $request->input('status');

//     $tourPlans = TourPlan::with(['user','expenses', 'visits'])
//         ->when($search, fn ($q) =>
//             $q->whereHas('user', fn ($sub) =>
//                 $sub->where('name', 'like', '%' . $search . '%')
//             )
//         )
//         ->when($status, fn ($q) => $q->where('status', $status))
//         ->orderByDesc('id')
//         ->paginate(10)
//         ->withQueryString();

//     return inertia('tourplans/index', [
//         'tourPlans' => $tourPlans,
//         'filters' => [
//             'search' => $search,
//             'status' => $status,
//         ],
//     ]);
// }

public function index(Request $request)
{
    $search = $request->input('search');
    $status = $request->input('status');
    $from = $request->input('from');
    $to = $request->input('to');

    $tourPlans = TourPlan::with(['user', 'expenses', 'visits'])
        ->when($search, fn($q) =>
            $q->whereHas('user', fn($q) =>
                $q->where('name', 'like', "%{$search}%")
            )
        )
        ->when($status, fn($q) => $q->where('status', $status))
        ->when($from, fn($q) => $q->whereDate('start_date', '>=', $from))
        ->when($to, fn($q) => $q->whereDate('end_date', '<=', $to))
        ->orderByDesc('id')
        ->paginate(10)
        ->withQueryString();

    return inertia('tourplans/index', [
        'tourPlans' => $tourPlans,
        'filters' => compact('search', 'status', 'from', 'to'),
    ]);
}


public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:pending,confirmed,cancelled',
    ]);

    $tourPlan = TourPlan::findOrFail($id);
    $tourPlan->status = $request->status;
    $tourPlan->save();

    return redirect()->back()->with('success', 'Status updated successfully.');
}

//expens details page
public function expenses($id)
{
    $tourPlan = TourPlan::with('expenses','expenses.images')->findOrFail($id);
    
    return Inertia::render('tourplans/Expenses', [
        'tourPlan' => $tourPlan,
        'expenses' => $tourPlan->expenses
    ]);
}

 //tour on basic of status
 public function TourStatus($status = null)
 {
     $query = TourPlan::with(['expenses', 'visits']);
 
     // ✅ Default to 'pending' if status is not set
     $status = $status ?? 'pending';
 
     $query->where('status', $status);
 
     $tourPlans = $query->latest()->get();
 
     return Inertia::render('tourplans/status', [
         'tourPlans' => $tourPlans,
         'selectedStatus' => $status,
     ]);
 }
 
 
}
