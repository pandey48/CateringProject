import { useEffect, useState } from "react";
import API_URL from "../config";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}http:///api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Registered Users
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-900 text-white">

          <tr>

            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Date</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id} className="border-b">

              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}