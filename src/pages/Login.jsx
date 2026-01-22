import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [email,setEmail] = useState('admin@example.com')
  const [password,setPassword] = useState('admin123')
  const nav = useNavigate()
  async function submit(e){ e.preventDefault(); try{ const res = await axios.post((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/auth/login', { email, password}); localStorage.setItem('token', res.data.token); nav('/'); } catch(err){ alert('Login failed'); } }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input className="w-full p-2 border rounded mb-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
