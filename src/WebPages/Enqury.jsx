"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, UsersRound } from "lucide-react";
import Pnavbar from "./Pnavbar";

const initialForm = { name: "", eventDate: "", guestCount: "" };
const inputClass = "mt-1.5 h-12 w-full rounded-xl border border-[#e4ddcf] bg-white px-3.5 text-sm font-normal text-[#243b38] outline-none transition placeholder:text-slate-400 focus:border-[#bd861a] focus:ring-4 focus:ring-amber-100/70";

export default function Enqury() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = [
      "Hello Pandey Catering & Event Services, I would like to enquire about an event.",
      `Name: ${form.name.trim()}`,
      `Event date: ${form.eventDate}`,
      `Number of guests: ${form.guestCount}`,
    ].join("\n");

    window.open(`https://wa.me/917389368597?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <>
      <Pnavbar showQuickActions={false} />
      <main className="min-h-screen bg-[#fbf8f2] px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-[1.5rem] border border-[#e9dfcf] bg-white shadow-[0_16px_48px_rgba(32,47,40,.09)]">
          <header className="bg-[#173332] px-5 py-7 text-white sm:px-8 sm:py-9">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f0c766]">Pandey Catering &amp; Event Services</p>
            <h1 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">Tell Us About Your Event</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">Share a few details and continue to WhatsApp. Our team will get in touch to help plan your event.</p>
          </header>

          <form onSubmit={handleSubmit} className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
            <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Your name" />
            <Field label="Event Date *" name="eventDate" value={form.eventDate} onChange={handleChange} required type="date" min={new Date().toISOString().slice(0, 10)} />
            <Field label="Number of Guests *" name="guestCount" value={form.guestCount} onChange={handleChange} required type="number" min="1" max="100000" placeholder="e.g. 300" />

            <div className="sm:col-span-2">
              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#bd861a] px-6 py-3 font-bold text-white transition hover:bg-[#a87512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173332]">
                Continue to WhatsApp <ArrowRight size={18} />
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">Your details will be prepared for WhatsApp number 73893 68597. Tap Send in WhatsApp to share your enquiry.</p>
              {submitted && <div role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-800">
                <CheckCircle2 size={20} className="mx-auto mb-1" />
                <p>Thanks for your enquiry! Send the WhatsApp message and our team will connect with you shortly.</p>
              </div>}
            </div>
          </form>

          <div className="flex items-center justify-center gap-2 border-t border-[#eee8dd] bg-[#fffdf9] px-5 py-4 text-xs text-slate-500"><CalendarDays size={15} className="text-[#a87716]" />Event date <span aria-hidden="true">·</span><UsersRound size={15} className="text-[#a87716]" />Guest count</div>
        </section>
      </main>
    </>
  );
}

function Field({ label, ...props }) {
  return <label className="block min-w-0 text-sm font-semibold text-[#344a46]">{label}<input className={inputClass} {...props} /></label>;
}
