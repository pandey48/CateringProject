import {
  LayoutDashboard,
  Users,
  Calendar,
  UtensilsCrossed,
  Package,
  UserRound,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar({ closeSidebar }) {
  return (
    <div className="w-full md:w-64 bg-gray-900 text-white min-h-screen flex-shrink-0">

      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-700">

        <h2 className="text-xl font-bold">
          Catering Admin
        </h2>

        <button
          onClick={closeSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-800"
          aria-label="Close menu"
        >
          <X />
        </button>

      </div>

      {/* Navigation */}
      <nav className="space-y-1">

        {/* Dashboard */}
        <Link
          to="/admin"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* Users */}
        <Link
          to="/admin/users"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Users size={20} />
          Users
        </Link>

        {/* Bookings */}
        <Link
  to="/admin/bookings"
  onClick={closeSidebar}
  className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
>
  <Calendar size={20} />
  Bookings
</Link>

        {/* Invoices */}
        <Link
          to="/admin/invoices"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Calendar size={20} />
          Invoices
        </Link>

        {/* Menu */}
        <Link
          to="/admin/menu"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <UtensilsCrossed size={20} />
          Menu
        </Link>

        {/* Material */}
        <Link
          to="/admin/material"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Package size={20} />
          Material Calculate
        </Link>

        {/* Employees */}
        <Link
  to="/admin/employees"
  onClick={closeSidebar}
  className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
>
  <UserRound size={20} />
  Employees
</Link>

      </nav>

    </div>
  );
}