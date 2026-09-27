"use client";

import { useState } from "react";
import API_URL from "../config";
import Link from "next/link";


export default function Enqury() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fffaf5] px-4 py-16 sm:px-6">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="animate-rise-in relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-2xl shadow-orange-100/70 md:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-slate-900 px-6 py-10 text-white sm:px-10 md:flex md:flex-col md:justify-between md:p-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">Start a conversation</span>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Tell us about your next event.</h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300 sm:text-base">Share your details and our team will help you find the right event services.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 text-center text-xs text-slate-300 md:mt-12">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-xl text-orange-300">01</strong>Quick response</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-xl text-orange-300">02</strong>Personal support</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Enquiry form</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Let&apos;s plan something memorable</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[['Name', 'text', name, setName], ['Email', 'email', email, setEmail], ['Phone', 'tel', phone, setPhone], ['Password', 'password', password, setPassword]].map(([label, type, value, setter]) => (
              <label key={label} className="block text-sm font-semibold text-slate-700">
                {label}
                <input type={type} value={value} onChange={(e) => setter(e.target.value)} required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              </label>
            ))}
          </div>

          <button type="submit" className="animate-soft-pulse mt-6 w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-600 active:scale-[0.98]">Send Enquiry</button>
          <Link href="/" className="mt-5 block text-center text-sm font-semibold text-slate-500 transition hover:text-orange-500">Back to home</Link>
        </form>
      </div>
    </main>
  );
}