"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import API_URL from "../config";

export default function Booking() {
  const [booking, setBooking] = useState({
    customerName: "",
    phone: "",
    eventDate: "",
    eventType: "",
    persons: "",
    address: "",
  });
  const [showMenus, setShowMenus] = useState(false);
  

const [menus, setMenus] = useState([]);
const [selectedMenus, setSelectedMenus] = useState([]);
const [submitState, setSubmitState] = useState({ type: "", message: "" });
useEffect(() => {
  if (!API_URL) return;

  fetch(`${API_URL}/api/menu`)
    .then((res) => res.json())
    .then((data) => setMenus(data))
    .catch((err) => console.error(err));
}, []);

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState({ type: "", message: "" });

    if (!API_URL) {
      setSubmitState({ type: "error", message: "Booking service is not configured." });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  ...booking,
  menuItems: selectedMenus,
}),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitState({ type: "success", message: "Booking created successfully. Our team will contact you soon." });

        setBooking({
          customerName: "",
          phone: "",
          eventDate: "",
          eventType: "",
          persons: "",
          address: "",
        });
        setSelectedMenus([]);
        setShowMenus(false);
      } else {
        setSubmitState({ type: "error", message: data.message || "Booking could not be created." });
      }
    } catch (error) {
      console.error(error);
      setSubmitState({ type: "error", message: "Server connection failed. Please try again." });
    }
  };

  return (
<main
  className="relative min-h-screen overflow-hidden bg-cover bg-center px-4 py-20 sm:px-6"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1555244162-803834f70033?w=1600')",
  }}
>
      <div className="animate-rise-in relative mx-auto w-full max-w-5xl rounded-4xl border border-white/20 bg-slate-950/70 p-5 text-white shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">

        <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">Reserve your date</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Plan Your Perfect Event
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-300">Tell us the essentials and we&apos;ll help shape the right experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200 md:col-span-2">Event details</h3>

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={booking.customerName}
            onChange={handleChange}
            className="rounded-xl border border-white/15 bg-white/10 p-3 text-white outline-none placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={booking.phone}
            onChange={handleChange}
            className="rounded-xl border border-white/15 bg-white/10 p-3 text-white outline-none placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
            required
          />

          <input
            type="date"
            name="eventDate"
            value={booking.eventDate}
            onChange={handleChange}
            className="rounded-xl border border-white/15 bg-white/10 p-3 text-white outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
            required
          />

          <select
            name="eventType"
            value={booking.eventType}
            onChange={handleChange}
            className="rounded-xl border border-white/15 bg-white/10 p-3 text-white outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
            required
          >
            <option className="text-slate-900" value="">Select Event</option>
            <option className="text-slate-900">Wedding</option>
            <option className="text-slate-900">Birthday</option>
            <option className="text-slate-900">Reception</option>
            <option className="text-slate-900">Engagement</option>
            <option className="text-slate-900">Corporate</option>
            <option className="text-slate-900">House Party</option>
          </select>

          <input
            type="number"
            name="persons"
            placeholder="Number of Persons"
            value={booking.persons}
            onChange={handleChange}
            className="rounded-xl border border-white/15 bg-white/10 p-3 text-white outline-none placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
            required
          />

          <textarea
            name="address"
            placeholder="Event Address"
            value={booking.address}
            onChange={handleChange}
            className="h-28 rounded-xl border border-white/15 bg-white/10 p-3 text-white outline-none placeholder:text-slate-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 md:col-span-2"
            required
          />
<div className="md:col-span-2">
  <button
    type="button"
    onClick={() => setShowMenus(!showMenus)}
    className="flex w-full items-center justify-between rounded-xl border border-orange-300/30 bg-orange-500/20 p-3 text-left transition hover:bg-orange-500/30"
  >
    <span>
      {selectedMenus.length > 0
        ? `${selectedMenus.length} Menu Selected`
        : "Select Menu"}
    </span>

    <span>{showMenus ? "▲" : "▼"}</span>
  </button>

  {showMenus && (
    <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/10 p-4 shadow-md sm:grid-cols-3 md:grid-cols-6">
      {menus.map((menu) => (
        <label
          key={menu._id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-3 transition hover:bg-white/10"
        >
          <input
            type="checkbox"
            value={menu._id}
            checked={selectedMenus.includes(menu._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedMenus([
                  ...selectedMenus,
                  menu._id,
                ]);
              } else {
                setSelectedMenus(
                  selectedMenus.filter(
                    (id) => id !== menu._id
                  )
                );
              }
            }}
            className="h-4 w-4 accent-orange-500"
          />

          <span className="text-sm font-medium">
            {menu.dishName}
          </span>
        </label>
      ))}
    </div>
  )}
</div>

          <button
            type="submit"
            className="animate-soft-pulse rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 active:scale-[0.99] md:col-span-2"
          >
            Book Now
          </button>
          {submitState.message && (
            <p
              role="status"
              className={`text-center text-sm font-semibold md:col-span-2 ${submitState.type === "success" ? "text-emerald-300" : "text-red-300"}`}
            >
              {submitState.message}
            </p>
          )}
          <div className="flex justify-center gap-5 text-sm font-semibold text-slate-300 md:col-span-2">
            <Link className="transition hover:text-orange-300" href="/">Back to home</Link>
            <Link className="transition hover:text-orange-300" href="/login">Admin login</Link>
          </div>

        


        </form>
        
      </div>
    </main>
  );
}