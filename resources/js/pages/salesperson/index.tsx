import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
interface AttendanceSession {
  clock_in: string | null;
  clock_out: string | null;
}

interface User {
  id: number;
  name: string;
  attendance_sessions: AttendanceSession[];
}
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Sales Persons List', href: '/salesperson' }];

interface Salesperson {
  id: number;
  department_name: string;
  designation_name: string;
  user: User;
}

interface Props {
  salespersons: Salesperson[];
}

const Index: React.FC<Props> = ({ salespersons }) => {
    console.log('Salespersons:', salespersons);
  return (
     <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Salesperson List</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-950 text-white text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Department</th>
            <th className="p-3">Designation</th>
            <th className="p-3">Latest Clock In</th>
            <th className="p-3">Latest Clock Out</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salespersons.map((sp) => {
            const latest = sp.user?.attendance_sessions?.[0];
            return (
              <tr key={sp.id} className="border-t text-center">
                <td className="p-3">{sp.user?.name}</td>
                <td className="p-3">{sp.department_name}</td>
                <td className="p-3">{sp.designation_name}</td>
                <td className="p-3">
  {latest?.clock_in ? new Date(latest.clock_in).toLocaleString() : '—'}
</td>
<td className="p-3">
  {latest?.clock_out ? new Date(latest.clock_out).toLocaleString() : '—'}
</td>
                <td className="p-3">
                  <Link
                    href={route('salespersons.show', sp.id)}
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
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
