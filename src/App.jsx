import { Routes, Route } from "react-router-dom";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Menu from "./admin/Menu";
import MaterialCalculator from "./admin/MaterialCalculator";
import Invoices from "./admin/Invoices";

import Home from "./WebPages/Home";
import Enqury from "./WebPages/Enqury";
import Booking from "./WebPages/Booking";
import LoginModal from "./WebPages/LoginModal";

export default function App() {
  return (
    <Routes>

      {/* Website Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/enqury" element={<Enqury />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login"   element={<LoginModal/>}/>


      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="menu" element={<Menu />} />
        <Route path="material" element={<MaterialCalculator />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>

    </Routes>
  );
}