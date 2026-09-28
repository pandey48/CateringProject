"use client";

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
    <div className="min-h-screen w-full min-w-0 bg-amber-50 p-4 md:p-8">

      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
        Today's Attendance
      </h1>

      <p className="mb-6 text-sm text-gray-600 sm:text-base">
        Date: {today}
      </p>

      {/* Summary */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

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

      {/* Employee List - Mobile Cards / Desktop Table */}

      <div className="space-y-4 md:space-y-0 rounded-xl bg-white shadow md:overflow-x-auto">

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">

            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4">Role</th>
                <th className="p-4">Daily Rate</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((item) => {
                const employee = item.employee;
                const work = item.work;

                return (
                  <tr key={employee._id} className="border-b">
                    <td className="p-4 font-semibold">{employee.name}</td>
                    <td className="p-4 text-center">{employee.role}</td>
                    <td className="p-4 text-center">₹{employee.dailyRate}</td>

                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => markAttendance(employee, "Present")}
                          className={`px-3 py-2 rounded-lg text-xs sm:text-sm ${
                            work?.attendance === "Present"
                              ? "bg-green-600 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => markAttendance(employee, "Half Day")}
                          className={`px-3 py-2 rounded-lg text-xs sm:text-sm ${
                            work?.attendance === "Half Day"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          Half
                        </button>
                        <button
                          onClick={() => markAttendance(employee, "Absent")}
                          className={`px-3 py-2 rounded-lg text-xs sm:text-sm ${
                            work?.attendance === "Absent"
                              ? "bg-red-600 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-center font-bold">₹{work?.amount || 0}</td>

                    <td className="p-4 text-center">
                      {work ? (
                        work.paymentStatus === "Paid" ? (
                          <span className="text-green-600 font-semibold">Paid</span>
                        ) : (
                          <button
                            onClick={() => markPaid(work._id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Mark Paid
                          </button>
                        )
                      ) : (
                        <span className="text-gray-400">Not Marked</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {employees.map((item) => {
            const employee = item.employee;
            const work = item.work;

            return (
              <div key={employee._id} className="border border-slate-200 rounded-lg p-4">
                <div className="mb-3 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">{employee.name}</h3>
                    <p className="text-xs text-slate-500">{employee.role}</p>
                  </div>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                    ₹{employee.dailyRate}/day
                  </span>
                </div>

                <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    onClick={() => markAttendance(employee, "Present")}
                    className={`py-2 rounded-lg font-medium ${
                      work?.attendance === "Present"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => markAttendance(employee, "Half Day")}
                    className={`py-2 rounded-lg font-medium ${
                      work?.attendance === "Half Day"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Half
                  </button>
                  <button
                    onClick={() => markAttendance(employee, "Absent")}
                    className={`py-2 rounded-lg font-medium ${
                      work?.attendance === "Absent"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Absent
                  </button>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">Amount: ₹{work?.amount || 0}</span>
                  {work ? (
                    work.paymentStatus === "Paid" ? (
                      <span className="text-green-600 font-semibold">✓ Paid</span>
                    ) : (
                      <button
                        onClick={() => markPaid(work._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium"
                      >
                        Mark Paid
                      </button>
                    )
                  ) : (
                    <span className="text-gray-400 text-xs">Not Marked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
