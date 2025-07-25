import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { type BreadcrumbItem } from '@/types';

// ---------- Types ----------
type Permission = {
  id: number;
  name: string;
};

type GroupedPermissions = {
  [groupName: string]: Permission[];
};

type Role = {
  id: number;
  name: string;
  permissions: Permission[];
};

interface RoleFormProps {
  role?: Role | null;
  permissions: GroupedPermissions;
}

// ---------- Component ----------
export default function RoleForm({ role = null, permissions }: RoleFormProps) {
  const [loading, setLoading] = useState(true);
  const { flash } = usePage().props as { flash: { success?: string; error?: string } };

  const { data, setData, post, put, processing, errors } = useForm({
    name: role?.name || '',
    permissions: role?.permissions?.map((p) => p.name) || [],
  });

  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Roles', href: '/roles' }];

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);

  const handleChange = (perm: string) => {
    setData(
      'permissions',
      data.permissions.includes(perm)
        ? data.permissions.filter((p) => p !== perm)
        : [...data.permissions, perm]
    );
  };

 const submit = () => {
  if (role) {
    put(`/roles/${role.id}`);
  } else {
    post('/roles');
  }
};


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={role ? 'Edit Role' : 'Create Role'} />
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {role ? 'Edit Role' : 'Create Role'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Define the role name and select appropriate permissions for this role.
          </p>
        </div>

        {/* Role Name Input */}
        {loading ? (
          <div className="h-10 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ) : (
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role Name
            </label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
              placeholder="Enter role name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
        )}

        {/* Permissions Grid */}
        {loading ? (
          <div className="space-y-6 max-w-6xl mx-auto px-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl border bg-white dark:bg-gray-900 p-6 shadow-sm space-y-3">
                  <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(permissions).map(([group, perms]: [string, Permission[]]) => {
              return (
                <div
                  key={group}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm"
                >
                  <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    {group}
                  </h4>
                  <div className="space-y-2">
                    {perms.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <input
                          type="checkbox"
                          className="accent-blue-600 rounded"
                          checked={data.permissions.includes(perm.name)}
                          onChange={() => handleChange(perm.name)}
                        />
                        <span>{perm.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit Button */}
        {!loading && (
          <div>
            <button
              onClick={submit}
              disabled={processing}
              className={`inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                processing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {processing ? 'Saving...' : role ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
