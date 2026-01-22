import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Menu(){
  const [items,setItems] = useState([])
  const [form,setForm] = useState({ name:'', price:0, category:'', veg:true })
  const [editing,setEditing] = useState(null)

  useEffect(()=>{ load() },[])
  async function load(){ const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {}; const res = await axios.get((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/menu', { headers }); setItems(res.data); }

  async function save(){
    const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {};
    if(editing){ const res = await axios.put((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/menu/' + editing._id, form, { headers }); setItems(items.map(i=> i._id===res.data._id? res.data : i)); setEditing(null); }
    else { const res = await axios.post((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/menu', form, { headers }); setItems([res.data, ...items]); }
    setForm({ name:'', price:0, category:'', veg:true })
  }
  async function remove(id){ if(!confirm('Delete?')) return; const token = localStorage.getItem('token'); const headers = token? { Authorization: 'Bearer ' + token } : {}; await axios.delete((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/menu/' + id, { headers }); setItems(items.filter(i=>i._id!==id)); }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it=> (
          <div key={it._id} className="bg-white p-4 rounded-xl shadow">
            <img src={it.image||'https://picsum.photos/300'} className="h-40 w-full object-cover rounded-md" />
            <h3 className="mt-2 font-semibold">{it.name}</h3>
            <p>₹{it.price}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>{ setEditing(it); setForm(it); }} className="px-3 py-1 rounded bg-yellow-100">Edit</button>
              <button onClick={()=>remove(it._id)} className="px-3 py-1 rounded bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h4 className="font-semibold">{editing? 'Edit' : 'Add'} Item</h4>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded mb-2" />
        <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:+e.target.value})} className="w-full p-2 border rounded mb-2" />
        <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full p-2 border rounded mb-2"><option value="">Category</option><option>Starter</option><option>Main</option><option>Dessert</option></select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.veg} onChange={e=>setForm({...form,veg:e.target.checked})} /> Veg</label>
        <div className="flex gap-2 mt-3">
          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">{editing? 'Update' : 'Create'}</button>
          {editing && <button onClick={()=>{ setEditing(null); setForm({ name:'', price:0, category:'', veg:true}) }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>}
        </div>
      </div>
    </div>
  )
}
