"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Trash2,
  X,
  Phone,
  Briefcase,
  IndianRupee,
  CheckCircle,
  Clock,
} from "lucide-react";

import API_URL from "../config";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [works, setWorks] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    role: "Cook",
    address: "",
    dailyRate: "",
  });

  // =========================
  // Fetch Employees
  // =========================

  const fetchEmployees = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/employees`
      );

      const data = await res.json();

      setEmployees(data);
    } catch (error) {
      console.error("Employee Error:", error);
    }
  };

  // =========================
  // Fetch Work
  // =========================

  const fetchWorks = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/employee-work`
      );

      const data = await res.json();

      setWorks(data);
    } catch (error) {
      console.error("Work Error:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchWorks();
  }, []);

  // =========================
  // Form Change
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Add Employee
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_URL}/api/employees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...form,
            dailyRate: Number(form.dailyRate || 0),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Employee create failed");
      }

      alert("Employee Added Successfully ✅");

      setForm({
        name: "",
        phone: "",
        role: "Cook",
        address: "",
        dailyRate: "",
      });

      setShowForm(false);

      fetchEmployees();
    } catch (error) {
      console.error(error);

      alert("Employee add नहीं हुआ");
    }
  };

  // =========================
  // Delete Employee
  // =========================

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "क्या आप इस employee को delete करना चाहते हैं?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `${API_URL}/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // Employee Work
  // =========================

  const getEmployeeWorks = (employeeId) => {
    return works.filter(
      (work) =>
        work.employee?._id === employeeId
    );
  };

  // =========================
  // Calculations
  // =========================

  const getStats = (employeeId) => {
    const employeeWorks =
      getEmployeeWorks(employeeId);

    const totalEarned = employeeWorks.reduce(
      (total, work) =>
        total + Number(work.amount || 0),
      0
    );

    const totalPaid = employeeWorks
      .filter(
        (work) =>
          work.paymentStatus === "Paid"
      )
      .reduce(
        (total, work) =>
          total + Number(work.amount || 0),
        0
      );

    const pending =
      totalEarned - totalPaid;

    return {
      totalWork: employeeWorks.length,
      totalEarned,
      totalPaid,
      pending,
    };
  };

  // =========================
  // Search
  // =========================

  const filteredEmployees =
    employees.filter((employee) => {
      const text = search.toLowerCase();

      return (
        employee.name
          ?.toLowerCase()
          .includes(text) ||
        employee.phone
          ?.toLowerCase()
          .includes(text) ||
        employee.role
          ?.toLowerCase()
          .includes(text)
      );
    });

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Employees
          </h1>

          <p className="text-gray-500">
            Manage employees and payment records
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(true)
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />

          Add Employee
        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-lg py-3 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Employee Cards */}

      {filteredEmployees.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">

          <Briefcase
            size={45}
            className="mx-auto mb-3"
          />

          <p>
            No employees found.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredEmployees.map(
            (employee) => {

              const stats =
                getStats(employee._id);

              return (
                <div
                  key={employee._id}
                  className="bg-white rounded-xl shadow p-5"
                >

                  {/* Employee Header */}

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold">
                        {employee.name}
                      </h2>

                      <p className="text-gray-500">
                        {employee.role}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm h-fit ${
                        employee.status ===
                        "Available"
                          ? "bg-green-100 text-green-700"
                          : employee.status ===
                            "Busy"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>

                  </div>

                  {/* Contact */}

                  <div className="mt-4 space-y-2 text-gray-600">

                    <p className="flex gap-2">
                      <Phone size={18} />
                      {employee.phone}
                    </p>

                    <p className="flex gap-2">
                      <Briefcase size={18} />
                      ₹{employee.dailyRate} / day
                    </p>

                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="bg-blue-50 rounded-lg p-3">

                      <p className="text-sm text-gray-500">
                        Work
                      </p>

                      <p className="text-xl font-bold">
                        {stats.totalWork}
                      </p>

                    </div>

                    <div className="bg-green-50 rounded-lg p-3">

                      <p className="text-sm text-gray-500">
                        Earned
                      </p>

                      <p className="text-xl font-bold text-green-600">
                        ₹{stats.totalEarned}
                      </p>

                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">

                      <p className="text-sm text-gray-500">
                        Paid
                      </p>

                      <p className="text-xl font-bold text-blue-600">
                        ₹{stats.totalPaid}
                      </p>

                    </div>

                    <div className="bg-red-50 rounded-lg p-3">

                      <p className="text-sm text-gray-500">
                        Pending
                      </p>

                      <p className="text-xl font-bold text-red-600">
                        ₹{stats.pending}
                      </p>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex gap-2 mt-5">

                    <button
                      onClick={() =>
                        setSelectedEmployee(
                          employee
                        )
                      }
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                    >
                      <Eye size={18} />

                      History
                    </button>

                    <button
                      onClick={() =>
                        deleteEmployee(
                          employee._id
                        )
                      }
                      className="px-4 bg-red-100 text-red-600 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* Add Employee Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-lg">

            <div className="flex justify-between items-center p-5 border-b">

              <h2 className="text-xl font-bold">
                Add Employee
              </h2>

              <button
                onClick={() =>
                  setShowForm(false)
                }
              >
                <X />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-4"
            >

              <input
                name="name"
                placeholder="Employee Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="Cook">
                  Cook
                </option>

                <option value="Waiter">
                  Waiter
                </option>

                <option value="Helper">
                  Helper
                </option>

                <option value="Manager">
                  Manager
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="number"
                name="dailyRate"
                placeholder="Daily Rate"
                value={form.dailyRate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                Save Employee
              </button>

            </form>

          </div>

        </div>

      )}

      {/* Employee History Modal */}

      {selectedEmployee && (

        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center p-5 border-b">

              <div>

                <h2 className="text-2xl font-bold">
                  {selectedEmployee.name}
                </h2>

                <p className="text-gray-500">
                  {selectedEmployee.role}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedEmployee(null)
                }
              >
                <X />
              </button>

            </div>

            <div className="p-5">

              {(() => {

                const stats =
                  getStats(
                    selectedEmployee._id
                  );

                return (
                  <div className="grid md:grid-cols-4 gap-4 mb-6">

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p>Work</p>

                      <p className="text-2xl font-bold">
                        {stats.totalWork}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p>Earned</p>

                      <p className="text-2xl font-bold text-green-600">
                        ₹{stats.totalEarned}
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p>Paid</p>

                      <p className="text-2xl font-bold text-blue-600">
                        ₹{stats.totalPaid}
                      </p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <p>Pending</p>

                      <p className="text-2xl font-bold text-red-600">
                        ₹{stats.pending}
                      </p>
                    </div>

                  </div>
                );

              })()}

              {/* History */}

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px]">

                  <thead className="bg-gray-900 text-white">

                    <tr>

                      <th className="p-3 text-left">
                        Date
                      </th>

                      <th className="text-left">
                        Booking
                      </th>

                      <th className="text-left">
                        Role
                      </th>

                      <th className="text-left">
                        Amount
                      </th>

                      <th className="text-left">
                        Payment
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {getEmployeeWorks(
                      selectedEmployee._id
                    ).map((work) => (

                      <tr
                        key={work._id}
                        className="border-b"
                      >

                        <td className="p-3">
                          {new Date(
                            work.workDate
                          ).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>

                        <td>
                          {work.booking
                            ?.customerName ||
                            "-"}
                        </td>

                        <td>
                          {work.role}
                        </td>

                        <td>
                          ₹{work.amount}
                        </td>

                        <td>

                          {work.paymentStatus ===
                          "Paid" ? (
                            <span className="text-green-600 flex gap-1 items-center">
                              <CheckCircle
                                size={16}
                              />
                              Paid
                            </span>
                          ) : (
                            <span className="text-red-600 flex gap-1 items-center">
                              <Clock
                                size={16}
                              />
                              Pending
                            </span>
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
