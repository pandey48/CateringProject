import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Events(){
  const [step,setStep] = useState(1)
  const [clients,setClients] = useState([])
  const [menu,setMenu] = useState([])
  const [form,setForm] = useState({ title:'', client:'', date:'', guests:50, menuItems:[], services:[] })

  useEffect(()=>{ load() },[])
  async function load(){
    const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {};
    setClients((await axios.get((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/clients', { headers })).data || [])
    setMenu((await axios.get((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/menu', { headers })).data || [])
  }

  function toggleMenu(id){
    setForm(prev=> ({ ...prev, menuItems: prev.menuItems.includes(id)? prev.menuItems.filter(m=>m!==id) : [...prev.menuItems, id] }))
  }
  function toggleService(s){
    setForm(prev=> ({ ...prev, services: prev.services.includes(s)? prev.services.filter(x=>x!==s): [...prev.services, s] }))
  }
  async function submit(){
    const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {};
    await axios.post((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/events', form, { headers });
    alert('Event created');
    setForm({ title:'', client:'', date:'', guests:50, menuItems:[], services:[] });
    setStep(1);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        {step===1 && <>
          <label>Title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-2 border rounded mb-2"/></label>
          <label>Client<select value={form.client} onChange={e=>setForm({...form,client:e.target.value})} className="w-full p-2 border rounded mb-2"><option value=''>Select</option>{clients.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}</select></label>
          <label>Date<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full p-2 border rounded mb-2"/></label>
          <label>Guests<input type="number" value={form.guests} onChange={e=>setForm({...form,guests:+e.target.value})} className="w-full p-2 border rounded mb-2"/></label>
          <div className="flex gap-2"><button onClick={()=>setStep(2)} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button></div>
        </>}
        {step===2 && <>
          <h4 className="font-semibold mb-2">Choose Menu Items</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {menu.map(m=> <div key={m._id} className="p-3 border rounded">
              <div className="flex justify-between"><div>{m.name}</div><div>₹{m.price}</div></div>
              <div className="mt-2"><label><input type="checkbox" checked={form.menuItems.includes(m._id)} onChange={()=>toggleMenu(m._id)} /> Select</label></div>
            </div>)}
          </div>
          <div className="flex gap-2 mt-4"><button onClick={()=>setStep(1)} className="px-4 py-2 bg-gray-200 rounded">Back</button><button onClick={()=>setStep(3)} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button></div>
        </>}
        {step===3 && <>
          <h4 className="font-semibold mb-2">Services</h4>
          {['Decoration','Music','Waiters'].map(s=> <label key={s} className="block"><input type="checkbox" checked={form.services.includes(s)} onChange={()=>toggleService(s)} /> {s}</label>)}
          <div className="flex gap-2 mt-4"><button onClick={()=>setStep(2)} className="px-4 py-2 bg-gray-200 rounded">Back</button><button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded">Create Event</button></div>
        </>}
      </div>
    </div>
  )
}
