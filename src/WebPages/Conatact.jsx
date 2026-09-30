"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { useState } from "react";
import API_URL from "../config";

export default function Contact() {
  const [submitState, setSubmitState] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ type: "", message: "" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "contact-form" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send your message.");
      form.reset();
      setSubmitState({ type: "success", message: "Thanks! Your message has been sent." });
    } catch (error) {
      setSubmitState({ type: "error", message: error.message || "Server connection failed. Please try again." });
    }
  };

  const contactItems = [
    { icon: Phone, title: "Phone", value: "+91 73893 68597" },
    { icon: Mail, title: "Email", value: "pandeycatering@gmail.com" },
    { icon: MapPin, title: "Address", value: "Address available on request" },
    { icon: Clock, title: "Working Hours", value: "Available for event enquiries" },
  ];

  return (
    <section id="contact" className="bg-slate-100 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Contact us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Let&apos;s plan your next event
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Get in touch with us for weddings, birthdays, corporate events and catering bookings.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactItems.map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-md shadow-slate-200/70 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">{value}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <a href="tel:+917389368597" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#173332] px-4 text-sm font-bold text-white transition hover:bg-[#bd861a]"><Phone size={17} />Call Now</a>
              <a href="https://wa.me/917389368597" target="_blank" rel="noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#f2eee5] px-4 text-sm font-bold text-[#173332] transition hover:bg-[#e9dfca]">WhatsApp Us</a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200/80 sm:p-8"
          >
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Message"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-4 py-4 text-base font-semibold text-white transition hover:bg-orange-600"
              >
                Send Message
              </button>
              {submitState.message && (
                <p role="status" className={`text-center text-sm font-semibold ${submitState.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                  {submitState.message}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
