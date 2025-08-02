


// ✅ AttendanceHoverPopup.tsx
import React, { useState } from 'react';

interface AttendanceData {
  date: string;
  clock_in: string;
  clock_out?: string | null;
  lat?: number | null;
  lng?: number | null;
}

interface AttendanceHoverPopupProps {
  attendance: AttendanceData | null;
}

const AttendanceHoverPopup: React.FC<AttendanceHoverPopupProps> = ({ attendance }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTotalHours = (inTime?: string | null, outTime?: string | null): number | null => {
    if (!inTime || !outTime) return null;
    const inDate = new Date(inTime);
    const outDate = new Date(outTime);
    const diffMs = outDate.getTime() - inDate.getTime();
    return Math.round(diffMs / (1000 * 60 * 60));
  };

  const totalHours = getTotalHours(attendance?.clock_in, attendance?.clock_out);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* {attendance?.clock_in
        ? new Date(attendance.clock_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Absent'} */}
        {attendance?.clock_in ? (
  <>
    🕒 {new Date(attendance.clock_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    {attendance?.clock_out && (
      <>
        {' '}–🕔 {new Date(attendance.clock_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </>
    )}/
  </>
) :'Absent'}

      {isHovered && attendance && (
        <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border bg-white p-4 shadow-lg">
          <p>📅 <strong>Date:</strong> {new Date(attendance.date).toLocaleDateString()}</p>
          <p>🕒 <strong>Clock In:</strong> {new Date(attendance.clock_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p>🕔 <strong>Clock Out:</strong> {attendance.clock_out ? new Date(attendance.clock_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
          <p>📍 <strong>Location:</strong>{' '}
            {attendance.lat && attendance.lng ? (
              <a
                href={`https://www.google.com/maps?q=${attendance.lat},${attendance.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View on Map
              </a>
            ) : 'N/A'}
          </p>
          <p>✅ <strong>Status:</strong> Present</p>
          <p>🕓 <strong>Total Hours:</strong> {totalHours ?? 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceHoverPopup;
