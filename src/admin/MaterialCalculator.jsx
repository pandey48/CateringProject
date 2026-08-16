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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Material Calculator</h1>
        <p className="mt-1 text-sm text-slate-500">Select a booking and calculate material for the event</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <select
            value={selectedBooking}
            onChange={(e) => setSelectedBooking(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
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
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Calculate Material
          </button>
        </div>
      </div>

      {booking && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Customer Details</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <p className="rounded-xl bg-slate-50 p-3 text-slate-700"><span className="font-semibold">Name:</span> {booking.customerName}</p>
            <p className="rounded-xl bg-slate-50 p-3 text-slate-700"><span className="font-semibold">Phone:</span> {booking.phone}</p>
            <p className="rounded-xl bg-slate-50 p-3 text-slate-700"><span className="font-semibold">Persons:</span> {booking.persons}</p>
            <p className="rounded-xl bg-slate-50 p-3 text-slate-700"><span className="font-semibold">Event:</span> {booking.eventType}</p>
          </div>
        </div>
      )}

      {material.length > 0 && (
        <div className="space-y-6">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-[640px] w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 font-semibold">Dish</th>
                  <th className="p-4 font-semibold">Ingredient</th>
                  <th className="p-4 font-semibold">Quantity</th>
                  <th className="p-4 font-semibold">Unit</th>
                </tr>
              </thead>

              <tbody>
                {material.map((item, index) => (
                  <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-4 text-slate-800">{item.dish}</td>
                    <td className="p-4 text-slate-600">{item.ingredient}</td>
                    <td className="p-4 text-slate-600">{item.quantity}</td>
                    <td className="p-4 text-slate-600">{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => generatePurchasePDF(booking, summary)}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              📄 Download PDF
            </button>

            <button
              onClick={sendWhatsApp}
              className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              📱 Share on WhatsApp
            </button>

            <button
              onClick={() => window.print()}
              className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
            >
              🖨 Print
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-6 text-xl font-bold text-slate-800">Total Purchase Material</h2>

            <div className="space-y-6">
              {Object.keys(groupedSummary).map((category) => (
                <div key={category} className="overflow-hidden rounded-xl border border-slate-200">
                  <h3 className="bg-emerald-600 p-3 text-base font-bold text-white">
                    {category === "Vegetable" && "🥬 सब्जी"}
                    {category === "Grocery" && "🛒 किराना"}
                    {category === "Dairy" && "🥛 डेयरी"}
                    {category === "Spices" && "🌶️ मसाले"}
                    {category === "Dry Fruits" && "🥜 ड्राई फ्रूट"}
                    {category === "Other" && "📦 अन्य"}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="min-w-[420px] w-full text-left">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-3 font-semibold text-slate-700">Ingredient</th>
                          <th className="p-3 font-semibold text-slate-700">Quantity</th>
                          <th className="p-3 font-semibold text-slate-700">Unit</th>
                        </tr>
                      </thead>

                      <tbody>
                        {groupedSummary[category].map((item, index) => (
                          <tr key={index} className="border-b border-slate-200">
                            <td className="p-3 text-slate-700">{item.ingredient}</td>
                            <td className="p-3 text-slate-700">{item.quantity.toFixed(2)}</td>
                            <td className="p-3 text-slate-700">{item.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}