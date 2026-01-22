import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Staff(){
  const [staff,setStaff] = useState([])
  const [form,setForm] = useState({ name:'', role:'', phone:'' })
  useEffect(()=> load(), [])
  async function load(){ const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {}; const res = await axios.get((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/staff', { headers }); setStaff(res.data) }
  async function add(){ const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {}; const res = await axios.post((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/staff', form, { headers }); setStaff([res.data, ...staff]); setForm({ name:'', role:'', phone:'' }) }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Staff</h1>
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-2 border rounded mr-2" />
        <input placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="p-2 border rounded mr-2" />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="p-2 border rounded mr-2" />
        <button onClick={add} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {staff.map(s=> <div key={s._id} className="bg-white p-3 rounded shadow">{s.name}<div className="text-sm text-gray-500">{s.role}</div></div>)}
      </div>
    </div>
  )
}
