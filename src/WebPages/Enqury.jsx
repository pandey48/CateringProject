"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import API_URL from "../config";
import Pnavbar from "./Pnavbar";

const initialForm = {
  name: "", email: "", phone: "", serviceRequired: "", eventDate: "", eventTime: "",
  guestCount: "", location: "", budget: "", message: "",
};

const serviceOptions = [
  "Professional Cook", "Catering Service", "Waiter / Service Staff", "Fast Food Stall",
  "Sweet & Dessert Counter", "Live Food Counter", "Tent & Canopy", "Decoration",
  "Stage Decoration", "DJ & Music", "Sound System", "Lighting", "Camera & Photography",
  "Video / Videography", "Car / Vehicle", "Furniture", "Generator / Power Backup",
  "Complete Event Management", "Other",
];

const inputClass = "mt-1.5 h-11 w-full rounded-xl border border-[#e4ddcf] bg-white px-3.5 text-sm font-normal text-[#243b38] outline-none transition placeholder:text-slate-400 focus:border-[#bd861a] focus:ring-4 focus:ring-amber-100/70";

export default function Enqury() {
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState({ type: "", message: "", enquiryNumber: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSubmitState({ type: "", message: "", enquiryNumber: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ type: "", message: "", enquiryNumber: "" });
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setSubmitState({ type: "error", message: "Enter a valid mobile number with 10 to 15 digits." });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
          serviceName: form.serviceRequired, service: form.serviceRequired, eventType: form.serviceRequired,
          eventDate: form.eventDate, eventTime: form.eventTime, guestCount: form.guestCount,
          location: form.location.trim(), budget: form.budget, message: form.message.trim(), source: "enquiry-page",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send your enquiry.");
      setForm(initialForm);
      setSubmitState({ type: "success", message: "Enquiry submitted successfully. Our team will contact you shortly.", enquiryNumber: data.enquiryNumber });
    } catch (error) {
      setSubmitState({ type: "error", message: error.message || "Server connection failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Pnavbar showQuickActions={false} />
      <main className="min-h-screen bg-[#fbf8f2] px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
        <section className="mx-auto max-w-3xl rounded-[1.5rem] border border-[#e9dfcf] bg-white p-5 shadow-[0_16px_48px_rgba(32,47,40,.09)] sm:p-8 lg:p-10">
          <header className="mb-6 border-b border-[#eee8dd] pb-5 sm:mb-7">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a87716]">Pandey Event Management</p>
            <h1 className="mt-1.5 font-serif text-2xl font-bold text-[#173332] sm:text-3xl">Enquiry Form</h1>
          </header>

          <form onSubmit={handleSubmit} className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
            <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Your name" />
            <Field label="Mobile Number *" name="phone" value={form.phone} onChange={handleChange} required type="tel" autoComplete="tel" placeholder="10-digit mobile number" />
            <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" autoComplete="email" placeholder="you@example.com" />
            <label className="block min-w-0 text-sm font-semibold text-[#344a46]">Service Required *<select name="serviceRequired" value={form.serviceRequired} onChange={handleChange} required className={inputClass}><option value="">Choose a service</option>{serviceOptions.map((service) => <option key={service}>{service}</option>)}</select></label>
            <Field label="Event Date *" name="eventDate" value={form.eventDate} onChange={handleChange} required type="date" min={new Date().toISOString().slice(0, 10)} />
            <Field label="Preferred Time" name="eventTime" value={form.eventTime} onChange={handleChange} type="time" />
            <Field label="Number of Guests" name="guestCount" value={form.guestCount} onChange={handleChange} type="number" min="1" max="100000" placeholder="e.g. 300" />
            <Field label="Event Location *" name="location" value={form.location} onChange={handleChange} required autoComplete="street-address" placeholder="City or venue address" />
            <label className="block min-w-0 text-sm font-semibold text-[#344a46]">Budget Range<select name="budget" value={form.budget} onChange={handleChange} className={inputClass}><option value="">Select a range</option><option>Under ₹50,000</option><option>₹50,000–₹1,00,000</option><option>₹1,00,000–₹3,00,000</option><option>₹3,00,000–₹5,00,000</option><option>₹5,00,000+</option><option>Need guidance</option></select></label>
            <label className="block text-sm font-semibold text-[#344a46] sm:col-span-2">Additional Requirements<textarea name="message" value={form.message} onChange={handleChange} rows={3} maxLength={5000} placeholder="Share any other event details" className="mt-1.5 min-h-20 w-full resize-y rounded-xl border border-[#e4ddcf] bg-white px-3.5 py-3 text-sm font-normal text-[#243b38] outline-none transition placeholder:text-slate-400 focus:border-[#bd861a] focus:ring-4 focus:ring-amber-100/70" /></label>

            <div className="sm:col-span-2">
              <button disabled={submitting} type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#bd861a] px-6 py-3 font-bold text-white shadow-md shadow-amber-900/15 transition hover:bg-[#a87512] disabled:cursor-wait disabled:opacity-60">{submitting ? "Sending enquiry…" : "Submit Enquiry"}<ArrowRight size={18} /></button>
              {submitState.message && <div role="status" className={`mt-4 rounded-xl border p-3 text-center text-sm font-semibold ${submitState.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}>
                {submitState.type === "success" && <CheckCircle2 size={18} className="mx-auto mb-1" />}
                <p>{submitState.message}</p>{submitState.enquiryNumber && <p className="mt-1 font-mono text-xs">Enquiry ID: {submitState.enquiryNumber}</p>}
              </div>}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

function Field({ label, ...props }) {
  return <label className="block min-w-0 text-sm font-semibold text-[#344a46]">{label}<input className={inputClass} {...props} /></label>;
}
