import { useEffect, useState } from "react";
import {
  Search,
  CalendarDays,
  Users,
  Phone,
  MapPin,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import API_URL from "../config";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/bookings`);

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();

      setBookings(data);
    } catch (error) {
      console.error("Bookings Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete booking
  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "क्या आप इस booking को delete करना चाहते हैं?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Booking delete नहीं हुई");
    }
  };

  // Update booking status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Status update failed");
      }

      fetchBookings();

      if (selectedBooking?._id === id) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Today's date
  const today = new Date()
    .toISOString()
    .split("T")[0];

  // Today's bookings
  const todayBookings = bookings.filter((booking) => {
    if (!booking.eventDate) return false;

    return (
      new Date(booking.eventDate)
        .toISOString()
        .split("T")[0] === today
    );
  });

  // Pending
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );

  // Confirmed
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  // Search + filter
  const filteredBookings = bookings.filter((booking) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (booking.customerName || "")
        .toLowerCase()
        .includes(searchText) ||
      (booking.phone || "")
        .toLowerCase()
        .includes(searchText) ||
      (booking.address || "")
        .toLowerCase()
        .includes(searchText) ||
      (booking.eventType || "")
        .toLowerCase()
        .includes(searchText);

    let matchesFilter = true;

    if (filter === "today") {
      matchesFilter = todayBookings.some(
        (item) => item._id === booking._id
      );
    }

    if (filter === "pending") {
      matchesFilter = booking.status === "Pending";
    }

    if (filter === "confirmed") {
      matchesFilter = booking.status === "Confirmed";
    }

    if (filter === "completed") {
      matchesFilter = booking.status === "Completed";
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Booking Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all catering bookings and today's work
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-blue-500 text-white rounded-xl p-5 shadow">
          <div className="flex justify-between">
            <div>
              <p>Total Bookings</p>
              <h2 className="text-3xl font-bold mt-2">
                {bookings.length}
              </h2>
            </div>

            <CalendarDays size={32} />
          </div>
        </div>

        <div className="bg-orange-500 text-white rounded-xl p-5 shadow">
          <div className="flex justify-between">
            <div>
              <p>Today's Work</p>
              <h2 className="text-3xl font-bold mt-2">
                {todayBookings.length}
              </h2>
            </div>

            <CalendarDays size={32} />
          </div>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-5 shadow">
          <div className="flex justify-between">
            <div>
              <p>Pending</p>
              <h2 className="text-3xl font-bold mt-2">
                {pendingBookings.length}
              </h2>
            </div>

            <Clock size={32} />
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-xl p-5 shadow">
          <div className="flex justify-between">
            <div>
              <p>Confirmed</p>
              <h2 className="text-3xl font-bold mt-2">
                {confirmedBookings.length}
              </h2>
            </div>

            <CheckCircle size={32} />
          </div>
        </div>

      </div>

      {/* Today's Work */}
      {todayBookings.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">

          <h2 className="text-xl font-bold text-orange-700 mb-4">
            🔥 Today's Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {todayBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl p-4 shadow"
              >
                <h3 className="font-bold text-lg">
                  {booking.customerName}
                </h3>

                <p className="text-gray-600">
                  {booking.eventType}
                </p>

                <p className="text-gray-600">
                  👥 {booking.persons} Persons
                </p>

                <p className="text-gray-600">
                  📞 {booking.phone}
                </p>

                <button
                  onClick={() =>
                    setSelectedBooking(booking)
                  }
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex flex-col lg:flex-row gap-4 justify-between">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search customer, phone, address..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-lg py-3 pl-10 pr-4"
            />

          </div>

          <div className="flex flex-wrap gap-2">

            {[
              ["all", "All"],
              ["today", "Today"],
              ["pending", "Pending"],
              ["confirmed", "Confirmed"],
              ["completed", "Completed"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-2 rounded-lg ${
                  filter === value
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* Table - Mobile Cards / Desktop Table */}
      <div className="bg-white rounded-xl shadow">

        {loading ? (
          <div className="p-10 text-center">
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-900 text-white">

                  <tr>
                    <th className="p-4 text-left">
                      Customer
                    </th>

                    <th className="text-left">
                      Event
                    </th>

                    <th className="text-left">
                      Date
                    </th>

                    <th className="text-left">
                      Persons
                    </th>

                    <th className="text-left">
                      Menu
                    </th>

                    <th className="text-left">
                      Status
                    </th>

                    <th className="text-left">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {filteredBookings.map((booking) => (

                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <div className="font-semibold">
                          {booking.customerName}
                        </div>

                        <div className="text-sm text-gray-500">
                          {booking.phone}
                        </div>

                      </td>

                      <td>
                        {booking.eventType}
                      </td>

                      <td>

                        {booking.eventDate
                          ? new Date(
                              booking.eventDate
                            ).toLocaleDateString("en-GB")
                          : "-"}

                      </td>

                      <td>
                        {booking.persons}
                      </td>

                      <td>
                        {booking.menuItems?.length || 0} items
                      </td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : booking.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>

                      </td>

                      <td>

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              setSelectedBooking(booking)
                            }
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() =>
                              deleteBooking(booking._id)
                            }
                            className="p-2 bg-red-100 text-red-600 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3 p-4">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="border border-slate-200 rounded-lg p-4">
                  <div className="mb-3">
                    <h3 className="font-bold text-slate-800">{booking.customerName}</h3>
                    <p className="text-xs text-slate-500">{booking.phone}</p>
                  </div>

                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Event:</span>
                      <span className="font-medium text-slate-800">{booking.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date:</span>
                      <span className="font-medium text-slate-800">
                        {booking.eventDate
                          ? new Date(booking.eventDate).toLocaleDateString("en-GB")
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Persons:</span>
                      <span className="font-medium text-slate-800">{booking.persons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Menu Items:</span>
                      <span className="font-medium text-slate-800">{booking.menuItems?.length || 0}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* Details Modal */}
      {selectedBooking && (

        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b">

              <div>
                <h2 className="text-2xl font-bold">
                  Booking Details
                </h2>

                <p className="text-gray-500">
                  {selectedBooking.customerName}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedBooking(null)
                }
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle />
              </button>

            </div>

            {/* Details */}
            <div className="p-5 space-y-5">

              <div className="grid md:grid-cols-2 gap-4">

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Customer
                  </p>

                  <p className="font-semibold">
                    {selectedBooking.customerName}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {selectedBooking.phone}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Event
                  </p>

                  <p className="font-semibold">
                    {selectedBooking.eventType}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Event Date
                  </p>

                  <p className="font-semibold">
                    {new Date(
                      selectedBooking.eventDate
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Persons
                  </p>

                  <p className="font-semibold">
                    {selectedBooking.persons}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Status
                  </p>

                  <p className="font-semibold">
                    {selectedBooking.status}
                  </p>
                </div>

              </div>

              {/* Address */}
              <div className="border rounded-lg p-4">

                <div className="flex gap-2 items-start">

                  <MapPin
                    size={20}
                    className="text-red-500"
                  />

                  <div>
                    <p className="text-gray-500 text-sm">
                      Event Address
                    </p>

                    <p className="font-semibold">
                      {selectedBooking.address}
                    </p>
                  </div>

                </div>

              </div>

              {/* Menu */}
              <div>

                <h3 className="font-bold text-lg mb-3">
                  Selected Menu
                </h3>

                {selectedBooking.menuItems?.length > 0 ? (

                  <div className="flex flex-wrap gap-2">

                    {selectedBooking.menuItems.map(
                      (menu) => (
                        <span
                          key={menu._id}
                          className="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg"
                        >
                          {menu.dishName}
                        </span>
                      )
                    )}

                  </div>

                ) : (
                  <p className="text-gray-500">
                    No menu selected
                  </p>
                )}

              </div>

              {/* Status Buttons */}
              <div>

                <h3 className="font-bold mb-3">
                  Update Status
                </h3>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedBooking._id,
                        "Pending"
                      )
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedBooking._id,
                        "Confirmed"
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedBooking._id,
                        "Completed"
                      )
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Completed
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedBooking._id,
                        "Cancelled"
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}