import React from "react";

import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function Dashboard(){
  const [stats,setStats] = useState({orders:0, upcoming:0, revenue:0})
  const [data,setData] = useState([])
  useEffect(()=>{
    async function load(){
      try{
        const token = localStorage.getItem('token')
        const headers = token? { Authorization: 'Bearer ' + token } : {}
        const events = await axios.get((import.meta.env.VITE_API_BASE||'http://localhost:5000/api') + '/events', { headers }).then(r=>r.data)
        setStats({ orders: events.length, upcoming: events.filter(e=> new Date(e.date) > new Date()).length, revenue: 284000 })
        setData(Array.from({length:7}).map((_,i)=>({ day: 'D'+(i+1), revenue: Math.round(Math.random()*15000)})))
      }catch(err){ console.error(err) }
    }
    load()
  },[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="bg-white p-6 rounded-xl shadow" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}><h3 className="text-sm">Orders</h3><p className="text-3xl font-bold">{stats.orders}</p></motion.div>
        <div className="bg-white p-6 rounded-xl shadow"><h3 className="text-sm">Upcoming</h3><p className="text-3xl font-bold">{stats.upcoming}</p></div>
        <div className="bg-white p-6 rounded-xl shadow"><h3 className="text-sm">Revenue</h3><p className="text-3xl font-bold">₹{stats.revenue.toLocaleString()}</p></div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold mb-3">Revenue (last 7 days)</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}><XAxis dataKey="day"/><YAxis/><Tooltip/><Line dataKey="revenue" strokeWidth={2} /></LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
