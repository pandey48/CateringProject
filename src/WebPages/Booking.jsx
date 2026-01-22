import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guests: "",
    date: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", form);

    alert("Your booking request has been submitted!");
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto p-10">
      <h2 className="text-4xl font-bold mb-6 text-center text-yellow-600">
        Book Catering Service
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-8 shadow-lg rounded-xl"
      >
        <input
          className="border p-3 rounded"
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="border p-3 rounded"
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          className="border p-3 rounded"
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <select
          className="border p-3 rounded"
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          required
        >
          <option value="">Select Event Type</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Corporate">Corporate Event</option>
          <option value="House Party">House Party</option>
        </select>

        <input
          className="border p-3 rounded"
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={form.guests}
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded"
          type="text"
          name="location"
          placeholder="Event Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <textarea
          className="border p-3 rounded md:col-span-2"
          name="message"
          placeholder="Additional Message / Requirements"
          rows="4"
          value={form.message}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="md:col-span-2 bg-yellow-500 text-white p-3 rounded font-semibold hover:bg-yellow-600 transition"
        >
          Submit Booking
        </button>
      </form>
    </section>
  );
}
