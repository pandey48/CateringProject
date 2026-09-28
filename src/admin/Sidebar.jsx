"use client";

import {
  LayoutDashboard,
  Users,
  Calendar,
  UtensilsCrossed,
  Package,
  UserRound,
  ClipboardCheck,
  MessageSquareText,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/enquiries", label: "Enquiries", icon: MessageSquareText },
  { to: "/admin/invoices", label: "Invoices", icon: Calendar },
  { to: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/admin/material", label: "Material Calculate", icon: Package },
  { to: "/admin/employees", label: "Employees", icon: UserRound },
  { to: "/admin/attendance", label: "Attendance", icon: ClipboardCheck },
];

export default function Sidebar({ closeSidebar }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[80vw] max-w-[280px] flex-col bg-slate-900 text-slate-100 shadow-2xl md:w-64">
      <div className="flex items-center justify-between border-b border-slate-700 px-5 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-300">
            Catering
          </p>
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        </div>

        <button
          onClick={closeSidebar}
          className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 md:hidden"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            href={to}
            onClick={closeSidebar}
            aria-current={pathname === to || (to === "/admin" && pathname === "/admin/dashboard") ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-800 hover:text-white ${pathname === to || (to === "/admin" && pathname === "/admin/dashboard") ? "bg-slate-800 text-white" : "text-slate-200"}`}
          >
            <Icon size={18} />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

