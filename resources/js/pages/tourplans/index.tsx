// import React from 'react';
// import { Head, PageProps } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// type Visit = {
//   id: number;
//   tour_plan_id: number;
//   type: string;
//   visit_date: string;
//   name: string;
//   visit_purpose: string | null;
//   dept_name: string | null;
// };

// type TourPlan = {
//   id: number;
//   user_id: number;
//   status:string,
//   start_date: string;
//   end_date: string;
//   tour_plan_option: string;
//   created_at: string;
//   visits?: Visit[];
// };

// interface Props extends PageProps {
//   tourPlans: TourPlan[];
// }

// const breadcrumbs: BreadcrumbItem[] = [
//     {

//     title: 'Tour Plan',
//     href: '/tour-plans',
//     },
// ];

// const Index: React.FC<Props> = ({ tourPlans }) => {
//     console.log("tourplans",tourPlans);
//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//       <Head title="Tour Plans" />
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Tour Plans</h1>

//         <table className="w-full border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-2 border">S.No</th>
//               <th className="p-2 border">Visit Name</th>
//               <th className="p-2 border">Start Date</th>
//               <th className="p-2 border">End Date</th>
//               <th className="p-2 border">Tour plan</th>

//               <th className="p-2 border">Type</th>
//               <th className="p-2 border">Visit Purpose</th>

//               <th className="p-2 border">status</th>
//               <th className="p-2 border">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tourPlans.map((plan ,Index) =>{

//                    const firstVisit = plan.visits?.[0];

//                 return(
//                     <tr key={plan.id} className="hover:bg-gray-50">
//                 <td className="p-2 border">{Index+1}</td>
//                 <td className="p-2 border">{firstVisit?.name}</td>
//                 <td className="p-2 border">{plan.start_date}</td>
//                 <td className="p-2 border">{plan.end_date}</td>
//                 <td className="p-2 border">{plan.tour_plan_option}</td>

//                 <td className="p-2 border">{firstVisit?.type}</td>
//                 <td className="p-2 border">{firstVisit?.visit_purpose}</td>

//                 <td className="p-2 border">{plan?.status}</td>
//                 <td className="p-2 border">
//                   {new Date(plan.created_at).toLocaleString()}
//                 </td>
//               </tr>
//                 )
//             })}
//           </tbody>
//         </table>
//       </div>
//     </AppLayout>
//   );
// };

// export default Index;

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, PageProps, router } from '@inertiajs/react';
import React from 'react';

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
};

interface Props extends PageProps {
    tourPlans: TourPlan[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Plan',
        href: '/tour-plans',
    },
];

const Index: React.FC<Props> = ({ tourPlans }) => {
    //   const handleStatusChange = (id: number, newStatus: string) => {
    //     router.put(
    //       `/tour-plans/${id}/update-status`,
    //       { status: newStatus },
    //       {
    //         preserveScroll: true,
    //         onSuccess: () => {
    //           console.log('Status updated successfully');
    //         },
    //         onError: (error) => {
    //           console.error('Status update failed', error);
    //         },
    //       }
    //     );
    //   };
    const handleStatusChange = (id: number, status: string) => {
        router.put(
            `/tour-plans/${id}/status`,
            { status },
            {
                preserveScroll: true,
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tour Plans" />
            <div className="min-h-[100vh] bg-gray-200 p-6">
                <h1 className="mb-4 text-2xl font-bold">Tour Plans</h1>

                <table className="w-full border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-blue-950 text-left text-white">
                            <th className="border p-2">S.No</th>
                            <th className="border p-2">Visit Name</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">End Date</th>
                            <th className="border p-2">Tour Plan</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Visit Purpose</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourPlans.map((plan, index) => {
                            const firstVisit = plan.visits?.[0];

                            return (
                                <tr key={plan.id} className="hover:bg-white hover:rounded-lg">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{firstVisit?.name ?? '-'}</td>
                                    <td className="border p-2">{plan.start_date}</td>
                                    <td className="border p-2">{plan.end_date}</td>
                                    <td className="border p-2">{plan.tour_plan_option}</td>
                                    <td className="border p-2">{firstVisit?.type ?? '-'}</td>
                                    <td className="border p-2">{firstVisit?.visit_purpose ?? '-'}</td>
                                    <td className="border p-2">
                                        <select
                                            
                                            className="hover:bg-deep-blue-950 rounded  border px-2 py-1"
                                            value={plan.status}
                                            onChange={(e) => handleStatusChange(plan.id, e.target.value)}
                                        >
                                            <option className="hover:bg-blue-950" value="pending">
                                                Pending
                                            </option>
                                            <option className="hover:bg-blue-950" value="confirmed">
                                                Confirmed
                                            </option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="border p-2">{new Date(plan.created_at).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
};

export default Index;
