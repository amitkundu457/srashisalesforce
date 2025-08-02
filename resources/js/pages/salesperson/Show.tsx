// import React, { useState } from 'react';
// import { PageProps } from '@/types';
// import { BreadcrumbItem } from '@/types';
// import AppLayout from '@/layouts/app-layout';

// type Visit = {
//   id: number;
//   name: string;
//   visit_date: string;
//   type: string;
//   visit_purpose: string;
// };

// type User = {
//   name: string;
//   email: string;
//   tours: Tour[];
//   attendance_sessions: AttendanceSession[];
// };

// type Tour = {
//   id: number;
//   tour_plan_option: string;
//   status: string;
//   start_date: string;
//   end_date: string;
//   expenses: Expense[];
//   visits: Visit[];
// };

// type Expense = {
//   id: number;
//   type: string;
//   amount: number | null;
//   status: string;
//   date: string;
//   description: string | null;
// };

// type AttendanceSession = {
//   id: number;
//   clock_in: string;
//   clock_out: string;
//   breaks: BreakItem[];
// };

// type BreakItem = {
//   id: number;
//   break_type: string;
//   break_start: string;
//   break_end: string;
// };

// type Salesperson = {
//   user: User;
//   department_name: string;
//   designation_name: string;
//   employee_id: string;
//   phone: string;
//   join_date: string;
//   shift_start_time?: string;
//   shift_end_time?: string;
// };

// const breadcrumbs: BreadcrumbItem[] = [{ title: 'Sales Persons List', href: '/salesperson' }];

// type Props = PageProps<{
//   salesperson: Salesperson;
// }>;

// export default function Show({ auth, salesperson }: Props) {
//   const {
//     user,
//     department_name,
//     designation_name,
//     employee_id,
//     shift_start_time,
//     shift_end_time,
//     phone,
//     join_date
//   } = salesperson;

//   console.log("Salesperson Data:", salesperson);

//   const [expandedTourId, setExpandedTourId] = useState<number | null>(null);

//   const toggleExpenses = (tourId: number) => {
//     setExpandedTourId(expandedTourId === tourId ? null : tourId);
//   };

//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//       <div className="p-6 space-y-6">
//         <h1 className="text-2xl font-bold">Salesperson Details</h1>

//         {/* Personal Info */}
//         <section>
//           <h2 className="text-xl font-semibold">Personal Info</h2>
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {phone}</p>
//           <p><strong>Department:</strong> {department_name}</p>
//           <p><strong>Designation:</strong> {designation_name}</p>
//           <p><strong>Employee ID:</strong> {employee_id}</p>
//           <p><strong>Join Date:</strong> {join_date}</p>
//         </section>

//         {/* Tours Table */}
//         <section>
//           <h2 className="text-xl font-semibold">Tours</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full border bg-white shadow text-sm">
//               <thead>
//                 <tr className="bg-blue-950 text-white">
//                 <th className="border p-2">Start</th>
//                 <th className="border p-2">End</th>
//                   {/* <th className="border p-2">Plan</th> */}
//                   <th className="border p-2">Status</th>
//                   {/* <th className="border p-2">Start</th>
//                   <th className="border p-2">End</th> */}
//                   <th className="border p-2">Visits</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {user.tours.map((tour) => (
//                   <React.Fragment key={tour.id}>
//                     <tr className="hover:bg-gray-100">
//                     <td className="border p-2 text-center">{tour.start_date}</td>
//                     <td className="border p-2 text-center">{tour.end_date}</td>
//                       {/* <td className="border p-2 text-center">{tour.tour_plan_option}</td> */}
//                       <td className="border p-2 text-center">{tour.status}</td>

//                       <td className="border p-2">
//                         {tour.visits.length > 0 ? (
//                           <ul className="list-disc list-inside text-left">
//                             {tour.visits.map((visit) => (
//                               <li key={visit.id}>
//                                 <div><strong>Name:</strong> {visit.name}</div>
//                                 <div><strong>Type:</strong> {visit.type}</div>
//                                 <div><strong>Date:</strong> {visit.visit_date}</div>
//                                 <div><strong>Purpose:</strong> {visit.visit_purpose}</div>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <span className="text-gray-500">—</span>
//                         )}
//                       </td>
//                       <td className="border p-2 text-center">
//                         <button
//                           onClick={() => toggleExpenses(tour.id)}
//                           className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
//                         >
//                           {expandedTourId === tour.id ? 'Hide Expenses' : 'Show Expenses'}
//                         </button>
//                       </td>
//                     </tr>

//                     {/* Expenses Table */}
//                     {expandedTourId === tour.id && (
//                       <tr>
//                         <td colSpan={6}>
//                           <div className="mt-2 p-2">
//                             {tour.expenses.length > 0 ? (
//                               <table className="w-full border mt-2 bg-gray-50 text-sm">
//                                 <thead>
//                                   <tr className="bg-gray-200 text-gray-800">
//                                     <th className="border p-2">Expense type</th>
//                                     <th className="border p-2">Type</th>
//                                     <th className="border p-2">Amount</th>
//                                     <th className="border p-2">Status</th>
//                                     <th className="border p-2">Date</th>
//                                     <th className="border p-2">Remarks</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {tour.expenses.map((exp) => (
//                                     <tr key={exp.id} className="hover:bg-gray-100">
//                                          <td className="border p-2 text-center">{exp.expensetype ?? '-'}</td>
//                                       <td className="border p-2 text-center">{exp.type}</td>
//                                       <td className="border p-2 text-center">₹{exp.amount ?? '-'}</td>
//                                       <td className="border p-2 text-center">{exp.expense_status}</td>
//                                       <td className="border p-2 text-center">{new Date(exp.date).toLocaleDateString()}</td>
//                                       <td className="border p-2 text-center">{exp.remarks ?? '-'}</td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             ) : (
//                               <p className="text-sm text-gray-500 mt-2">No expenses found.</p>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Attendance */}
//         <section>
//           <h2 className="text-xl font-semibold">Attendance</h2>
//           {user.attendance_sessions.map(session => (
//             <div key={session.id} className="border p-2 mb-2 rounded bg-gray-50">
//               <p><strong>Clock In:</strong> {session.clock_in}</p>
//               <p><strong>Clock Out:</strong> {session.clock_out}</p>
//             </div>
//           ))}
//         </section>

//         {/* Breaks */}
//         <section>
//           <h2 className="text-xl font-semibold">Breaks</h2>
//           {user.attendance_sessions.flatMap(s => s.breaks).map(breakItem => (
//             <div key={breakItem.id} className="border p-2 mb-2 rounded bg-gray-50">
//               <p><strong>Type:</strong> {breakItem.break_type}</p>
//               <p><strong>Start:</strong> {breakItem.break_start}</p>
//               <p><strong>End:</strong> {breakItem.break_end}</p>
//             </div>
//           ))}
//         </section>
//       </div>
//     </AppLayout>
//   );
// }

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import React, { useState } from 'react';

import { formatDate, formatHours, formatTime, getDurationInHours } from '../../utility/dateformate';

type Visit = {
    id: number;
    name: string;
    visit_date: string;
    type: string;
    visit_purpose: string;
};

type User = {
    name: string;
    email: string;
    tours: Tour[];
    attendance_sessions: AttendanceSession[];
};

type Tour = {
    id: number;
    tour_plan_option: string;
    status: string;
    start_date: string;
    end_date: string;
    expenses: Expense[];
    visits: Visit[];
};

type Expense = {
    id: number;
    type: string;
    amount: number | null;
    expensetype: string | null;
    status: string;
    expense_status: string;
    date: string;
    remarks: string | null;
    description: string | null;
};

type AttendanceSession = {
    id: number;
    clock_in: string;
    clock_out: string;
    breaks: BreakItem[];
};

type BreakItem = {
    id: number;
    break_type: string;
    break_start: string;
    break_end: string;
};

type Salesperson = {
    user: User;
    department_name: string;
    designation_name: string;
    employee_id: string;
    phone: string;
    join_date: string;
    shift_start_time?: string;
    shift_end_time?: string;
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Sales Persons List', href: '/salesperson' }];

type Props = PageProps<{
    salesperson: Salesperson;
}>;

export default function Show({ auth, salesperson }: Props) {
    const { user, department_name, designation_name, employee_id, shift_start_time, shift_end_time, phone, join_date } = salesperson;
    console.log('salesperson', salesperson);
    const [expandedTourId, setExpandedTourId] = useState<number | null>(null);
    const [expenseType, setExpenseType] = useState<'conveyance' | 'non_conveyance' | null>(null);

    const toggleExpenseView = (tourId: number, type: 'conveyance' | 'non_conveyance') => {
        if (expandedTourId === tourId && expenseType === type) {
            setExpandedTourId(null);
            setExpenseType(null);
        } else {
            setExpandedTourId(tourId);
            setExpenseType(type);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Salesperson Details</h1>

                {/* Personal Info */}
                <section>
                    <h2 className="text-xl font-semibold">Personal Info</h2>
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {phone}
                    </p>
                    <p>
                        <strong>Department:</strong> {department_name}
                    </p>
                    <p>
                        <strong>Designation:</strong> {designation_name}
                    </p>
                    <p>
                        <strong>Employee ID:</strong> {employee_id}
                    </p>
                    <p>
                        <strong>Join Date:</strong> {join_date}
                    </p>
                </section>

                {/* Tours Table */}
                <section>
                    <h2 className="text-xl font-semibold">Tours</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border bg-white text-sm shadow">
                            <thead>
                                <tr className="bg-blue-950 text-white">
                                    <th className="border p-2">Start</th>
                                    <th className="border p-2">End</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Visits</th>
                                    <th className="border p-2">Expenses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.tours.map((tour) => {
                                    const filteredExpenses = tour.expenses.filter((exp) => exp.expensetype === expenseType);

                                    return (
                                        <React.Fragment key={tour.id}>
                                            <tr className="hover:bg-gray-100">
                                                <td className="border p-2 text-center">{tour.start_date}</td>
                                                <td className="border p-2 text-center">{tour.end_date}</td>
                                                <td className="border p-2 text-center">{tour.status}</td>
                                                <td className="border p-2">
                                                    {tour.visits.length > 0 ? (
                                                        <ul className="list-inside list-disc text-left">
                                                            {tour.visits.map((visit) => (
                                                                <li key={visit.id}>
                                                                    <div>
                                                                        <strong>Name:</strong> {visit.name}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Type:</strong> {visit.type}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Date:</strong> {visit.visit_date}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Purpose:</strong> {visit.visit_purpose}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-gray-500">—</span>
                                                    )}
                                                </td>
                                                <td className="space-x-2 border p-2 text-center">
                                                    <button
                                                        onClick={() => toggleExpenseView(tour.id, 'conveyance')}
                                                        className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                                                    >
                                                        Conveyance
                                                    </button>
                                                    <button
                                                        onClick={() => toggleExpenseView(tour.id, 'non_conveyance')}
                                                        className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                                                    >
                                                        Non-Conveyance
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Expenses Table */}
                                            {/* {expandedTourId === tour.id && (
                        <tr>
                          <td colSpan={6}>
                            <div className="mt-2 p-2">
                              {filteredExpenses.length > 0 ? (
                                <table className="w-full border mt-2 bg-gray-50 text-sm">
                                  <thead>
                                    <tr className="bg-gray-200 text-gray-800">
                                      <th className="border p-2">Expense Type</th>
                                      <th className="border p-2">Type</th>
                                      <th className="border p-2">Amount</th>
                                      <th className="border p-2">Status</th>
                                      <th className="border p-2">Date</th>
                                      <th className="border p-2">Remarks</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredExpenses.map((exp) => (
                                      <tr key={exp.id} className="hover:bg-gray-100">
                                        <td className="border p-2 text-center">{exp.expensetype ?? '-'}</td>
                                        <td className="border p-2 text-center">{exp.type}</td>
                                        <td className="border p-2 text-center">₹{exp.amount ?? '-'}</td>
                                        <td className="border p-2 text-center">{exp.expense_status}</td>
                                        <td className="border p-2 text-center">{new Date(exp.date).toLocaleDateString()}</td>
                                        <td className="border p-2 text-center">{exp.remarks ?? '-'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p className="text-sm text-gray-500 mt-2">No {expenseType?.replace('_', ' ')} expenses found.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )} */}
                                            {expandedTourId === tour.id && (
                                                <tr>
                                                    <td colSpan={6}>
                                                        <div className="mt-2 p-2">
                                                            {expenseType === 'conveyance' ? (
                                                                <>
                                                                    {filteredExpenses.length > 0 ? (
                                                                        <table className="mt-2 w-full border bg-gray-50 text-sm">
                                                                            <thead>
                                                                                <tr className="bg-blue-100 text-gray-900">
                                                                                    <th className="border p-2">Type</th>
                                                                                    <th className="border p-2">Fare</th>
                                                                                    <th className="border p-2">Mode of Travel</th>
                                                                                    <th className="border p-2">Departure Time</th>
                                                                                    <th className="border p-2">Departure Town</th>
                                                                                    <th className="border p-2">Arrival Time</th>
                                                                                    <th className="border p-2">Arrival Town</th>
                                                                                    <th className="border p-2">Status</th>
                                                                                    <th className="border p-2">Date</th>
                                                                                    {/* <th className="border p-2">Remarks</th> */}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {filteredExpenses.map((exp) => (
                                                                                    <tr key={exp.id} className="hover:bg-gray-100">
                                                                                        <td className="border p-2 text-center">{exp.type}</td>
                                                                                        <td className="border p-2 text-center">₹{exp.fare ?? '-'}</td>
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.mode_of_travel ?? '-'}
                                                                                        </td>{' '}
                                                                                        {/* mode_of_travel */}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.departure_time ?? '-'}
                                                                                        </td>{' '}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.departure_town ?? '-'}
                                                                                        </td>{' '}
                                                                                        {/* using remarks for departure_time */}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.arrival_time ?? '-'}
                                                                                        </td>{' '}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.arrival_town ?? '-'}
                                                                                        </td>{' '}
                                                                                        {/* using description for arrival_time */}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.expense_status}
                                                                                        </td>
                                                                                        <td className="border p-2 text-center">
                                                                                            {new Date(exp.date).toLocaleDateString()}
                                                                                        </td>
                                                                                        {/* <td className="border p-2 text-center">
                                                                                            {exp.remarks ?? '-'}
                                                                                        </td> */}
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    ) : (
                                                                        <p className="mt-2 text-sm text-gray-500">No conveyance expenses found.</p>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {filteredExpenses.length > 0 ? (
                                                                        <table className="mt-2 w-full border bg-gray-50 text-sm">
                                                                            <thead>
                                                                                <tr className="bg-green-100 text-gray-900">
                                                                                    <th className="border p-2">Type</th>
                                                                                    <th className="border p-2">Amount</th>
                                                                                    <th className="border p-2">Other Amount</th>
                                                                                    <th className="border p-2">DA Type</th>
                                                                                    <th className="border p-2">Location</th>
                                                                                    <th className="border p-2">Status</th>
                                                                                    <th className="border p-2">Date</th>
                                                                                    <th className="border p-2">Remarks</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {filteredExpenses.map((exp) => (
                                                                                    <tr key={exp.id} className="hover:bg-gray-100">
                                                                                        <td className="border p-2 text-center">{exp.type}</td>
                                                                                        <td className="border p-2 text-center">
                                                                                            ₹{exp.non_conveyance_amount ?? '-'}
                                                                                        </td>
                                                                                        <td className="border p-2 text-center">
                                                                                            ₹{exp.other_amount ?? '-'}
                                                                                        </td>{' '}
                                                                                        {/* other_amount */}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.da_type ?? '-'}
                                                                                        </td>{' '}
                                                                                        {/* da_type */}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.location ?? '-'}
                                                                                        </td>{' '}
                                                                                        {/* location */}
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.expense_status}
                                                                                        </td>
                                                                                        <td className="border p-2 text-center">
                                                                                            {new Date(exp.date).toLocaleDateString()}
                                                                                        </td>
                                                                                        <td className="border p-2 text-center">
                                                                                            {exp.remarks ?? '-'}
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    ) : (
                                                                        <p className="mt-2 text-sm text-gray-500">
                                                                            No non-conveyance expenses found.
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Attendance */}
                {/* <section>
                    <h2 className="text-xl font-semibold">Attendance</h2>
                    {user.attendance_sessions.map((session) => (
                        <div key={session.id} className="mb-2 rounded border bg-gray-50 p-2">
                            <p>
                                <strong>Clock In:</strong> {session.clock_in}
                            </p>
                            <p>
                                <strong>Clock Out:</strong> {session.clock_out}
                            </p>
                        </div>
                    ))}
                </section> */}

                {/* Breaks */}
                {/* <section> */}
                {/* <h2 className="text-xl font-semibold">Breaks</h2>
                    {user.attendance_sessions
                        .flatMap((s) => s.breaks)
                        .map((breakItem) => (
                            <div key={breakItem.id} className="mb-2 rounded border bg-gray-50 p-2">
                                <p>
                                    <strong>Type:</strong> {breakItem.break_type}
                                </p>
                                <p>
                                    <strong>Start:</strong> {breakItem.break_start}
                                </p>
                                <p>
                                    <strong>End:</strong> {breakItem.break_end}
                                </p>
                            </div>
                        ))} */}
                {/* </section> */}
                <section>
                    <h2 className="mb-4 text-xl font-semibold">🗓️ Attendance</h2>

                    {user.attendance_sessions.length === 0 ? (
                        <p className="text-sm text-gray-500">No attendance records found.</p>
                    ) : (
                        user.attendance_sessions.map((session) => {
                            console.log('session', session);
                            const totalHours = getDurationInHours(session.clock_in, session.clock_out);
                            const totalBreakHours = session.breaks.reduce((acc, b) => acc + getDurationInHours(b.break_start, b.break_end), 0);
                            const netHours = totalHours - totalBreakHours;

                            let status = 'Present';
                            let statusColor = 'bg-green-100 text-green-800';

                            // Compare with shift_start_time if provided
                            const shiftStart = shift_start_time ? new Date(`${session.clock_in.split('T')[0]}T${shift_start_time}`) : null;
                            const actualClockIn = new Date(session.clock_in);

                            if (shiftStart && actualClockIn > shiftStart) {
                                status = 'Late';
                                statusColor = 'bg-yellow-100 text-yellow-800';
                            }

                            return (
                                <div key={session.id} className="mb-4 rounded border bg-gray-50 p-4 shadow">
                                    <div className="mb-2 text-sm text-gray-600">
                                        📅 <strong>Date:</strong> {formatDate(session.clock_in)}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                                        <div>
                                            🕒 <strong>Clock In:</strong> {formatTime(session.clock_in)}
                                        </div>
                                        <div>
                                            🕔 <strong>Clock Out:</strong> {formatTime(session.clock_out)}
                                        </div>
                                        <div>
                                            📍 <strong>Location:</strong>{' '}
                                            <a
                                                className="text-blue-600 underline"
                                                href={`https://www.google.com/maps/search/?api=1&query=${session.clock_in_lat},${session.clock_in_lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View on Map
                                            </a>
                                        </div>
                                        
                                        <div>
                                            ✅ <strong>Status:</strong>{' '}
                                            <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${statusColor}`}>{status}</span>
                                        </div>
                                        <div>
                                            🕓 <strong>Total Hours:</strong> {formatHours(netHours)}
                                        </div>
                                    </div>

                                    {session.breaks.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="mb-2 text-sm font-semibold">🛑 Breaks:</h3>
                                            <ul className="space-y-1 text-sm">
                                                {session.breaks.map((b) => (
                                                    <li key={b.id} className="rounded border bg-white p-2">
                                                        <strong>{b.break_type}</strong> | ⏳ {formatTime(b.break_start)} → {formatTime(b.break_end)} |
                                                        ⏱️ {formatHours(getDurationInHours(b.break_start, b.break_end))}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
