import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { LeadTypeSkeletonLayout } from './LeadTypeSkeletonLayout';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ConfirmDialog from '@/components/ConfirmDialog';

interface LeadType {
  id: number;
  name: string;
}

interface Props {
  leadTypes?: LeadType[];
  filters?: {
    search?: string;
    sort?: 'asc' | 'desc';
  };
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function LeadTypeIndex({ leadTypes = [], filters = {}, pagination }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(filters.sort || 'asc');
  const [editingType, setEditingType] = useState<LeadType | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { props } = usePage();
  const isLoading = props?.isLoading || !leadTypes;

  const safePagination = pagination || {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  };

  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Lead Types', href: '/leadtype' }];

  const fetchLeadTypes = (page = 1) => {
    router.get('/leadtype', { search, sort: sortOrder, page }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editingType ? `/leadtype/${editingType.id}` : '/leadtype';
    const method = editingType ? 'put' : 'post';

    router[method](url, { name }, {
      onSuccess: () => {
        toast.success(`Lead type ${editingType ? 'updated' : 'created'}!`);
        resetForm();
        fetchLeadTypes(safePagination.current_page);
      },
      onError: (errors) => {
        toast.error(errors.name || 'Operation failed.');
      },
      onFinish: () => setLoading(false),
      preserveScroll: true,
    });
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    router.delete(`/leadtype/${deleteId}`, {
      onSuccess: () => {
        toast.success('Lead type deleted.');
        fetchLeadTypes(safePagination.current_page);
      },
      onError: () => toast.error('Failed to delete.'),
    });
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const resetForm = () => {
    setEditingType(null);
    setName('');
  };

  const openEditModal = (type: LeadType) => {
    setEditingType(type);
    setName(type.name);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    fetchLeadTypes(safePagination.current_page);
  };

  const openConfirmDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Lead Types" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left form */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">{editingType ? 'Edit Lead Type' : 'Add Lead Type'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-3 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {loading ? 'Saving...' : editingType ? 'Update' : 'Save'}
              </button>
              {editingType && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right table */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lead Types List</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchLeadTypes()}
              className="border border-gray-300 px-3 py-1.5 rounded w-1/3 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Search lead types..."
            />
          </div>

          {isLoading ? (
            <LeadTypeSkeletonLayout />
          ) : (
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700 text-left">
                  <th className="py-2">#</th>
                  <th className="py-2 cursor-pointer" onClick={toggleSortOrder}>
                    Name {sortOrder === 'asc' ? '↑' : '↓'}
                  </th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadTypes.map((type, index) => (
                  <tr key={type.id} className="border-b dark:border-gray-800">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{type.name}</td>
                    <td className="py-2 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(type)}
                        className="text-white bg-blue-700 text-lg p-2 rounded-lg hover:underline"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => openConfirmDelete(type.id)}
                        className="text-white bg-red-700 text-lg p-2 rounded-lg hover:underline"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-end gap-2">
            {[...Array(safePagination.last_page)].map((_, i) => (
              <button
                key={i}
                onClick={() => fetchLeadTypes(i + 1)}
                className={`px-3 py-1 rounded ${
                  safePagination.current_page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        message="Are you sure you want to delete this lead type?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </AppLayout>
  );
}
