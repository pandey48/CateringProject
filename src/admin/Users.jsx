import { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";
import API_URL from "../config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
  try {
    console.log("API URL:", `${API_URL}/api/bookings`);

    const res = await fetch(`${API_URL}/api/bookings`);

    console.log("Status:", res.status);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    console.log("Users API Data:", data);

    if (!Array.isArray(data)) {
      console.error("Expected array but received:", data);
      return;
    }

    data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setUsers(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("क्या आप इस User को Delete करना चाहते हैं?");
    if (!confirmDelete) return;

    await fetch(`${API_URL}/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Users</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all user records and bookings</p>
        </div>

        <div className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm">
          Total Users: {filteredUsers.length}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Users List - Mobile Cards / Desktop Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Village</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Event Date</th>
                <th className="p-4 font-semibold">Registered</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">{user.customerName}</td>
                  <td className="p-4 text-slate-600">{user.address || "-"}</td>
                  <td className="p-4 text-slate-600">{user.phone || "-"}</td>
                  <td className="p-4 text-slate-600">
                    {user.eventDate ? new Date(user.eventDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-4 text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      aria-label="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {filteredUsers.map((user) => (
            <div key={user._id} className="border border-slate-200 rounded-lg p-4">
              <div className="mb-3">
                <h3 className="font-bold text-slate-800">{user.customerName}</h3>
                <p className="text-xs text-slate-500">{user.address || "Address not provided"}</p>
              </div>

              <div className="space-y-2 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Phone:</span>
                  <span className="font-medium text-slate-800">{user.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Event Date:</span>
                  <span className="font-medium text-slate-800">
                    {user.eventDate ? new Date(user.eventDate).toLocaleDateString() : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Registered:</span>
                  <span className="font-medium text-slate-800">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  aria-label="Delete user"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}