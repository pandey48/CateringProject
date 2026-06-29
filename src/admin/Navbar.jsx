import { Menu } from "lucide-react";

export default function Navbar({ setOpen }) {
  return (
    <div className="h-16 bg-amber-600 shadow flex items-center justify-between px-5">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Menu size={28} />
      </button>

      <h1 className="text-xl font-bold">
        Catering Admin
      </h1>
      <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />

    </div>
  );
}