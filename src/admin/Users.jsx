import { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";
import API_URL from "../config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/api/users`);
    const data = await res.json();

    // Latest first
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setUsers(data);
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
    <div className="p-8 bg-cyan-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="flex justify-between items-center mb-5">

        <div className="flex items-center gap-2">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-80"
          />
        </div>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          Total Users : {filteredUsers.length}
        </div>

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>
              <th className="p-4">Name</th>
              <th>Village</th>
              <th>Phone</th>
              <th>Event Date</th>
              <th>Registered</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4 font-semibold">{user.name}</td>

                <td>{user.Vilage || "-"}</td>

                <td>{user.phone || "-"}</td>

                <td>
                  {user.EventDate
                    ? new Date(user.EventDate).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </td>

                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}