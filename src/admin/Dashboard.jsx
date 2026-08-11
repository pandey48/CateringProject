import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  UtensilsCrossed,
  IndianRupee,
  Clock,
  CheckCircle,
} from "lucide-react";
import API_URL from "../config";

export default function Dashboard() {
  const [users, setUsers] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/users/count`)
      .then((res) => res.json())
      .then((data) => setUsers(data.totalUsers))
      .catch((err) => console.error("Users:", err));

    fetch(`${API_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Bookings:", err));

    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Menus:", err));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter((booking) => {
    if (!booking.eventDate) return false;

    return (
      new Date(booking.eventDate)
        .toISOString()
        .split("T")[0] === today
    );
  });

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  const cards = [
    {
      title: "Total Users",
      value: users,
      icon: <Users size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: <Calendar size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Menu Items",
      value: menus.length,
      icon: <UtensilsCrossed size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "Pending",
      value: pendingBookings.length,
      icon: <Clock size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} rounded-xl text-white p-6 shadow-lg`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg">{card.title}</h3>

                <p className="text-3xl font-bold mt-2">
                  {card.value}
                </p>
              </div>

              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Today's Work */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Today's Work
          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
            {todayBookings.length} Events
          </span>
        </div>

        {todayBookings.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Calendar
              size={40}
              className="mx-auto mb-3"
            />

            <p>No events scheduled for today.</p>
          </div>
        ) : (
          <div className="space-y-4">

            {todayBookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-xl p-5 hover:bg-gray-50"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div>
                    <h3 className="text-xl font-bold">
                      {booking.customerName}
                    </h3>

                    <p className="text-gray-600">
                      📞 {booking.phone}
                    </p>

                    <p className="text-gray-600">
                      🎉 {booking.eventType}
                    </p>

                    <p className="text-gray-600">
                      👥 {booking.persons} Persons
                    </p>

                    <p className="text-gray-600">
                      📍 {booking.address}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                    <p className="text-sm text-gray-500">
                      Menu: {booking.menuItems?.length || 0} Items
                    </p>

                  </div>

                </div>

                {/* Menu */}
                {booking.menuItems?.length > 0 && (
                  <div className="mt-4 border-t pt-4">

                    <h4 className="font-semibold mb-2">
                      Selected Menu
                    </h4>

                    <div className="flex flex-wrap gap-2">

                      {booking.menuItems.map((menu) => (
                        <span
                          key={menu._id}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                        >
                          {menu.dishName}
                        </span>
                      ))}

                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Booking Summary */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <p className="text-gray-600">
            Pending Bookings
          </p>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {pendingBookings.length}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-gray-600">
            Confirmed Bookings
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {confirmedBookings.length}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="text-gray-600">
            Today's Events
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {todayBookings.length}
          </p>
        </div>

      </div>

    </div>
  );
}