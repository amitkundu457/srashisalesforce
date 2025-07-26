<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TourPlan;
use Inertia\Inertia;
class TourPlanController extends Controller
{
    //

    public function index()
{
    $tourPlans = TourPlan::with('visits')->orderBy('created_at', 'desc')->get();

    return Inertia::render('tourplans/index', [
        'tourPlans' => $tourPlans,
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

}
