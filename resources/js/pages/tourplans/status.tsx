import React from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

export default function Index({ tourPlans, selectedStatus }) {
  const statuses = ['pending', 'confirmed', 'cancelled'];

  const handleStatusChange = (status) => {
    router.get(`/tour-plans/${status}`);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Tour Plan',
      href: '/tour-plans',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Tour Status</h1>

        {/* Filter Buttons */}
        <div className="mb-4 flex gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              className={`px-3 hover:cursor-pointer py-1 rounded ${
                selectedStatus === status
                  ? 'bg-blue-950 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleStatusChange(status)}
            >
              {/* {status} */}
              <td className="px-4 py-1 ">
  {status === 'confirmed'
    ? 'Approved'
    : status === 'cancelled'
    ? 'Rejected'
    : 'Pending'}
</td>
            </button>
          ))}
          <button
            className="px-3 py-1 hover:cursor-pointer rounded bg-gray-300 text-gray-800"
            onClick={() => handleStatusChange('')}
          >
            All
          </button>
        </div>

        {/* Table Format */}
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full mt-5 bg-white border border-gray-200 rounded shadow">
            <thead className="bg-blue-950 text-white text-left">
              <tr>
                <th className="px-4 py-2 border-b">Tour Option</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Start Date</th>
                <th className="px-4 py-2 border-b">End Date</th>
                <th className="px-4 py-2 border-b">Expenses</th>
                <th className="px-4 py-2 border-b">Visits</th>
              </tr>
            </thead>
            <tbody>
              {tourPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No tour plans found.
                  </td>
                </tr>
              ) : (
                tourPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{plan.tour_plan_option}</td>
                    {/* <td className="px-4 py-2 border-b capitalize">{plan.status}</td> */}
                    <td className="px-4 py-2 border-b capitalize">{plan?.status === 'confirmed'
    ? 'Approved'
    : plan?.status === 'cancelled'
    ? 'Rejected'
    : 'Pending'}</td>
                    <td className="px-4 py-2 border-b">{plan.start_date}</td>
                    <td className="px-4 py-2 border-b">{plan.end_date}</td>
                    <td className="px-4 py-2 border-b">{plan.expenses?.length || 0}</td>
                    <td className="px-4 py-2 border-b">{plan.visits?.length || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
