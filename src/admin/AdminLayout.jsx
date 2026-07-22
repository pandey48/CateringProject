import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-amber-50 flex-col md:flex-row">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (overlay) */}
      {open && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <Sidebar closeSidebar={() => setOpen(false)} />

          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex-1 min-h-screen">

        <Navbar setOpen={setOpen} />

        <main className="p-4 md:p-6 bg-white text-gray-800">
          <Outlet />
        </main>

      </div>

    </div>
  );
}