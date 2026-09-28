"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Camera, CarFront, ChefHat, Check, ChevronDown, CircleCheck, Flower2, Lightbulb, Music2, Search, Send, Sparkles, Speaker, Star, TentTree, Utensils, UsersRound, X } from "lucide-react";
import API_URL from "../config";
import Pnavbar from "./Pnavbar";

const unsplash = (photoId) => `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1000&q=82`;

const services = [
  { id: "professional-cook", name: "Professional Cook", category: "Food & Catering", description: "Experienced cooks for weddings, parties, family functions and large gatherings.", icon: ChefHat, image: unsplash("photo-1577219491135-ce391730fb2c"), details: "Skilled cooks prepare delicious menus for family occasions, weddings and large gatherings, with service tailored to your venue and guest count." },
  { id: "catering-service", name: "Catering Service", category: "Food & Catering", description: "Complete catering for small functions to large events.", icon: Utensils, image: unsplash("photo-1555244162-803834f70033"), details: "Complete catering solutions for weddings, parties, corporate events and family functions, with custom menus and experienced staff." },
  { id: "waiter-service-staff", name: "Waiter / Service Staff", category: "Food & Catering", description: "Professional waiters and serving staff for weddings, parties and events.", icon: UsersRound, image: unsplash("photo-1414235077428-338989a2e8c0"), details: "Courteous service staff to keep food and guest service organized throughout your celebration." },
  { id: "fast-food-stall", name: "Fast Food Stall", category: "Food & Catering", description: "Live chowmein, momos, golgappa, chaat, dosa, pizza, burgers and snacks.", icon: Utensils, image: unsplash("photo-1565299624946-b28f40a0ae38"), details: "Choose popular live counters such as chowmein, momos, golgappa, chaat, dosa, pizza, burgers, pasta and snacks." },
  { id: "sweet-dessert-counter", name: "Sweet & Dessert Counter", category: "Food & Catering", description: "Mithai, sweets, desserts and live sweet counters.", icon: Sparkles, image: unsplash("photo-1488477181946-6428a0291777"), details: "A thoughtfully arranged mithai and dessert counter with options suited to your menu and celebration." },
  { id: "live-food-counter", name: "Live Food Counter", category: "Food & Catering", description: "Fresh food prepared live at your event.", icon: ChefHat, image: unsplash("photo-1555939594-58d7cb561ad1"), details: "Freshly prepared dishes served straight from live counters, planned around your event flow." },
  { id: "tent-canopy", name: "Tent & Canopy", category: "Wedding", description: "Wedding tent, shamiana, canopy and complete tent setup.", icon: TentTree, image: unsplash("photo-1519167758481-83f550bb49b3"), details: "Tent, shamiana and canopy arrangements planned to suit your venue, guest count and event style." },
  { id: "decoration", name: "Decoration", category: "Decoration", description: "Wedding, birthday, engagement and event decoration.", icon: Flower2, image: unsplash("photo-1519741497674-611481863552"), details: "Event decoration for weddings, birthdays, engagements and family celebrations." },
  { id: "stage-decoration", name: "Stage Decoration", category: "Decoration", description: "Stage, backdrop, floral decoration and lighting setup.", icon: Sparkles, image: unsplash("photo-1507504031003-b417219a0fde"), details: "A coordinated stage, backdrop, floral and lighting setup designed around your occasion." },
  { id: "dj-music", name: "DJ & Music", category: "Entertainment", description: "DJ, music system and entertainment for your celebration.", icon: Music2, image: unsplash("photo-1470229722913-7c0e2dbbafd3"), details: "Music and DJ setup for weddings, parties and social events." },
  { id: "wedding-dj", name: "Wedding DJ", category: "Entertainment", description: "A lively DJ setup for wedding ceremonies, sangeet and receptions.", icon: Music2, image: unsplash("photo-1492684223066-81342ee5ff30"), details: "Wedding DJ service for sangeet, baraat and reception celebrations, with music suited to your guests and event schedule." },
  { id: "party-dj", name: "Party DJ & Dance Floor", category: "Entertainment", description: "DJ music and dance floor entertainment for parties and events.", icon: Music2, image: unsplash("photo-1501386761578-eac5c94b800a"), details: "A party-ready DJ experience with energetic music and a dance floor setup tailored to your venue and occasion." },
  { id: "sound-system", name: "Sound System", category: "Equipment", description: "Speakers, microphones and complete sound setup.", icon: Speaker, image: unsplash("photo-1506157786151-b8491531f063"), details: "Clear sound coverage with speakers and microphones suited to the venue and audience." },
  { id: "lighting", name: "Lighting", category: "Equipment", description: "Decorative lighting, stage lighting and event lighting.", icon: Lightbulb, image: unsplash("photo-1519608487953-e999c86e7455"), details: "Decorative and functional lighting planned for your stage, venue and celebration." },
  { id: "photography", name: "Camera & Photography", category: "Wedding", description: "Event photography and professional camera service.", icon: Camera, image: unsplash("photo-1516035069371-29a1b244cc32"), details: "Professional event photography to capture the people, details and moments of your occasion." },
  { id: "videography", name: "Video / Videography", category: "Wedding", description: "Complete event video coverage.", icon: Camera, image: unsplash("photo-1492619375914-88005aa9e8fb"), details: "Video coverage for ceremonies, celebrations and the highlights around them." },
  { id: "car-vehicle", name: "Car / Vehicle", category: "Transport", description: "Wedding cars and vehicles for special events.", icon: CarFront, image: unsplash("photo-1492144534655-ae79c964c9d7"), details: "Vehicle arrangements for wedding parties and special event transportation." },
  { id: "furniture", name: "Furniture", category: "Equipment", description: "Chairs, tables, sofas and seating arrangements.", icon: UsersRound, image: unsplash("photo-1503602642458-232111445657"), details: "Guest seating, tables and furniture arranged to match the venue and event plan." },
  { id: "generator-power-backup", name: "Generator / Power Backup", category: "Equipment", description: "Generator and power backup for events.", icon: Lightbulb, image: unsplash("photo-1473341304170-971dccb5ac1e"), details: "Power backup planning to help your event equipment run smoothly." },
  { id: "complete-event-management", name: "Complete Event Management", category: "Complete Event", description: "Food, catering, tent, decoration, DJ, sound, lighting and more.", icon: Star, image: unsplash("photo-1531058020387-3be344556be6"), details: "One coordinated package for food, catering, tent, decoration, DJ, sound, lighting and other event requirements." },
];

const categories = ["All", "Food & Catering", "Wedding", "Decoration", "Entertainment", "Equipment", "Transport", "Complete Event"];
const guestPackages = ["Small Gathering · 50–100 Guests", "Medium Event · 100–300 Guests", "Large Event · 300–500 Guests", "Big Event · 500–1000+ Guests"];
const perks = ["10–1000+ Guests", "Custom Menu", "Experienced Staff", "Fresh Ingredients", "Hygienic Preparation"];
const initialForm = { name: "", phone: "", email: "", eventDate: "", eventTime: "", guestCount: "", location: "", budget: "", message: "" };

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [servicePage, setServicePage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("details");
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const filtered = useMemo(() => services.filter((service) => {
    const matchesCategory = category === "All" || service.category === category;
    const term = query.trim().toLowerCase();
    return matchesCategory && (!term || `${service.name} ${service.description} ${service.category}`.toLowerCase().includes(term));
  }), [category, query]);

  const pageCount = Math.ceil(filtered.length / 4);
  const visibleServices = filtered.slice(servicePage * 4, servicePage * 4 + 4);

  useEffect(() => {
    setServicePage(0);
  }, [category, query]);

  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = window.setInterval(() => {
      setServicePage((current) => (current + 1) % pageCount);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [pageCount]);

  useEffect(() => {
    const serviceId = new URLSearchParams(window.location.search).get("service");
    const initial = services.find((service) => service.id === serviceId);
    if (initial) openService(initial, "details");
    // This only reads the optional service link on initial page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openService(service, nextMode = "details") {
    setSelected(service);
    setMode(nextMode);
    setForm(initialForm);
    setSuccess(null);
    setError("");
  }

  async function submitEnquiry(event) {
    event.preventDefault();
    if (!selected) return;
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setError("Enter a valid mobile number with 10 to 15 digits.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone: form.phone.trim(), serviceId: selected.id, serviceName: selected.name, source: "services-page" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not submit the enquiry.");
      setSuccess(data);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.message || "Could not connect to the enquiry service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const renderServiceSet = () => (
    <div key={servicePage} className="services-card-grid">
      {visibleServices.map((service) => {
        const Icon = service.icon;
        return (
          <button type="button" key={service.id} onClick={() => openService(service)} aria-label={`View ${service.name} details`} className="group flex min-w-0 flex-col rounded-[1.2rem] border border-[#e9dfcf] bg-white p-1.5 text-left shadow-[0_6px_18px_rgba(34,47,39,.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#d4b260] hover:shadow-[0_12px_25px_rgba(34,47,39,.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd861a] sm:rounded-[1.5rem] sm:p-2">
            <span className="relative aspect-[16/10] w-full overflow-hidden rounded-[.95rem] bg-[#eee5d7] sm:rounded-[1.15rem]">
              <Image src={service.image} alt={`${service.name} for events`} fill unoptimized sizes="50vw" loading="lazy" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
              <span className="absolute left-2 top-2 max-w-[calc(100%-2.75rem)] truncate rounded-full border border-white/70 bg-[#fffaf0]/95 px-2 py-1 text-[9px] font-bold text-[#835c12] shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">{service.category}</span>
              <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-[#123332]/95 text-[#efbd54] shadow-lg sm:bottom-3 sm:right-3 sm:h-10 sm:w-10"><Icon size={17} /></span>
            </span>
            <span className="flex min-h-12 w-full items-center justify-between gap-1 px-1.5 py-2 sm:min-h-14 sm:px-2"><span className="line-clamp-2 font-serif text-xs font-bold leading-snug text-[#173332] sm:text-base">{service.name}</span><ArrowRight size={15} className="shrink-0 text-[#ad7915] transition-transform group-hover:translate-x-0.5" /></span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
    <Pnavbar showQuickActions={false} fixed={false} />
    <main className="bg-[#fffaf3] px-3 py-0 text-[#173332] sm:px-5">
      <section className="mx-auto max-w-7xl" aria-live="polite">
        <div className="mb-2 grid gap-2 sm:grid-cols-[minmax(200px,.8fr)_1.2fr] sm:items-center">
          <h1 className="font-serif text-2xl font-bold text-[#173332] sm:text-3xl">Services</h1>
          <label className="relative block">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9b7a42]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services..." className="w-full rounded-xl border border-[#e8dcc8] bg-white py-3 pl-10 pr-3 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#bd861a] focus:ring-4 focus:ring-amber-100" />
          </label>
        </div>
        <div className="mb-2 flex gap-2 overflow-x-auto pb-1" aria-label="Filter services by category">
          {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${category === item ? "border-[#143635] bg-[#143635] text-white" : "border-[#e7ddce] bg-white text-slate-600 hover:border-[#bd861a] hover:text-[#875d0e]"}`}>{item}</button>)}
        </div>
        {filtered.length ? <div className="services-card-window" aria-label="Services, changing every three seconds">
          {renderServiceSet()}
        </div> : <div className="rounded-3xl border border-dashed border-[#d9cbb5] bg-white px-5 py-12 text-center"><Search className="mx-auto text-[#bd861a]" /><h3 className="mt-3 font-semibold">No services found</h3><p className="mt-1 text-sm text-slate-500">Try another search or category.</p></div>}
      </section>
      {selected && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071c1b]/65 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="service-dialog-title" className="max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-t-[1.6rem] border border-white/50 bg-[#fffdf9] shadow-2xl sm:rounded-[1.6rem]">
          <div className="relative h-40 sm:h-52"><Image src={selected.image} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#102b2b]/85 via-[#102b2b]/20 to-transparent" /><button type="button" onClick={() => setSelected(null)} aria-label="Close dialog" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#173332] shadow"><X size={19} /></button><div className="absolute bottom-4 left-5 right-5"><span className="rounded-full bg-[#f5d58d] px-3 py-1 text-xs font-bold text-[#63450c]">{selected.category}</span><h2 id="service-dialog-title" className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">{selected.name}</h2></div></div>
          <div className="p-5 sm:p-7">
            {success ? <div className="py-7 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CircleCheck size={34} /></span><h3 className="mt-5 font-serif text-2xl font-bold text-[#173332]">Enquiry submitted successfully!</h3><p className="mt-2 text-sm text-slate-600">Thank you. Our team will contact you shortly.</p><p className="mx-auto mt-5 inline-flex rounded-xl bg-[#f7f0e3] px-4 py-3 font-mono text-sm font-bold text-[#865d11]">{success.enquiryNumber}</p><button type="button" onClick={() => setSelected(null)} className="mt-6 block w-full rounded-xl bg-[#173332] px-5 py-3 font-semibold text-white">Done</button></div> : <>
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="max-w-xl text-sm leading-6 text-slate-600">{selected.details}</p><button type="button" onClick={() => setMode(mode === "details" ? "enquiry" : "details")} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#c58a19] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#a9700b]">{mode === "details" ? "Enquire Now" : "Service Details"}<ArrowRight size={16} /></button></div>
              {mode === "details" ? <>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">{perks.map((perk) => <p key={perk} className="flex items-center gap-2 text-sm text-[#31504c]"><Check size={16} className="shrink-0 text-[#b77c11]" />{perk}</p>)}</div>
                <div className="mt-6 rounded-2xl bg-[#f7f2e9] p-4"><p className="text-sm font-bold text-[#173332]">Choose an event size</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{guestPackages.map((item) => <div key={item} className="rounded-xl border border-[#e8ddca] bg-white px-3 py-2.5 text-sm text-slate-600">{item}</div>)}</div></div>
                <button type="button" onClick={() => setMode("enquiry")} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c58a19] px-5 font-bold text-white transition hover:bg-[#a9700b]">Send Enquiry <ArrowRight size={17} /></button>
              </> : <form onSubmit={submitEnquiry} className="mt-6">
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#ead9b8] bg-[#fbf5e9] px-3 py-2.5 text-sm font-semibold text-[#785610]"><CalendarDays size={17} /> Enquiry for {selected.name}</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full Name *" name="name" value={form.name} onChange={setForm} required autoComplete="name" />
                  <Field label="Mobile Number *" name="phone" value={form.phone} onChange={setForm} required type="tel" autoComplete="tel" />
                  <Field label="Email" name="email" value={form.email} onChange={setForm} type="email" autoComplete="email" />
                  <Field label="Event Date *" name="eventDate" value={form.eventDate} onChange={setForm} required type="date" min={new Date().toISOString().slice(0, 10)} />
                  <Field label="Preferred Time" name="eventTime" value={form.eventTime} onChange={setForm} type="time" />
                  <Field label="Number of Guests" name="guestCount" value={form.guestCount} onChange={setForm} type="number" min="1" max="100000" placeholder="e.g. 300" />
                  <Field label="Event Location *" name="location" value={form.location} onChange={setForm} required placeholder="City or venue address" />
                  <label className="grid gap-1.5 text-xs font-bold text-[#405550]">Budget Range<select value={form.budget} onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} className="h-11 rounded-xl border border-[#e5ddcf] bg-white px-3 text-sm font-normal text-slate-700 outline-none focus:border-[#bd861a]"><option value="">Select a range</option><option>Under ₹50,000</option><option>₹50,000–₹1,00,000</option><option>₹1,00,000–₹3,00,000</option><option>₹3,00,000–₹5,00,000</option><option>₹5,00,000+</option><option>Need guidance</option></select></label>
                  <label className="grid gap-1.5 text-xs font-bold text-[#405550] sm:col-span-2">Additional Requirements<textarea value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} rows={3} maxLength={5000} placeholder="Menu preferences, event type or other details" className="resize-y rounded-xl border border-[#e5ddcf] bg-white px-3 py-2.5 text-sm font-normal text-slate-700 outline-none focus:border-[#bd861a]" /></label>
                </div>
                {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
                <button disabled={submitting} type="submit" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c58a19] px-5 font-bold text-white transition hover:bg-[#a9700b] disabled:cursor-wait disabled:opacity-60">{submitting ? "Submitting…" : "Submit Enquiry"}<Send size={16} /></button>
                <p className="mt-2 text-center text-xs text-slate-500">Your details are sent securely to our enquiry team.</p>
              </form>}
            </>}
          </div>
        </section>
      </div>}
    </main>
    </>
  );
}

function Field({ label, name, value, onChange, ...props }) {
  return <label className="grid min-w-0 gap-1.5 text-xs font-bold text-[#405550]">{label}<input name={name} value={value} onChange={(event) => onChange((current) => ({ ...current, [name]: event.target.value }))} className="h-11 min-w-0 rounded-xl border border-[#e5ddcf] bg-white px-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#bd861a] focus:ring-2 focus:ring-amber-100" {...props} /></label>;
}
