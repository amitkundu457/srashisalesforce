import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { LeadTypeSkeletonLayout } from './LeadTypeSkeletonLayout';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import ConfirmDialog from '@/components/ConfirmDialog';
import RightDrawerModal from '@/components/RightDrawerModal';

interface SalesPerson {
  id: number;
  name: string;
  email: string;
  phone?: string;
  department_name?: string;
  designation_name?: string;
  shift_start_time?: string;
  shift_end_time?: string;
  employee_id?: string;
  join_date?: string;
}

interface Props {
  salespersons?: SalesPerson[];
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

export default function SalesPersonIndex({ salespersons = [], filters = {}, pagination }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(filters.sort || 'asc');
  const [editing, setEditing] = useState<SalesPerson | null>(null);
  console.log('Salespersons:', salespersons);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department_name: '',
    designation_name: '',
    shift_start_time: '',
    shift_end_time: '',
    employee_id: '',
    join_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { props } = usePage();
  const isLoading = props?.isLoading || !salespersons;

  const safePagination = pagination || {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  };

  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Sales Persons', href: '/salesperson' }];

  const fetchSalesPersons = (page = 1) => {
    router.get('/salesperson', { search, sort: sortOrder, page }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editing ? `/salesperson/${editing.id}` : '/salesperson';
    const method = editing ? 'put' : 'post';

    router[method](url, form, {
      onSuccess: () => {
        toast.success(`Salesperson ${editing ? 'updated' : 'created'}!`);
        resetForm();
        fetchSalesPersons(safePagination.current_page);
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
    router.delete(`/salesperson/${deleteId}`, {
      onSuccess: () => {
        toast.success('Salesperson deleted.');
        fetchSalesPersons(safePagination.current_page);
      },
      onError: () => toast.error('Failed to delete.'),
    });
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      department_name: '',
      designation_name: '',
      shift_start_time: '',
      shift_end_time: '',
      employee_id: '',
      join_date: '',
    });
    setIsDrawerOpen(false);
  };

  const openEditModal = (person: SalesPerson) => {
    setEditing(person);
    setForm({
      name: person.name || '',
      email: person.email || '',
      password: '',
      phone: person.phone || '',
      department_name: person.department_name || '',
      designation_name: person.designation_name || '',
      shift_start_time: person.shift_start_time || '',
      shift_end_time: person.shift_end_time || '',
      employee_id: person.employee_id || '',
      join_date: person.join_date || '',
    });
    setIsDrawerOpen(true);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    fetchSalesPersons(safePagination.current_page);
  };

  const openConfirmDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Salesperson" />
      <div className="px-6 pt-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Salesperson</h1>
        <button
          onClick={() => {
            setEditing(null);
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Salesperson List</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchSalesPersons()}
              className="border border-gray-300 px-3 py-1.5 rounded w-1/3 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Search..."
            />
          </div>

          {isLoading ? (
            <LeadTypeSkeletonLayout />
          ) : (
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700 text-left">
                  <th className="py-2">#</th>
                  <th className="py-2">Employee ID</th>
                  <th className="py-2 cursor-pointer" onClick={toggleSortOrder}>
                    Name {sortOrder === 'asc' ? '↑' : '↓'}
                  </th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Phone</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salespersons.map((person, index) => (
                  <tr key={person.id} className="border-b dark:border-gray-800">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{person.employee_id}</td>
                    <td className="py-2">{person.user.name}</td>
                    <td className="py-2">{person.user.email}</td>
                    <td className="py-2">{person.phone || '-'}</td>
                    <td className="py-2 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(person)}
                        className="text-white bg-blue-700 text-lg p-2 rounded-lg"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => openConfirmDelete(person.id)}
                        className="text-white bg-red-700 text-lg p-2 rounded-lg"
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
                onClick={() => fetchSalesPersons(i + 1)}
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

      {/* Drawer Modal for Add/Edit */}
      <RightDrawerModal
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editing ? 'Edit Salesperson' : 'Add Salesperson'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'password', 'phone', 'department_name', 'designation_name', 'shift_start_time', 'shift_end_time','join_date'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium capitalize">{field.replace(/_/g, ' ')}</label>
              <input
                id={field}
                type={field === 'password' ? 'password' : field === 'join_date' ? 'date' : 'text'}
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="mt-1 p-3 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                required={['name', 'email', 'password'].includes(field) && !editing}
              />
            </div>
          ))}

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? 'Saving...' : editing ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </RightDrawerModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        message="Are you sure you want to delete this salesperson?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </AppLayout>
  );
}
