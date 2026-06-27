import { useState } from "react";

export default function Booking() {
  const [booking, setBooking] = useState({
    customerName: "",
    phone: "",
    eventDate: "",
    eventType: "",
    persons: "",
    address: "",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Booking Created Successfully ✅");

        setBooking({
          customerName: "",
          phone: "",
          eventDate: "",
          eventType: "",
          persons: "",
          address: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          Catering Booking Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={booking.customerName}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={booking.phone}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="date"
            name="eventDate"
            value={booking.eventDate}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="eventType"
            value={booking.eventType}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Event</option>
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Reception</option>
            <option>Engagement</option>
            <option>Corporate</option>
            <option>House Party</option>
          </select>

          <input
            type="number"
            name="persons"
            placeholder="Number of Persons"
            value={booking.persons}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="address"
            placeholder="Event Address"
            value={booking.address}
            onChange={handleChange}
            className="border rounded-lg p-3 md:col-span-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Book Now
          </button>

        </form>
      </div>
    </div>
  );
}