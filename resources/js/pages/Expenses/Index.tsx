// import React from 'react'
// import { router, usePage } from '@inertiajs/react'
// import AppLayout from '@/layouts/app-layout'
// import { type BreadcrumbItem } from '@/types';
// import { Head, PageProps } from '@inertiajs/react';

// interface Expense {
//   id: number
//   type: string
//   amount: string
//   date: string
//   status: string
//   tour_plan_id: number
// }

// interface Props {
//   expenses: Expense[]
// }
// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Expenses',
//         href: '/expenses',
//     },
// ];


// const Index = ({ expenses }: Props) => {
//   const handleDelete = (id: number) => {
//     if (confirm('Are you sure to delete?')) {
//       router.delete(`/expenses/${id}`)
//     }
//   }

//   return (
//        <AppLayout breadcrumbs={breadcrumbs}>
//     <div>
//       {/* <h2 className="text-xl font-bold mb-4">Expenses</h2> */}
//       {/* <a href="/expenses/create" className="bg-blue-600 text-white px-4 py-2 rounded">Add Expense</a> */}
//       <table className="mt-4 w-full border">
//         <thead>
//           <tr>
//             <th>Type</th>
//             <th>Amount</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map(exp => (
//             <tr key={exp.id}>
//               <td>{exp.type}</td>
//               <td>{exp.amount}</td>
//               <td>{exp.date}</td>
//               <td>{exp.status}</td>
//               <td>
//                 <a href={`/expenses/${exp.id}/edit`} className="text-blue-600">Edit</a> | 
//                 <button onClick={() => handleDelete(exp.id)} className="text-red-600 ml-2">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </AppLayout>
//   )
// }

// export default Index


import React from 'react'
import { router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';


interface Expense {
  id: number
  type: string
  amount: string
  date: string
  status: string
  description:string,
  tour_plan_id: number,
  tour_plan: {
    tour_plan_option:string

  }
  
}



interface Props {
  expenses: Expense[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Expenses',
    href: '/expenses',
  },
];

const Index = ({ expenses }: Props) => {
    console.log("expenses", expenses);
  const handleDelete = (id: number) => {
    if (confirm('Are you sure to delete?')) {
      router.delete(`/expenses/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 bg-gray-200 min-h-screen">
        <h1 className='font-bold text-xl'>Expenses</h1>
        <table className="mt-4 w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-950 text-white">
            <th className="text-center px-4 py-2 border">Tour Plan</th>
              <th className="text-center px-4 py-2 border">Exp Type</th>
            
              {/* <th className="text-center px-4 py-2 border">Visit Name</th> */}
              <th className=' text-center px-4 py-2 border'>Description</th>
              <th className="text-center px-4 py-2 border">Amount</th>
              <th className="text-center px-4 py-2 border">Date</th>
              <th className="text-center px-4 py-2 border">Status</th>
              <th className="text-center px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id} className="border-t hover:bg-white">
                   <td className="text-center px-4 py-2 border">{exp?.tour_plan?.tour_plan_option}</td>
                <td className="text-center px-4 py-2 border">{exp?.type}</td>

             
                {/* <td className="text-center px-4 py-2 border">{exp?.type}</td> */}



                <td className=' text-center px-4 py-2 border'>{exp?.description}</td>
                <td className="text-center px-4 py-2 border">{exp?.amount}</td>
                <td className="text-center px-4 py-2 border">{exp?.date}</td>
                <td className="text-center px-4 py-2 border capitalize">{exp.status}</td>
                <td className="text-center px-4 py-2 border">
                  {/* <a href={`/expenses/${exp.id}/edit`} className="text-blue-600 hover:underline">Edit</a> */}
                  <button 
                    onClick={() => handleDelete(exp.id)} 
                    className="text-red-600 ml-2 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  )
}

export default Index
