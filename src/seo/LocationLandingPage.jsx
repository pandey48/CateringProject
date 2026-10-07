import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import Pnavbar from "../WebPages/Pnavbar";
import { cateringLocations } from "./cateringLocations";

const cateringLinks = [
  ["wedding-catering", "Wedding catering", "Menus and service planned around your celebration."],
  ["party-catering", "Party catering", "Food service for birthdays and family gatherings."],
  ["event-catering", "Event catering", "Serving arrangements matched to your event schedule."],
  ["vegetarian-catering", "Vegetarian catering", "Discuss family-preferred dishes and guest needs."],
  ["religious-function-catering", "Religious & family function catering", "Plan food service for meaningful occasions."],
];

export default function LocationLandingPage({ location, slug }) {
  const pageUrl = `https://www.pandeycatering.in/catering-${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Catering service in ${location.name}`,
        serviceType: "Wedding, party, event, vegetarian and family function catering",
        description: location.metaDescription,
        url: pageUrl,
        areaServed: { "@type": "Place", name: `${location.name}, ${location.region}, India` },
        provider: { "@id": "https://www.pandeycatering.in/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pandeycatering.in/" },
          { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.pandeycatering.in/#service-areas" },
          { "@type": "ListItem", position: 3, name: location.name, item: pageUrl },
        ],
      },
    ],
  };

  return <>
    <Pnavbar />
    <main className="min-h-screen bg-[#fffaf5] pb-16 pt-24 text-[#173332] sm:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="hover:text-[#9a6b13]">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/#service-areas" className="hover:text-[#9a6b13]">Service Areas</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-[#173332]">{location.name}</li></ol></nav>
        <header className="rounded-3xl bg-[#173332] px-5 py-8 text-white sm:px-9 sm:py-11">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f0c766]">Pandey Catering · {location.name}, {location.region}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl">{location.heading}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">{location.description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href={`/enqury?city=${slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#bd861a] px-6 text-sm font-bold text-white transition hover:bg-[#a87512]">Plan your catering <ArrowRight size={17} /></Link><a href="tel:+917389368597" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10">Call +91 73893 68597</a></div>
        </header>

        <section className="mt-8 rounded-3xl border border-[#e9dfcf] bg-white p-5 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a87716]">Local catering information</p><h2 className="mt-2 font-serif text-2xl font-bold">Plan food service for your {location.name} event</h2><p className="mt-3 text-sm leading-7 text-slate-600">{location.localDetails}</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{["Wedding and event catering", "Party and family gathering menus", "Vegetarian and family-preferred food", "Meal service planned around your event"].map((item) => <li key={item} className="flex gap-2 text-sm text-[#405550]"><Check size={17} className="shrink-0 text-[#a87716]" />{item}</li>)}</ul></section>

        <section className="mt-8 rounded-3xl border border-[#e9dfcf] bg-white p-5 sm:p-8" aria-labelledby="location-areas-title"><div className="flex items-center gap-2 text-[#a87716]"><MapPin size={17} /><p className="text-xs font-bold uppercase tracking-[.16em]">Venue planning</p></div><h2 id="location-areas-title" className="mt-2 font-serif text-2xl font-bold">Catering enquiries around {location.name}</h2><p className="mt-3 text-sm leading-7 text-slate-600">Mention your venue area or a nearby landmark so the team can confirm travel, availability and service arrangements for your date.</p><div className="mt-4 flex flex-wrap gap-2">{location.areas.map((area) => <span key={area} className="rounded-full border border-[#e3d8c4] bg-[#fffdf9] px-3 py-1.5 text-sm font-medium text-[#38514c]">{area}</span>)}</div><Link href={`/enqury?city=${slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#173332] px-5 text-sm font-bold text-white transition hover:bg-[#bd861a]">Share your venue <ArrowRight size={16} /></Link></section>

        <section className="mt-10" aria-labelledby="location-services-title"><h2 id="location-services-title" className="font-serif text-2xl font-bold">Catering for every occasion in {location.name}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cateringLinks.map(([serviceSlug, label, description]) => <Link key={serviceSlug} href={`/${serviceSlug}`} className="group rounded-2xl border border-[#e9dfcf] bg-white p-4 transition hover:border-[#bd861a] hover:shadow-sm"><h3 className="font-serif text-lg font-bold text-[#173332]">{label}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#9a6b13]">Explore service <ArrowRight size={15} /></span></Link>)}</div></section>

        <section className="mt-8 grid gap-5 rounded-3xl bg-[#f2eee5] p-5 sm:p-8 md:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a87716]">Booking process</p><h2 className="mt-2 font-serif text-2xl font-bold">Date, guests, menu, confirmation</h2></div><p className="text-sm leading-7 text-slate-600">Send your name, event date and expected guest count using the enquiry form. WhatsApp opens with those details ready for you to send to our team. We will connect with you to discuss your venue, menu preferences and availability before confirming arrangements.</p></section>

        <section className="mt-10" aria-labelledby="location-faq-title"><h2 id="location-faq-title" className="font-serif text-2xl font-bold">Catering questions in {location.name}</h2><div className="mt-4 grid gap-3">{location.faq.map(([question, answer]) => <details key={question} className="rounded-2xl border border-[#e9dfcf] bg-white p-4"><summary className="cursor-pointer font-semibold text-[#173332]">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></section>

        <nav id="service-areas" aria-label="Other catering cities" className="mt-10 border-t border-[#e6ddce] pt-7"><h2 className="font-serif text-xl font-bold">Explore catering in other cities</h2><div className="mt-3 flex flex-wrap gap-2">{Object.entries(cateringLocations).map(([citySlug, city]) => <Link key={citySlug} href={`/catering-${citySlug}`} aria-current={citySlug === slug ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${citySlug === slug ? "border-[#173332] bg-[#173332] text-white" : "border-[#e3d8c4] bg-white text-[#38514c] hover:border-[#bd861a] hover:text-[#8a5f10]"}`}>Catering in {city.name}</Link>)}</div><Link href="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9a6b13] hover:underline">See all services <ArrowRight size={15} /></Link></nav>
      </div>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
