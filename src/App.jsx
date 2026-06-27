import React from "react";

import { Routes, Route } from 'react-router-dom';

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import  Home  from "./WebPages/Home";
import  Enqury  from "./WebPages/Enqury";
import Bookings from "./admin/Bookings";



export default function App(){
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="adminLayout" element={<AdminLayout/>}/>
    <Route path="users" element={<Users />} />
    <Route path="enqury" element={<Enqury/>}/>;
    
    </Routes>
    <Routes>
      <Route path="/admin/bookings" element={<Bookings />} />
    </Routes>
   
    </>
    
  )
}
