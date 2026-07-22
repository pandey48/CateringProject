import {
  LayoutDashboard,
  Users,
  Calendar,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar({ closeSidebar }) {
  return (
    <div className="w-full md:w-64 bg-gray-900 text-white min-h-screen flex-shrink-0">

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

      <nav className="space-y-1">

        <Link
          to="/admin"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Users />
          Users
        </Link>

        <Link
          to="/admin/invoices"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Calendar />
          Invoices
        </Link>

        <Link
          to="/admin/menu"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <UtensilsCrossed />
          Menu
        </Link>
        <Link
          to="/admin/material"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <UtensilsCrossed />
          Material Calculate
        </Link>
        <Link
          to="/admin/menu"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <UtensilsCrossed />
          Employee
        </Link>

      </nav>

    </div>
  );
}