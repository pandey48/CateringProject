
"use client";

import React from "react";
import Pnavbar from "./Pnavbar";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Services from "./Services";
import ServicesSection from "./ServicesSection";
import Gallery from "./Gailery";
import Statss from "./Statss";
import About from "./About";
import Contact from "./Conatact";
import Footer from "./Footer";
import LeadForm from "../components/LeadForm";
import CateringCarousel from "../components/CateringCarousel";
import CoreServices from "../components/CoreServices";
import HomeHighlights from "../components/HomeHighlights";
import HowItWorks from "../components/HowItWorks";
import FinalCTA from "../components/FinalCTA";
import HeroBenefits from "../components/HeroBenefits";
import ServicesPage from "./ServicesPage";
import LocalCateringSEO from "../components/LocalCateringSEO";

function Home() {
  const handleConsultationSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Hello Pandey Catering, I would like a free catering consultation.",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Event type: ${formData.get("eventType")}`,
    ].join("\n");

    window.open(
      `https://wa.me/917389368597?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="max-w-full bg-[#fffaf5] text-slate-800">
      <Pnavbar />
      <Hero />

      <section className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-orange-100 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(234,88,12,0.35)] sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1.5fr] lg:items-center">
            <div className="space-y-3">
              <p className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
                Catering Consultation
              </p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Get Free Catering Consultation
              </h2>
              <p className="text-base leading-7 text-slate-600 sm:text-lg">
                We&apos;ll call you back within 15 minutes.
              </p>
            </div>

            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleConsultationSubmit}>
              <label className="block text-left sm:col-span-1">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Your Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                />
              </label>

              <label className="block text-left sm:col-span-1">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                />
              </label>

              <label className="block text-left sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Event Type</span>
                <select
                  name="eventType"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100"
                >
                  <option value="">Select event type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Family Function">Family Function</option>
                  <option value="Religious Function">Religious Function</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <button
                type="submit"
                className="sm:col-span-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-amber-600"
              >
                🍽️ Get Free Consultation
              </button>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2">🔒 100% Private</span>
                <span className="inline-flex items-center gap-2">⚡ Instant Callback</span>
                <span className="inline-flex items-center gap-2">✅ No Obligation</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="home-feature-sequence">
        <HeroBenefits />
        <CoreServices />
      <CateringCarousel />
      <HomeHighlights />
        <WhyChooseUs />
       
      </div>
    <ServicesPage embedded />
      <LocalCateringSEO />
      <HowItWorks />
      {/* <Services /> */}
      <ServicesSection />
      <LeadForm />
      <Gallery />
      <Statss />
      <About />
      <Contact />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default React.memo(Home);
