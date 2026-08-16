import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-slate-100 text-slate-800">
      <div className="hidden shrink-0 md:block">
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

      <div className="min-h-screen min-w-0 flex-1">
        <Navbar setOpen={setOpen} />

        <main className="w-full bg-slate-50 p-3 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}