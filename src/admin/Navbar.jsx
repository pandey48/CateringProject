import { Menu } from "lucide-react";

export default function Navbar({ setOpen }) {
  return (
    <div className="h-16 bg-amber-600 shadow flex items-center justify-between px-4 md:px-6">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded hover:bg-amber-500"
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

      <h1 className="text-xl font-bold text-white">
        Catering Admin
      </h1>
      <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full object-cover"
          alt="User avatar"
        />

    </div>
  );
}