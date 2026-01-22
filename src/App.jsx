import React from "react";

import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Menu from './components/Menu'
import Events from './pages/Events'
import Staff from './pages/Staff'
import Billing from './pages/Billing'
import { Home } from "./WebPages/Home";

export default function App(){
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/Dashboard" element={<Layout><Dashboard/></Layout>} /> 
      <Route path="/menu" element={<Layout><Menu/></Layout>} />
      <Route path="/events" element={<Layout><Events/></Layout>} />
      <Route path="/staff" element={<Layout><Staff/></Layout>} />
      <Route path="/billing" element={<Layout><Billing/></Layout>} />
    </Routes>
   
    </>
    
  )
}
