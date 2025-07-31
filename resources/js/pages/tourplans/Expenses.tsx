
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';

interface Image {
    id: number;
    image_path: string;
}

interface Expense {
    id: number;
    type: string;
    expensetype: string | null;
    amount: string | null;
    non_conveyance_amount: string | null;
    other_amount: string | null;
    fare: string | null;
    location: string | null;
    da_type: string | null;
    remarks: string | null;
    arrival_town: string | null;
    departure_town: string | null;

    arrival_time: string | null;
    departure_time: string | null;
    mode_of_travel: string | null;
    status: string;
    expense_status: string;
    date: string;
    created_at: string;
    description: string | null;
    images: Image[];
}

interface Props {
    tourPlan: {
        id: number;
        tour_plan_option: string;
        start_date: string;
        end_date: string;
    };
    expenses: Expense[];
}

const handleStatusChange = (expenseId: number, newStatus: string) => {
    router.post(
        `/expenses/${expenseId}/status`,
        {
            expense_status: newStatus,
        },
        {
            preserveScroll: true,
        },
    );
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tour Plans', href: '/tour-plans' },
    { title: 'Expenses', href: '#' },
];

const Expenses: React.FC<Props> = ({ tourPlan, expenses }) => {
    const [filter, setFilter] = useState<'conveyance' | 'non_conveyance'>('non_conveyance');

    const filteredExpenses = expenses.filter((exp) => exp.expensetype === filter);
    console.log('expenses', expenses);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="mb-4 text-xl font-bold">Expenses for Tour Plan ({tourPlan.tour_plan_option})</h1>

                <button onClick={() => router.visit('/tour-plans')} className="mb-4 flex items-center gap-2 rounded bg-blue-950 px-4 py-1 text-white">
                    <MdOutlineArrowBack size={20} /> Back
                </button>

                {/* Filter Buttons */}
                <div className="mb-4 flex gap-4">
                    <button
                        className={`rounded px-4 py-1 text-white ${filter === 'non_conveyance' ? 'bg-green-600' : 'bg-gray-400'}`}
                        onClick={() => setFilter('non_conveyance')}
                    >
                        Non-Conveyance
                    </button>
                    <button
                        className={`rounded px-4 py-1 text-white ${filter === 'conveyance' ? 'bg-blue-600' : 'bg-gray-400'}`}
                        onClick={() => setFilter('conveyance')}
                    >
                        Conveyance
                    </button>
                </div>

                {/* Non-Conveyance Table */}
                {filter === 'non_conveyance' && (
                    <div className="overflow-x-auto">
                        <table className="w-full border bg-white text-sm shadow">
                            <thead>
                                <tr className="bg-blue-950 text-white">
                                    <th className="border p-2">Type</th>

                                    {/* <th className="p-2 border">Status</th>
                  <th className="p-2 border">Remarks</th> */}
                                    <th className="border p-2">Location</th>
                                    <th className="border p-2">Amount</th>
                                    <th className="border p-2">Other Amount</th>
                                    <th className="border p-2">DA Type</th>

                                    <th className="border p-2">Remarks</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="p-4 text-center text-gray-500">
                                            No non-conveyance expenses found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredExpenses.map((exp) => (
                                        <tr key={exp.id} className="hover:bg-gray-50">
                                            <td className="border p-2 text-center">{exp.type}</td>

                                            {/* <td className="p-2 border text-center">{exp.expense_status}</td> */}

                                            <td className="border p-2 text-center">{exp.location ?? '-'}</td>
                                            <td className="border p-2 text-center">₹{exp.non_conveyance_amount ?? '-'}</td>
                                            <td className="border p-2 text-center">₹{exp.other_amount ?? '-'}</td>
                                            <td className="border p-2 text-center">{exp.da_type ?? '-'}</td>
                                            <td className="border p-2 text-center">{exp.remarks ?? '-'}</td>
                                            <td className="border p-2 text-center">
                                                <select
                                                    value={exp.expense_status}
                                                    onChange={(e) => handleStatusChange(exp.id, e.target.value)}
                                                    className="rounded border px-2 py-1 text-sm"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Approved</option>
                                                    <option value="cancelled">Rejected</option>
                                                </select>
                                            </td>

                                            <td className="border p-2 text-center">{new Date(exp.date).toLocaleDateString()}</td>
                                            <td className="border p-2 text-center">
                                                {exp.images.length > 0 ? (
                                                    <div className="flex flex-wrap justify-center gap-2">
                                                        {exp.images.map((img) => (
                                                            <img
                                                                key={img.id}
                                                                src={`/${img.image_path}`}
                                                                alt="Expense"
                                                                className="h-12 w-12 cursor-pointer rounded object-cover transition-transform hover:scale-110"
                                                                onClick={() => window.open(`/${img.image_path}`, '_blank')}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Conveyance Table */}
                {filter === 'conveyance' && (
                    <div className="overflow-x-auto">
                        <table className="w-full border bg-white text-sm shadow">
                            <thead>
                                <tr className="bg-blue-950 text-white">
                                    {/* <th className="p-2 border">Type</th> */}
                                    {/* <th className="p-2 border">Date</th> */}
                                    <th className="border p-2">Departure Time</th>

                                    <th className="border p-2">Departure Town</th>

                                    <th className="border p-2">Arrival Time</th>
                                    <th className="border p-2">Arrival Town</th>

                                  
                                    <th className="border p-2">Fare</th>
                                    <th className="border p-2">Mode of Travel</th>
                                    {/* <th className="p-2 border">Departure Town</th>
                  <th className="p-2 border">Arrival Town</th> */}
                                    <th className="border p-2">Remarks</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="p-4 text-center text-gray-500">
                                            No conveyance expenses found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredExpenses.map((exp) => (
                                        <tr key={exp.id} className="hover:bg-gray-50">
                                            {/* <td className="p-2 border text-center">{exp.type}</td> */}
                                            {/* <td className="p-2 border text-center">{new Date(exp.date).toLocaleDateString()}</td> */}

                                            <td className="border p-2 text-center">{exp?.departure_time}</td>
                                            <td className="border p-2 text-center">{exp.departure_town ?? '-'}</td>

                                            <td className="border p-2 text-center">{exp?.arrival_time}</td>
                                            <td className="border p-2 text-center">{exp.arrival_town ?? '-'}</td>

                                            {/* <td className="p-2 border text-center">{exp.expense_status}</td> */}
                                            
                                            <td className="border p-2 text-center">₹{exp.fare ?? '-'}</td>
                                            <td className="border p-2 text-center">{exp.mode_of_travel ?? '-'}</td>
                                           
                                            <td className="border p-2 text-center">{exp.remarks ?? '-'}</td>
                                            <td className="border p-2 text-center">
                                                <select
                                                    value={exp.expense_status}
                                                    onChange={(e) => handleStatusChange(exp.id, e.target.value)}
                                                    className="rounded border px-2 py-1 text-sm"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Approved</option>
                                                    <option value="cancelled">Rejected</option>
                                                </select>
                                            </td>
                                            <td className="border p-2 text-center">
                                                {exp.images.length > 0 ? (
                                                    <div className="flex flex-wrap justify-center gap-2">
                                                        {exp.images.map((img) => (
                                                            
                                                            <img
                                                            src={`/storage/${img.image_path}`} // This will generate: /storage/expense_images/filename.jpg
                                                            alt="Image"
                                                            className="h-12 w-12 cursor-pointer rounded object-cover transition-transform hover:scale-110"
                                                            onClick={() => window.open(`/storage/${img.image_path}`, '_blank')} // Open correct public path
                                                          />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Expenses;
