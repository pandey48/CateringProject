import { Menu } from "lucide-react";

export default function Navbar({ setOpen }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-500">
              Control Panel
            </p>
            <h1 className="text-lg font-bold text-slate-800 md:text-xl">Catering Admin</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 sm:block">
            Live Dashboard
          </div>

          <img
            src="https://i.pravatar.cc/40"
            className="h-10 w-10 rounded-full border-2 border-slate-200 object-cover shadow-sm"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}