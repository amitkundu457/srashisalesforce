// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head, router } from '@inertiajs/react';
// import React, { useEffect, useRef, useState } from 'react';
// import { LuView } from "react-icons/lu";
// import { MdOutlineRemoveRedEye } from "react-icons/md"

// type Visit = {
//     id: number;
//     tour_plan_id: number;
//     type: string;
//     visit_date: string;
//     name: string;
//     visit_purpose: string | null;
//     dept_name: string | null;
// };

// type TourPlan = {
//     id: number;
//     user_id: number;
//     status: 'pending' | 'confirmed' | 'cancelled';
//     start_date: string;
//     end_date: string;
//     tour_plan_option: string;
//     created_at: string;
//     visits?: Visit[];
//     user?: {
//         name: string;
//     };
// };

// interface PaginationLinks {
//     url: string | null;
//     label: string;
//     active: boolean;
// }

// interface Props {
//     tourPlans: {
//         data: TourPlan[];
//         current_page: number;
//         last_page: number;
//         links: PaginationLinks[];
//     };
//     filters: {
//         search?: string;
//         status?: string;
//     };
// }

// const breadcrumbs: BreadcrumbItem[] = [
//     { title: 'Tour Plan', href: '/tour-plans' },
// ];

// const Index: React.FC<Props> = ({ tourPlans, filters }) => {
//     const [search, setSearch] = useState(filters.search || '');
//     const [statusFilter, setStatusFilter] = useState(filters.status || '');
//     const previousSearchRef = useRef<string>(search);
// console.log("tourPlans", tourPlans);
//     // ✅ Debounced Search Logic (500ms)
//     useEffect(() => {
//         const delayDebounce = setTimeout(() => {
//             const trimmedSearch = search.trim();
//             if (previousSearchRef.current !== trimmedSearch) {
//                 router.get(
//                     '/tour-plans',
//                     { search: trimmedSearch, status: statusFilter },
//                     { preserveScroll: true, replace: true }
//                 );
//                 previousSearchRef.current = trimmedSearch;
//             }
//         }, 500);

//         return () => clearTimeout(delayDebounce);
//     }, [search]);

//     // ✅ Status Filter Change (Immediate)
//     const handleStatusFilterChange = (newStatus: string) => {
//         setStatusFilter(newStatus);
//         router.get(
//             '/tour-plans',
//             { search, status: newStatus },
//             { preserveScroll: true, replace: true }
//         );
//     };

//     const handleStatusChange = (id: number, status: string) => {
//         router.put(`/tour-plans/${id}/status`, { status }, { preserveScroll: true });
//     };

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Tour Plans" />
//             <div className="min-h-[100vh] bg-gray-200 p-6">
//                 <h1 className="mb-4 text-2xl font-bold">Tour Plans</h1>

//                 {/* 🔍 Search + Filter Controls */}
//                 <div className="mb-4 flex flex-wrap items-center gap-4">
//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         placeholder="Search by Sales Name"
//                         className="w-full max-w-sm rounded border border-blue-950 px-3 py-2 shadow-sm"
//                     />

//                     <select
//                         value={statusFilter}
//                         onChange={(e) => handleStatusFilterChange(e.target.value)}
//                         className="rounded border border-blue-950 px-3 py-2"
//                     >
//                         <option value="">All Statuses</option>
//                         <option value="pending">Pending</option>
//                         <option value="confirmed">Approved</option>
//                         <option value="cancelled">Rejected</option>
//                     </select>
//                 </div>

//                 {/* 📋 Table */}
//                 <table className="w-full border border-gray-300 text-sm">
//                     <thead>
//                         <tr className="bg-blue-950 text-left text-white">
//                             <th className="border p-2">S.No</th>
//                             <th className="border p-2">Sales Name</th>
//                             <th className="border p-2">Visitor Place</th>
//                             <th className="border p-2">Start Date</th>
//                             <th className="border p-2">End Date</th>
//                             <th className="border p-2">Type</th>
//                             <th className="border p-2">Visit Purpose</th>
//                             <th className="border p-2">Date</th>
//                             <th className="border p-2">Status</th>
//                             <th className="border p-2">Expenses</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tourPlans.data.map((plan, index) => {
//                             const firstVisit = plan.visits?.[0];
//                             return (
//                                 <tr key={plan.id} className="hover:bg-white">
//                                     <td className="border p-2">
//                                         {(tourPlans.current_page - 1) * 10 + index + 1}
//                                     </td>
//                                     <td className="border p-2">{plan.user?.name}</td>
//                                     <td className="border p-2">{firstVisit?.name ?? '-'}</td>
//                                     <td className="border p-2">
//                                         {new Date(plan.start_date).toLocaleDateString()}
//                                     </td>
//                                     <td className="border p-2">
//                                         {new Date(plan.end_date).toLocaleDateString()}
//                                     </td>
//                                     <td className="border p-2">{firstVisit?.type ?? '-'}</td>
//                                     <td className="border p-2">{firstVisit?.visit_purpose ?? '-'}</td>
//                                     <td className="border p-2">
//                                         {new Date(plan.created_at).toLocaleDateString()}
//                                     </td>
//                                     <td className="border p-2">
//                                         <select
//                                             className="rounded border px-2 py-1"
//                                             value={plan.status}
//                                             onChange={(e) => handleStatusChange(plan.id, e.target.value)}
//                                         >
//                                             <option value="pending">Pending</option>
//                                             <option value="confirmed">Approved</option>
//                                             <option value="cancelled">Rejected</option>
//                                         </select>
//                                     </td>
//                                     <td className="cursor-pointer  p-2 flex justify-center hover:scale-110 text-blue-600 ">
//                                         <a href={`/tour-plans/${plan.id}/expenses`}><MdOutlineRemoveRedEye className='text-blue-950 text-2xl'  /></a>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>

//                 {/* 🔄 Pagination */}
//                 <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
//                     {tourPlans.links.map((link, index) => (
//                         <button
//                             key={index}
//                             disabled={!link.url}
//                             className={`rounded px-3 py-1 items-center cursor-pointer text-sm ${
//                                 link.active
//                                     ? 'bg-blue-950 text-white'
//                                     : 'bg-white text-blue-950 hover:bg-gray-100'
//                             }`}
//                             onClick={() =>
//                                 link.url &&
//                                 router.get(link.url, { search, status: statusFilter }, { preserveScroll: true })
//                             }
//                             dangerouslySetInnerHTML={{ __html: link.label }}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </AppLayout>
//     );
// };

// export default Index;

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

type Visit = {
    id: number;
    tour_plan_id: number;
    type: string;
    visit_date: string;
    name: string;
    visit_purpose: string | null;
    dept_name: string | null;
};

type TourPlan = {
    id: number;
    user_id: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    start_date: string;
    end_date: string;
    tour_plan_option: string;
    created_at: string;
    visits?: Visit[];
    user?: {
        name: string;
    };
};

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    tourPlans: {
        data: TourPlan[];
        current_page: number;
        last_page: number;
        links: PaginationLinks[];
    };
    filters: {
        search?: string;
        status?: string;
        from?: string;
        to?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tour Plan', href: '/tour-plans' }];

const Index: React.FC<Props> = ({ tourPlans, filters }) => {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [fromDate, setFromDate] = useState(filters.from || '');
    const [toDate, setToDate] = useState(filters.to || '');
    const previousSearchRef = useRef<string>(search);

    console.log('tourPlans', tourPlans);
    // Debounced Search Input
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const trimmedSearch = search.trim();
            if (previousSearchRef.current !== trimmedSearch) {
                applyFilters(trimmedSearch, statusFilter, fromDate, toDate);
                previousSearchRef.current = trimmedSearch;
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const applyFilters = (searchVal: string, statusVal: string, from: string, to: string) => {
        router.get(
            '/tour-plans',
            {
                search: searchVal,
                status: statusVal,
                from,
                to,
            },
            {
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const handleStatusChange = (id: number, status: string) => {
        router.put(`/tour-plans/${id}/status`, { status }, { preserveScroll: true });
    };

    const handleDateChange = (from: string, to: string) => {
        setFromDate(from);
        setToDate(to);
        applyFilters(search, statusFilter, from, to);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tour Plans" />
            <div className="min-h-[100vh] bg-gray-200 p-6">
                <h1 className="mb-4 text-2xl font-bold">Tour Plans</h1>

                {/* 🔍 Filter Controls */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by Sales Name"
                            className="w-full max-w-sm rounded border border-blue-950 px-3 py-1 shadow-sm"
                        />
                    </div>

                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                applyFilters(search, e.target.value, fromDate, toDate);
                            }}
                            className="rounded border border-blue-950 px-3 py-1.5"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Approved</option>
                            <option value="cancelled">Rejected</option>
                        </select>
                    </div>

                    {/* 🗓 From Date */}
                    <div className=' flex gap-2 items-center'>
                        <p className=" text-sm">Start Date</p>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => handleDateChange(e.target.value, toDate)}
                            className="rounded border border-blue-950 px-2 py-1"
                        />
                    </div>

                    {/* 🗓 To Date */}
                    <div className=' flex gap-2 items-center'>
                    <p className=" text-xs">End Date</p>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => handleDateChange(fromDate, e.target.value)}
                            className="rounded border border-blue-950 px-2 py-1"
                        />
                    </div>
                    {/* 🔄 Reset Date Filters Button */}
                    <div>
                        <button
                            onClick={() => {
                                setFromDate('');
                                setToDate('');
                                applyFilters(search, statusFilter, '', '');
                            }}
                            className="rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:cursor-pointer hover:bg-gray-400"
                        >
                            Clear Dates
                        </button>
                    </div>
                </div>

                {/* 📋 Table */}
                <table className="w-full border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-blue-950 text-left text-white">
                            <th className="border p-2">S.No</th>
                            <th className="border p-2">Sales Person Name</th>
                            <th className="border p-2">Visitor Place</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">End Date</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Visit Purpose</th>
                            {/* <th className="border p-2">Date</th> */}
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Expenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourPlans.data.map((plan, index) => {
                            const firstVisit = plan.visits?.[0];
                            return (
                                <tr key={plan.id} className="hover:bg-white">
                                    <td className="border p-2">{(tourPlans.current_page - 1) * 10 + index + 1}</td>
                                    <td className="border p-2">{plan.user?.name}</td>
                                    <td className="border p-2">{firstVisit?.name ?? '-'}</td>
                                    <td className="border p-2">{new Date(plan.start_date).toLocaleDateString()}</td>
                                    <td className="border p-2">{new Date(plan.end_date).toLocaleDateString()}</td>
                                    <td className="border p-2">{firstVisit?.type ?? '-'}</td>
                                    <td className="border p-2">{firstVisit?.visit_purpose ?? '-'}</td>
                                    {/* <td className="border p-2">
                                        {new Date(plan.created_at).toLocaleDateString()}
                                    </td> */}
                                    <td className="border p-2">
                                        <select
                                            className="rounded border px-2 py-1"
                                            value={plan.status}
                                            onChange={(e) => handleStatusChange(plan.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Approved</option>
                                            <option value="cancelled">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="border p-2 text-center text-blue-600">
                                        <a href={`/tour-plans/${plan.id}/expenses`}>
                                            <MdOutlineRemoveRedEye className="mx-auto text-2xl text-blue-950 hover:scale-110" />
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* 🔄 Pagination */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {tourPlans.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            className={`rounded px-3 py-1 text-sm ${
                                link.active ? 'bg-blue-950 text-white' : 'bg-white text-blue-950 hover:bg-gray-100'
                            }`}
                            onClick={() =>
                                link.url &&
                                router.get(link.url, { search, status: statusFilter, from: fromDate, to: toDate }, { preserveScroll: true })
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
