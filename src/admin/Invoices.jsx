import { useEffect, useState } from "react";
import {
  FileText,
  Trash2,
  MessageCircle,
  Plus,
  X,
  Save,
  Search,
} from "lucide-react";

import API_URL from "../config";

export default function Invoices() {
  const [bookings, setBookings] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [totalAmount, setTotalAmount] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/bookings`);

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();

      setBookings(data);
    } catch (error) {
      console.error("Bookings error:", error);
    }
  };

  // =====================================================
  // FETCH INVOICES
  // =====================================================

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/invoices`);

      if (!res.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const data = await res.json();

      setInvoices(data);
    } catch (error) {
      console.error("Invoices error:", error);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchBookings();
    fetchInvoices();
  }, []);

  // =====================================================
  // GENERATE INVOICE
  // =====================================================

  const generateInvoice = async () => {
    if (!selectedBooking) {
      alert("Please select a booking first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/invoices/${selectedBooking}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invoice generation failed");
        return;
      }

      alert("Invoice generated successfully");

      setSelectedBooking("");

      await fetchInvoices();
    } catch (error) {
      console.error("Generate invoice error:", error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // OPEN PAYMENT MODAL
  // =====================================================

  const openPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);

    setTotalAmount(invoice.totalAmount || "");

    setAdvanceAmount(invoice.advanceAmount || "");
  };

  // =====================================================
  // UPDATE PAYMENT
  // =====================================================

  const updatePayment = async () => {
    if (!selectedInvoice) return;

    const total = Number(totalAmount) || 0;

    const advance = Number(advanceAmount) || 0;

    if (total <= 0) {
      alert("Please enter total amount");
      return;
    }

    if (advance < 0) {
      alert("Advance cannot be negative");
      return;
    }

    if (advance > total) {
      alert("Advance cannot be greater than total amount");
      return;
    }

    try {
      setSavingPayment(true);

      const res = await fetch(
        `${API_URL}/api/invoices/${selectedInvoice._id}/payment`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            totalAmount: total,
            advanceAmount: advance,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment update failed");
        return;
      }

      alert("Payment updated successfully");

      setSelectedInvoice(null);

      await fetchInvoices();
    } catch (error) {
      console.error("Payment error:", error);

      alert("Something went wrong");
    } finally {
      setSavingPayment(false);
    }
  };

  // =====================================================
  // DELETE INVOICE
  // =====================================================

  const deleteInvoice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this invoice?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/invoices/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invoice delete failed");
        return;
      }

      alert("Invoice deleted successfully");

      fetchInvoices();
    } catch (error) {
      console.error("Delete invoice error:", error);

      alert("Something went wrong");
    }
  };

  // =====================================================
  // WHATSAPP
  // =====================================================

  const sendWhatsApp = (invoice) => {
    if (!invoice.phone) {
      alert("Customer phone number not available");
      return;
    }

    let phone = invoice.phone.replace(/\D/g, "");

    // India number
    if (phone.length === 10) {
      phone = "91" + phone;
    }

    const eventDate = invoice.eventDate
      ? new Date(invoice.eventDate).toLocaleDateString("en-GB")
      : "-";

    const menuText =
      invoice.menuItems?.length > 0
        ? invoice.menuItems
            .map((item, index) => `${index + 1}. ${item}`)
            .join("\n")
        : "No menu selected";

    const message = `
🍽️ *PANDEY CATERING*

📄 *Invoice:* ${invoice.invoiceNo}

👤 *Customer:* ${invoice.customerName}

📞 *Phone:* ${invoice.phone}

🎉 *Event:* ${invoice.eventType || "-"}

📅 *Event Date:* ${eventDate}

👥 *Guests:* ${invoice.persons || "-"}

📍 *Address:* ${invoice.address || "-"}

🍽️ *Selected Menu:*
${menuText}

💰 *Payment Details*

Total Amount: ₹${invoice.totalAmount || 0}

Advance Paid: ₹${invoice.advanceAmount || 0}

Remaining: ₹${invoice.balanceAmount || 0}

Payment Status: ${invoice.paymentStatus}

Thank you for choosing *Pandey Catering* ❤️

We look forward to serving you.
`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredInvoices = invoices.filter((invoice) => {
    const text = search.toLowerCase();

    return (
      invoice.invoiceNo?.toLowerCase().includes(text) ||
      invoice.customerName?.toLowerCase().includes(text) ||
      invoice.phone?.toLowerCase().includes(text)
    );
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Invoice Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create invoices, manage payments and send invoice details on WhatsApp.
        </p>
      </div>


      {/* GENERATE INVOICE */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <Plus size={20} />
          </div>

          <h2 className="text-lg font-bold text-slate-800">
            Generate New Invoice
          </h2>

        </div>

        <div className="flex flex-col gap-3 lg:flex-row">

          <select
            value={selectedBooking}
            onChange={(e) => setSelectedBooking(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"
          >

            <option value="">
              Select Booking
            </option>

            {bookings.map((booking) => (
              <option
                key={booking._id}
                value={booking._id}
              >
                {booking.customerName} —{" "}
                {booking.eventType} —{" "}
                {booking.persons} Persons
              </option>
            ))}

          </select>

          <button
            onClick={generateInvoice}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >

            <FileText size={18} />

            {loading ? "Generating..." : "Generate Invoice"}

          </button>

        </div>

      </div>


      {/* SEARCH */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search invoice, customer or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
          />

        </div>

      </div>


      {/* INVOICE TABLE */}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

        <table className="min-w-[1100px] w-full text-left">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4">
                Invoice
              </th>

              <th className="p-4">
                Customer
              </th>

              <th className="p-4">
                Event
              </th>

              <th className="p-4">
                Persons
              </th>

              <th className="p-4">
                Menu
              </th>

              <th className="p-4">
                Total
              </th>

              <th className="p-4">
                Advance
              </th>

              <th className="p-4">
                Remaining
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredInvoices.length === 0 ? (

              <tr>

                <td
                  colSpan="10"
                  className="p-10 text-center text-slate-500"
                >
                  No invoices found.
                </td>

              </tr>

            ) : (

              filteredInvoices.map((invoice) => (

                <tr
                  key={invoice._id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold text-blue-600">
                    {invoice.invoiceNo}
                  </td>


                  <td className="p-4">

                    <div className="font-semibold text-slate-800">
                      {invoice.customerName}
                    </div>

                    <div className="text-sm text-slate-500">
                      {invoice.phone}
                    </div>

                  </td>


                  <td className="p-4 text-slate-600">
                    {invoice.eventType || "-"}
                  </td>


                  <td className="p-4 text-slate-600">
                    {invoice.persons || "-"}
                  </td>


                  {/* MENU */}

                  <td className="p-4">

                    <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">

                      {invoice.menuItems?.length || 0} items

                    </span>

                  </td>


                  <td className="p-4 font-semibold">
                    ₹{invoice.totalAmount || 0}
                  </td>


                  <td className="p-4 text-green-600 font-semibold">
                    ₹{invoice.advanceAmount || 0}
                  </td>


                  <td className="p-4 text-red-600 font-semibold">
                    ₹{invoice.balanceAmount || 0}
                  </td>


                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        invoice.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : invoice.paymentStatus === "Partial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {invoice.paymentStatus}
                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td className="p-4">

                    <div className="flex gap-2">

                      {/* PAYMENT */}

                      <button
                        onClick={() => openPaymentModal(invoice)}
                        title="Payment"
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                      >
                        <Save size={18} />
                      </button>


                      {/* WHATSAPP */}

                      <button
                        onClick={() => sendWhatsApp(invoice)}
                        title="Send WhatsApp"
                        className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200"
                      >
                        <MessageCircle size={18} />
                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() => deleteInvoice(invoice._id)}
                        title="Delete Invoice"
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* PAYMENT MODAL */}

      {selectedInvoice && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b p-5">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Payment Details
                </h2>

                <p className="text-sm text-slate-500">
                  {selectedInvoice.invoiceNo}
                </p>

              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X />
              </button>

            </div>


            {/* BODY */}

            <div className="space-y-5 p-5">

              <div>

                <p className="text-sm text-slate-500">
                  Customer
                </p>

                <p className="font-semibold">
                  {selectedInvoice.customerName}
                </p>

              </div>


              {/* TOTAL */}

              <div>

                <label className="mb-1 block text-sm font-semibold">
                  Total Amount
                </label>

                <input
                  type="number"
                  min="0"
                  value={totalAmount}
                  onChange={(e) =>
                    setTotalAmount(e.target.value)
                  }
                  placeholder="Enter total amount"
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                />

              </div>


              {/* ADVANCE */}

              <div>

                <label className="mb-1 block text-sm font-semibold">
                  Advance Payment
                </label>

                <input
                  type="number"
                  min="0"
                  value={advanceAmount}
                  onChange={(e) =>
                    setAdvanceAmount(e.target.value)
                  }
                  placeholder="Enter advance amount"
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500"
                />

              </div>


              {/* BALANCE PREVIEW */}

              <div className="rounded-xl bg-slate-100 p-4">

                <div className="flex justify-between">

                  <span className="text-slate-600">
                    Total
                  </span>

                  <span className="font-bold">
                    ₹{Number(totalAmount) || 0}
                  </span>

                </div>


                <div className="mt-2 flex justify-between">

                  <span className="text-slate-600">
                    Advance
                  </span>

                  <span className="font-bold text-green-600">
                    ₹{Number(advanceAmount) || 0}
                  </span>

                </div>


                <div className="mt-3 flex justify-between border-t pt-3">

                  <span className="font-bold">
                    Remaining
                  </span>

                  <span className="font-bold text-red-600">
                    ₹
                    {Math.max(
                      0,
                      (Number(totalAmount) || 0) -
                        (Number(advanceAmount) || 0)
                    )}
                  </span>

                </div>

              </div>


              {/* SAVE */}

              <button
                onClick={updatePayment}
                disabled={savingPayment}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >

                <Save size={18} />

                {savingPayment
                  ? "Saving..."
                  : "Save Payment"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}