import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          <Sidebar closeSidebar={() => setOpen(false)} />
          <div
            className="flex-1 bg-slate-900/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex-1 min-h-screen">
        <Navbar setOpen={setOpen} />

        <main className="bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}