import { useEffect, useState } from "react";
import API_URL from "../config";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  const fetchAttendance = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/employee-work/today`
      );

      if (!res.ok) {
        throw new Error("Attendance fetch failed");
      }

      const data = await res.json();

      setEmployees(data);
    } catch (error) {
      console.error(error);
      alert("Attendance load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance = async (employee, attendance) => {
    let amount = employee.dailyRate || 0;

    if (attendance === "Half Day") {
      amount = amount / 2;
    }

    if (attendance === "Absent") {
      amount = 0;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/employee-work/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee: employee._id,
            attendance,
            role: employee.role,
            amount,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      alert(`${employee.name} attendance saved ✅`);

      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const markPaid = async (workId) => {
    try {
      const res = await fetch(
        `${API_URL}/api/employee-work/${workId}/payment`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        throw new Error("Payment update failed");
      }

      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const present = employees.filter(
    (item) => item.work?.attendance === "Present"
  ).length;

  const absent = employees.filter(
    (item) => item.work?.attendance === "Absent"
  ).length;

  const halfDay = employees.filter(
    (item) => item.work?.attendance === "Half Day"
  ).length;

  const total = employees.reduce(
    (sum, item) => sum + (item.work?.amount || 0),
    0
  );

  const paid = employees.reduce(
    (sum, item) =>
      sum +
      (item.work?.paymentStatus === "Paid"
        ? item.work.amount
        : 0),
    0
  );

  const pending = total - paid;

  return (
    <div className="p-4 md:p-8 bg-amber-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-2">
        Today's Attendance
      </h1>

      <p className="text-gray-600 mb-6">
        Date: {today}
      </p>

      {/* Summary */}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

        <div className="bg-blue-500 text-white p-5 rounded-xl">
          <p>Employees</p>
          <h2 className="text-2xl font-bold">
            {employees.length}
          </h2>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl">
          <p>Present</p>
          <h2 className="text-2xl font-bold">
            {present}
          </h2>
        </div>

        <div className="bg-red-500 text-white p-5 rounded-xl">
          <p>Absent</p>
          <h2 className="text-2xl font-bold">
            {absent}
          </h2>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-xl">
          <p>Half Day</p>
          <h2 className="text-2xl font-bold">
            {halfDay}
          </h2>
        </div>

        <div className="bg-purple-600 text-white p-5 rounded-xl">
          <p>Total Payment</p>
          <h2 className="text-2xl font-bold">
            ₹{total}
          </h2>
        </div>

      </div>

      {/* Payment Summary */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="flex flex-wrap gap-8">

          <div>
            <p className="text-gray-500">
              Total
            </p>
            <p className="text-xl font-bold">
              ₹{total}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Paid
            </p>
            <p className="text-xl font-bold text-green-600">
              ₹{paid}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Pending
            </p>
            <p className="text-xl font-bold text-red-600">
              ₹{pending}
            </p>
          </div>

        </div>

      </div>

      {/* Employee Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4">
                Role
              </th>

              <th className="p-4">
                Daily Rate
              </th>

              <th className="p-4">
                Attendance
              </th>

              <th className="p-4">
                Amount
              </th>

              <th className="p-4">
                Payment
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.map((item) => {

              const employee = item.employee;
              const work = item.work;

              return (
                <tr
                  key={employee._id}
                  className="border-b"
                >

                  <td className="p-4 font-semibold">
                    {employee.name}
                  </td>

                  <td className="text-center">
                    {employee.role}
                  </td>

                  <td className="text-center">
                    ₹{employee.dailyRate}
                  </td>

                  <td className="text-center">

                    <div className="flex gap-2 justify-center">

                      <button
                        onClick={() =>
                          markAttendance(
                            employee,
                            "Present"
                          )
                        }
                        className={`px-3 py-2 rounded-lg ${
                          work?.attendance === "Present"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Present
                      </button>

                      <button
                        onClick={() =>
                          markAttendance(
                            employee,
                            "Half Day"
                          )
                        }
                        className={`px-3 py-2 rounded-lg ${
                          work?.attendance === "Half Day"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Half
                      </button>

                      <button
                        onClick={() =>
                          markAttendance(
                            employee,
                            "Absent"
                          )
                        }
                        className={`px-3 py-2 rounded-lg ${
                          work?.attendance === "Absent"
                            ? "bg-red-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Absent
                      </button>

                    </div>

                  </td>

                  <td className="text-center font-bold">
                    ₹{work?.amount || 0}
                  </td>

                  <td className="text-center">

                    {work ? (

                      work.paymentStatus === "Paid" ? (

                        <span className="text-green-600 font-semibold">
                          Paid
                        </span>

                      ) : (

                        <button
                          onClick={() =>
                            markPaid(work._id)
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Mark Paid
                        </button>

                      )

                    ) : (

                      <span className="text-gray-400">
                        Not Marked
                      </span>

                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}