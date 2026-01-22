import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Billing(){
  const [events,setEvents] = useState([])
  const [selected,setSelected] = useState('')
  const [invoice,setInvoice] = useState({ amount:0, tax:0, discount:0, total:0 })
  useEffect(()=> load(), [])
  async function load(){ const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {}; setEvents((await axios.get((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/events', { headers })).data) }
  function calc(){ const amt = Number(invoice.amount); const tax = amt * 0.18; const total = amt + tax - Number(invoice.discount||0); setInvoice({...invoice, tax, total}) }
  async function create(){ const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {}; await axios.post((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/billing', { event: selected, amount: invoice.amount, tax: invoice.tax, discount: invoice.discount, total: invoice.total }, { headers }); alert('Invoice created') }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Billing & Invoice</h1>
      <div className="bg-white p-4 rounded shadow">
        <select value={selected} onChange={e=>setSelected(e.target.value)} className="p-2 border rounded mb-2 w-full">
          <option value=''>Select Event</option>
          {events.map(ev=> <option key={ev._id} value={ev._id}>{ev.title} - {new Date(ev.date).toLocaleDateString()}</option>)}
        </select>
        <input placeholder="Amount" value={invoice.amount} onChange={e=>setInvoice({...invoice, amount:+e.target.value})} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Discount" value={invoice.discount} onChange={e=>setInvoice({...invoice, discount:+e.target.value})} className="w-full p-2 border rounded mb-2" />
        <div className="mb-2">Tax: ₹{invoice.tax?.toFixed(2) || 0}</div>
        <div className="mb-2">Total: ₹{invoice.total?.toFixed(2) || 0}</div>
        <div className="flex gap-2"><button onClick={calc} className="px-4 py-2 bg-gray-200 rounded">Calculate</button><button onClick={create} className="px-4 py-2 bg-green-600 text-white rounded">Create Invoice</button></div>
      </div>
    </div>
  )
}
