import React from 'react'
import { useForm } from '@inertiajs/react'

interface Props {
  salesPersons: any[]
  tourPlans: any[]
}

const Create = ({ salesPersons, tourPlans }: Props) => {
  const { data, setData, post, processing } = useForm({
    sales_person_id: '',
    tour_plan_id: '',
    type: '',
    amount: '',
    date: '',
    status: 'unpaid',
    description: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/expenses')
  }

  return (
    <form onSubmit={submit}>
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      <select onChange={e => setData('sales_person_id', e.target.value)} value={data.sales_person_id}>
        <option>Select Sales Person</option>
        {salesPersons.map(person => (
          <option key={person.id} value={person.id}>{person.name}</option>
        ))}
      </select>

      <select onChange={e => setData('tour_plan_id', e.target.value)} value={data.tour_plan_id}>
        <option>Select Tour Plan</option>
        {tourPlans.map(plan => (
          <option key={plan.id} value={plan.id}>{plan.tour_plan_option}</option>
        ))}
      </select>

      <input type="text" placeholder="Type" value={data.type} onChange={e => setData('type', e.target.value)} />
      <input type="number" placeholder="Amount" value={data.amount} onChange={e => setData('amount', e.target.value)} />
      <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} />
      <select value={data.status} onChange={e => setData('status', e.target.value)}>
        <option value="unpaid">Unpaid</option>
        <option value="paid">Paid</option>
      </select>
      <textarea placeholder="Description" value={data.description} onChange={e => setData('description', e.target.value)} />

      <button type="submit" disabled={processing}>Save</button>
    </form>
  )
}

export default Create
