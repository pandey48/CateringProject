import {
  LayoutDashboard,
  Users,
  Calendar,
  UtensilsCrossed,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Catering Admin
      </div>

      <nav className="mt-6">

        <Link
          to="/adminLayout"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Users />
          Users
        </Link>

        <Link
          to="/admin/bookings"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Calendar />
          Bookings
        </Link>

        <Link
          to="/admin/menu"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <UtensilsCrossed />
          Menu
        </Link>

      </nav>
    </div>
  );
}