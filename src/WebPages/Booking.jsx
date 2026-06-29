import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  

const [menus, setMenus] = useState([]);
const [selectedMenus, setSelectedMenus] = useState([]);
useEffect(() => {
  fetch("https://pandey-catering-api.onrender.com/api/menu")
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
<div
  className="min-h-screen bg-cover bg-center py-20 px-4"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1555244162-803834f70033?w=1600')",
  }}
>
      <div className="max-w-5xl mx-auto
bg-white/10
backdrop-blur-xl
border border-white/20
shadow-2xl
rounded-3xl
p-8
text-white">

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
          <div className="md:col-span-2">
  <h3 className="text-lg font-semibold mb-3">
    Select Menu
  </h3>

  <div className="grid grid-cols-2 gap-3">

    {menus.map((menu) => (

      <label
        key={menu._id}
        className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100"
      >

        <input
          type="checkbox"
          value={menu._id}
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
        />

        {menu.dishName}

      </label>

    ))}

  </div>
</div>

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Book Now
          </button>
          <Link to="/"> back</Link>
          <Link to="/login"> login admin</Link>

        


        </form>
        
      </div>
    </div>
  );
}