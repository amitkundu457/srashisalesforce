<?php


namespace App\Http\Controllers\Api;
use App\Models\AttendanceSession;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class AttendanceSessionController extends Controller
{
    public function clockIn(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
        ]);

        $session = AttendanceSession::create([
            'user_id' => $request->user_id,
            'clock_in' => now(),
            'clock_in_lat' => $request->lat,
            'clock_in_lng' => $request->lng,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Clock-in recorded.',
            'data' => $session,
        ]);
    }

    public function clockOut(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
        ]);

        $session = AttendanceSession::where('user_id', $request->user_id)
            ->whereNull('clock_out')
            ->latest('clock_in')
            ->first();

        if (!$session) {
            return response()->json([
                'status' => 'error',
                'message' => 'No open session found to clock out.',
            ], 400);
        }

        $session->update([
            'clock_out' => now(),
            'clock_out_lat' => $request->lat,
            'clock_out_lng' => $request->lng,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Clock-out recorded.',
            'data' => $session,
        ]);
    }

    //get 
    public function getSessions(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
    ]);

    // Get all sessions for the user (you can limit to today or ongoing if needed)
    $sessions = AttendanceSession::with('breaks')
    ->where('user_id', $request->user_id)
        ->orderByDesc('clock_in')
        ->get();

    return response()->json([
        'status' => 'success',
        'data' => $sessions,
    ]);
}

}
