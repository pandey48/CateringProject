"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import API_URL from "../config";
import CitySelector from "./CitySelector";
import { eventTypes, services } from "../data/eventData";

const initialLead = {
  city: "",
  eventType: "",
  service: "",
  eventDate: "",
  guestCount: "",
  name: "",
  phone: "",
};

export default function LeadForm() {
  const [lead, setLead] = useState(initialLead);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setLead((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...lead,
      source: "homepage-quote",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("pandey-enquiry-lead", JSON.stringify(payload));

    try {
      if (API_URL) {
        await fetch(`${API_URL}/api/enquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch (error) {
      console.error("Quote request could not be sent:", error);
    }

    setSubmitted(true);
    setLead(initialLead);
  };

  return (
    <section id="quote" className="bg-[#fffaf5] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
            <MapPin size={14} />
            Plan with confidence
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Complete Event Services in One Place
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Tell us what you are planning and our team will help you build the right event experience near you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-xl shadow-orange-100/60 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <CitySelector value={lead.city} onChange={handleChange} required />

            <label className="block text-left">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Event Type</span>
              <select name="eventType" value={lead.eventType} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100">
                <option value="">Select Event Type</option>
                {eventTypes.map((eventType) => <option key={eventType}>{eventType}</option>)}
              </select>
            </label>

            <label className="block text-left">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Service</span>
              <select name="service" value={lead.service} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100">
                <option value="">Select Service</option>
                {services.map((service) => <option key={service}>{service}</option>)}
              </select>
            </label>

            <label className="block text-left">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Event Date</span>
              <input type="date" name="eventDate" value={lead.eventDate} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </label>

            <label className="block text-left">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Guest Count</span>
              <input type="number" min="1" name="guestCount" value={lead.guestCount} onChange={handleChange} placeholder="Number of guests" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </label>

            <label className="block text-left">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Your Name</span>
              <input type="text" name="name" value={lead.name} onChange={handleChange} placeholder="Your name" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </label>

            <label className="block text-left sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</span>
              <input type="tel" name="phone" value={lead.phone} onChange={handleChange} placeholder="Best number to reach you" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </label>
          </div>

          <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30">
            Get Free Quote <ArrowRight size={18} />
          </button>

          {submitted && (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600" role="status">
              <CheckCircle2 size={18} /> Your enquiry has been received.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
