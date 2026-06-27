import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
            <div><Dashboard/></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}