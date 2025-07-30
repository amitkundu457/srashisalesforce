<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OfficeAttendance;
use Illuminate\Http\Request;

class OfficeAttendanceController extends Controller
{
    // Create attendance
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'clock_in' => 'nullable|date_format:Y-m-d H:i:s',
            'clock_out' => 'nullable|date_format:Y-m-d H:i:s',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
        ]);

        $attendance = OfficeAttendance::create($validated);

        return response()->json(['success' => true, 'data' => $attendance], 201);
    }

    // Update attendance
    public function update(Request $request, $id)
    {
        $attendance = OfficeAttendance::findOrFail($id);

        $validated = $request->validate([
            'clock_in' => 'nullable|date_format:Y-m-d H:i:s',
            'clock_out' => 'nullable|date_format:Y-m-d H:i:s',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
        ]);

        $attendance->update($validated);

        return response()->json(['success' => true, 'data' => $attendance]);
    }

    // Delete attendance
    public function destroy($id)
    {
        $attendance = OfficeAttendance::findOrFail($id);
        $attendance->delete();

        return response()->json(['success' => true, 'message' => 'Attendance deleted']);
    }

    // Show attendance (optional)
    public function show($id)
    {
        $attendance = OfficeAttendance::findOrFail($id);
        return response()->json(['success' => true, 'data' => $attendance]);
    }
}
