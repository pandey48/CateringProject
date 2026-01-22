import React from "react";
import { NavLink } from 'react-router-dom';
export default function Sidebar(){
  const menu = [{name:'Dashboard',path:'/'},{name:'Menu',path:'/menu'},{name:'Events',path:'/events'},{name:'Staff',path:'/staff'},{name:'Billing',path:'/billing'}];
  return (
    <aside className="w-64 bg-white p-5 shadow">
      <h1 className="text-xl font-bold mb-6">Catering Pro</h1>
      <nav className="space-y-2">
        {menu.map(i=> <NavLink key={i.path} to={i.path} className={({isActive})=> isActive? 'block p-2 rounded bg-blue-600 text-white':'block p-2 rounded hover:bg-blue-50'}>{i.name}</NavLink>)}
      </nav>
    </aside>
  )
}
