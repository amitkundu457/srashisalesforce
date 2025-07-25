import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PageProps } from './types';
import AppLayout from '@/layouts/app-layout';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { type BreadcrumbItem } from '@/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Roles', href: '/roles' },
];

export default function Index({ roles }: PageProps<{ roles: Role[] }>) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [rowLoadingId, setRowLoadingId] = useState<number | null>(null);
  const { props } = usePage();

  useEffect(() => {
    const timeout = setTimeout(() => setInitialLoading(false), 300);
    return () => clearTimeout(timeout);
  }, []);

  console.log(props.flash);
  useEffect(() => {
    if (props.flash?.success) {
      toast.success(props.flash.success, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  }, [props.flash]);

  const handleCreate = () => {
    setButtonLoading(true);
    router.visit('/settings/roles/create', {
      onFinish: () => setButtonLoading(false),
    });
  };

  const handleEdit = (id: number) => {
    setRowLoadingId(id);
    router.visit(`/roles/${id}/edit`, {
      onFinish: () => setRowLoadingId(null),
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRowLoadingId(id);
      router.delete(`/roles/${id}`, {
        onFinish: () => setRowLoadingId(null),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <ToastContainer />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Roles Management
          </h1>
          <button
            onClick={handleCreate}
            disabled={buttonLoading}
            className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-semibold shadow-sm transition duration-200 ${
              buttonLoading
                ? 'bg-blue-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {buttonLoading ? 'Loading...' : '+ Create Role'}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Permissions</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {initialLoading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </td>
                  </tr>
                ))
              ) : roles.length > 0 ? (
                roles.map((role) =>
                  rowLoadingId === role.id ? (
                    <tr key={role.id} className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {[...Array(4)].map((_, j) => (
                            <div key={j} className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {role.name}
                      </td>
                      <td className="p-2 w-[60%]">
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.length > 0 ? (
                            role.permissions.map((permission) => (
                              <span
                                key={permission.id}
                                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              >
                                {permission.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => handleEdit(role.id)}
                          className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <CiEdit className="text-lg" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="inline-flex items-center gap-1 rounded-md bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          <MdDeleteOutline className="text-lg" /> Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
