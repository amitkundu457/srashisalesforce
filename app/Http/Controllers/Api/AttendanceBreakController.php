<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AttendanceBreak;
class AttendanceBreakController extends Controller
{
    //

    public function start(Request $request)
    {
        $validated = $request->validate([
            'attendance_session_id' => 'required|exists:attendance_sessions,id',
            'break_type' => 'required|string',
        ]);

        $break = AttendanceBreak::create([
            'attendance_session_id' => $validated['attendance_session_id'],
            'break_type' => $validated['break_type'],
            'break_start' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Break started.',
            'data' => $break,
        ]);
    }

    public function end(Request $request)
    {
        $validated = $request->validate([
            'attendance_session_id' => 'required|exists:attendance_sessions,id',
        ]);

        $break = AttendanceBreak::where('attendance_session_id', $validated['attendance_session_id'])
            ->whereNull('break_end')
            ->latest('break_start')
            ->first();

        if (!$break) {
            return response()->json([
                'status' => 'error',
                'message' => 'No ongoing break found.'
            ], 400);
        }

        $break->update([
            'break_end' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Break ended.',
            'data' => $break,
        ]);
    }

}
