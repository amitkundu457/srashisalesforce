<?php

namespace App\Http\Controllers\Api;

use App\Models\Lead;
use App\Models\Visit;
use App\Models\TourPlan;
use Illuminate\Http\Request;
use App\Models\SalesManVisit;
use App\Models\SaleManVisitphoto;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class TourPlanController extends Controller
{
    public function store(Request $request)
    {
        // dd(($request->all()));
        $user=JWTAuth::parseToken()->authenticate();
        // $validated = $request->validate([
        //     'user_id' => 'required',
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date|',
        //     'tour_plan_option' => 'required|string',
        //     'visits' => 'required|array',
        //     'visits.*.type' => 'required|in:,warehouse,dealer,department,transit,new_lead',
        //     'visits.*.visit_date' => 'required|date',
        //     'visits.*.name' => 'required|string',
        //     'visits.*.visit_purpose' => 'nullable|string',
        //     'visits.*.visit_name' => 'nullable|string',
        //     'visits.*.lead' => 'nullable|array',
        // ]);
        // dd($user);

        DB::beginTransaction();

        try {
            $tourPlan = TourPlan::create([
                'user_id' => $user->id,
                'start_date' => $request['start_date'],
                'end_date' => $request['end_date'],
                'tour_plan_option' => $request['tour_plan_option'],
            ]);

            foreach ($request['visits'] as $visitData) {
                $visit = $tourPlan->visits()->create([
                    'type' => $visitData['type'],
                    'visit_date' => $visitData['visit_date'],
                    'name' => $visitData['name'],
                    'visit_purpose' => $visitData['visit_purpose'] ?? null,
                    'dept_name' => $visitData['dept_name'] ?? null,
                ]);

                if ($visitData['type'] === 'new_lead' && isset($visitData['lead'])) {
                    $leadData = $visitData['lead'];

                    $visit->lead()->create([
                        'lead_type' => $leadData['lead_type'] ?? '',
                        'primary_no' => $leadData['primary_no'] ?? '',
                        'lead_source' => $leadData['lead_source'] ?? '',
                        'contact_person' => $leadData['contact_person'] ?? null,
                        'state' => $leadData['state'] ?? null,
                        'current_balance' => $leadData['current_balance'] ?? 0,
                        'products' => json_encode($leadData['products'] ?? []),
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Tour plan created successfully.',
                'data' => $tourPlan->load('visits.lead'),
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create tour plan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
   




    public function SalesManVisit(Request $request)
{
    try {
        $validated = $request->validate([
            'tour_plans_id' => 'required|exists:tour_plans,id',
            'clock_in' => 'required|date',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validation error',
            'errors' => $e->errors(),
        ], 422);
    }

    SalesManVisit::create([
        'tour_plans_id' => $validated['tour_plans_id'],
        'clock_in' => $validated['clock_in'],
        'lat' => $validated['lat'],
        'lng' => $validated['lng'],
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Salesman visit recorded successfully.',
    ], 201);
}

   // 📤 Upload (Create)
    public function Salesmanstorephoto(Request $request)
    {

        try {
        $validated = $request->validate([
            'sales_man_visit_id' => 'required|exists:tour_plans,id',
            'photo' => 'required|image|',
           
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validation error',
            'errors' => $e->errors(),
        ], 422);
    }
       

        $path = $request->file('photo')->store('sales_visit_photos', 'public');

        $photo = SaleManVisitphoto::create([
            'sales_man_visits_id' => $request->sales_man_visit_id,
            'photo_path' => $path,
        ]);

        return response()->json(['message' => 'Photo uploaded', 'data' => $photo]);
    }

    // ✏️ Update (Edit)
    public function SalesmanphotoUpdate(Request $request, $id)
    {
        $photo = SaleManVisitphoto::findOrFail($id);
        // dd($id);

        $request->validate([
            'photo' => 'required|image|max:5120',
        ]);

        // Delete old image from storage
        if (Storage::disk('public')->exists($photo->photo_path)) {
            Storage::disk('public')->delete($photo->photo_path);
        }

        // Save new photo
        $newPath = $request->file('photo')->store('sales_visit_photos', 'public');

        $photo->update([
            'photo_path' => $newPath,
        ]);

        return response()->json(['message' => 'Photo updated', 'data' => $photo]);
    }

    // 🗑 Delete
    public function Salesmandestroy($id)
    {
        $photo = SaleManVisitphoto::findOrFail($id);

        if (Storage::disk('public')->exists($photo->photo_path)) {
            Storage::disk('public')->delete($photo->photo_path);
        }

        $photo->delete();

        return response()->json(['message' => 'Photo deleted']);
    }

}
