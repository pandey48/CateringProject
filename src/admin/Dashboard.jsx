"use client";

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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Overview
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
              Dashboard
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            {todayBookings.length} events today
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${card.color} rounded-2xl p-4 text-white shadow-lg shadow-slate-200/60 ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5 sm:p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/85">{card.title}</p>
                  <p className="mt-3 text-3xl font-bold leading-none">{card.value}</p>
                </div>

                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Work */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Today's Work
            </h2>

            <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700">
              {todayBookings.length} Events
            </span>
          </div>

          {todayBookings.length === 0 ? (
            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-slate-500">
              <Calendar size={40} className="mb-3 text-slate-400" />
              <p className="text-lg font-medium">No events scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayBookings.map((booking) => (
                <article
                  key={booking._id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-shadow duration-200 hover:shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-800">
                        {booking.customerName}
                      </h3>

                      <div className="space-y-1 text-sm text-slate-600 sm:text-base">
                        <p>📞 {booking.phone}</p>
                        <p>🎉 {booking.eventType}</p>
                        <p>👥 {booking.persons} Persons</p>
                        <p>📍 {booking.address}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>

                      <p className="text-sm text-slate-500">
                        Menu: {booking.menuItems?.length || 0} items
                      </p>
                    </div>
                  </div>

                  {booking.menuItems?.length > 0 && (
                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">
                        Selected Menu
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {booking.menuItems.map((menu) => (
                          <span
                            key={menu._id}
                            className="rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700"
                          >
                            {menu.dishName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Booking Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Pending Bookings</p>
            <p className="mt-3 text-3xl font-bold text-yellow-600">{pendingBookings.length}</p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Confirmed Bookings</p>
            <p className="mt-3 text-3xl font-bold text-green-600">{confirmedBookings.length}</p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Today's Events</p>
            <p className="mt-3 text-3xl font-bold text-blue-600">{todayBookings.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
