import { useEffect, useState } from "react";

export default function Invoices() {
  const [bookings, setBookings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Invoices
  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/invoices");
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Generate Invoice
  const generateInvoice = async () => {
    if (!selectedBooking) {
      alert("Select Booking First");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/invoices/${selectedBooking}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Invoice Generated Successfully");
        fetchInvoices();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect should come AFTER the functions
  useEffect(() => {
    fetchBookings();
    fetchInvoices();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-blue-300">

      <h1 className="text-3xl font-bold mb-8">
        Invoice Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

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
          onClick={generateInvoice}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Generate Invoice
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>
              <th className="p-4">Invoice</th>
              <th>Customer</th>
              <th>Persons</th>
              <th>Total</th>
              <th>Advance</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {invoices.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4">{item.invoiceNo}</td>

                <td>{item.customerName}</td>

                <td>{item.persons}</td>

                <td>₹ {item.totalAmount}</td>

                <td>₹ {item.advanceAmount}</td>

                <td>₹ {item.balanceAmount}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      item.paymentStatus === "Paid"
                        ? "bg-green-600"
                        : item.paymentStatus === "Partial"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  
  );
}