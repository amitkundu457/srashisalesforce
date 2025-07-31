<?php

namespace App\Http\Controllers\Api;

use App\Models\TourPlan;
use App\Models\Visit;
use App\Models\Lead;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

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
   
}
