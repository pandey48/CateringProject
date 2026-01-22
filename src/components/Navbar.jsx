import React from "react";

export default function Navbar(){
  return (
    <div className="p-4 bg-white shadow flex justify-between items-center">
      <div className="text-lg font-semibold bg-amber-300">Catering & Event Management</div>
      <div className="flex items-center gap-4">
        <input placeholder="Search..." className="border rounded px-3 py-1" />
        <div className="w-9 h-9 rounded-full bg-red-500"></div>
      </div>
    </div>
  )
}
