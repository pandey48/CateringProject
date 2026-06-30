import { useEffect, useState } from "react";
import { generatePurchasePDF } from "../utils/generatePurchasePDF";
import API_URL from "../config";


export default function MaterialCalculator() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [material, setMaterial] = useState([]);
  const [booking, setBooking] = useState(null);
  const [summary, setSummary] = useState([]);
  const groupedSummary = summary.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }

  acc[item.category].push(item);

  return acc;
}, {});
  

  useEffect(() => {
    fetch(`${API_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const calculateMaterial = async () => {
    if (!selectedBooking) {
      alert("Please select booking");
      return;
    }
    

    const res = await fetch(
      `${API_URL}/api/material/${selectedBooking}`
    );

    const data = await res.json();
    console.log(data);

    setBooking(data.booking);
    setMaterial(data.material);
    setSummary(data.summary);
  };
  const sendWhatsApp = () => {
  if (!booking || summary.length === 0) {
    alert("Please calculate material first.");
    return;
  }

  const phone = booking.phone.replace(/\D/g, "");

  // Category wise group
  const grouped = summary.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  let materialText = "";

  Object.keys(grouped).forEach((category) => {

    const categoryName =
      category === "Vegetable"
        ? "🥬 सब्जी"
        : category === "Grocery"
        ? "🛒 किराना"
        : category === "Dairy"
        ? "🥛 डेयरी"
        : category === "Spices"
        ? "🌶️ मसाले"
        : category === "Dry Fruits"
        ? "🥜 ड्राई फ्रूट"
        : "📦 अन्य";

    materialText += `\n${categoryName}\n`;

    grouped[category].forEach((item) => {
      materialText += `• ${item.ingredient} - ${item.quantity.toFixed(
        2
      )} ${item.unit}\n`;
    });

    materialText += "\n";
  });

  const message = `📋 *Pandey Caterers*

👤 Customer : ${booking.customerName}
🎉 Event : ${booking.eventType}
👥 Persons : ${booking.persons}

${materialText}

🙏 धन्यवाद`;

  window.open(
    `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

  return (
    <div className="p-8 min-h-screen bg-blue-300">

      <h1 className="text-3xl font-bold mb-8">
        Material Calculator
      </h1>

      <div className="bg-lime-300 p-6 rounded-xl shadow">

        <select
          value={selectedBooking}
          onChange={(e) => setSelectedBooking(e.target.value)}
          className="border p-3 rounded-lg w-full"
        >
          <option value="">Select Booking</option>

          {bookings.map((item) => (
            <option key={item._id} value={item._id}>
              {item.customerName} ({item.persons} Persons)
            </option>
          ))}

        </select>

        <button
          onClick={calculateMaterial}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Calculate Material
        </button>

      </div>

      {booking && (
        <div className="bg-cyan-300 mt-8 rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Customer Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <p>
              <b>Name :</b> {booking.customerName}
            </p>

            <p>
              <b>Phone :</b> {booking.phone}
            </p>

            <p>
              <b>Persons :</b> {booking.persons}
            </p>

            <p>
              <b>Event :</b> {booking.eventType}
            </p>

          </div>

        </div>
      )}

      {material.length > 0 && (

        <div className="bg-amber-500 mt-8 rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4">Dish</th>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit</th>

              </tr>

            </thead>

            <tbody>

              {material.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-4">
                    {item.dish}
                  </td>

                  <td>{item.ingredient}</td>

                  <td>{item.quantity}</td>

                  <td>{item.unit}</td>

                </tr>

              ))}

            </tbody>

          </table>
          <div className="flex gap-4 mt-6">

  <button
    onClick={() => generatePurchasePDF(booking, summary)}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
  >
    📄 Download PDF
  </button>
  <div className="flex gap-4 mt-5">

  <button
    onClick={() => generatePurchasePDF(booking, summary)}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
  >
    📄 Download PDF
  </button>

  <button
    onClick={sendWhatsApp}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
  >
    📱 Share on WhatsApp
  </button>

</div>

  <button
    onClick={() => window.print()}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
  >
    🖨 Print
  </button>

</div>
<div className="bg-white mt-8 rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6">
    Total Purchase Material
  </h2>

  {Object.keys(groupedSummary).map((category) => (

    <div key={category} className="mb-8">

      <h3 className="text-xl font-bold bg-green-600 text-white p-3 rounded">

        {category === "Vegetable" && "🥬 सब्जी"}

        {category === "Grocery" && "🛒 किराना"}

        {category === "Dairy" && "🥛 डेयरी"}

        {category === "Spices" && "🌶️ मसाले"}

        {category === "Dry Fruits" && "🥜 ड्राई फ्रूट"}

        {category === "Other" && "📦 अन्य"}

      </h3>

      <table className="w-full mt-3">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Ingredient
            </th>

            <th>
              Quantity
            </th>

            <th>
              Unit
            </th>

          </tr>

        </thead>

        <tbody>

          {groupedSummary[category].map((item, index) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="p-3">
                {item.ingredient}
              </td>

              <td>
                {item.quantity.toFixed(2)}
              </td>

              <td>
                {item.unit}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  ))}

</div>

        </div>

      )}

    </div>
  );
}