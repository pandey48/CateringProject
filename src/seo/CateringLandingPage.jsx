import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Pnavbar from "../WebPages/Pnavbar";

const serviceLinks = [
  ["wedding-catering", "Wedding Catering"],
  ["party-catering", "Party Catering"],
  ["event-catering", "Event Catering"],
  ["vegetarian-catering", "Vegetarian Catering"],
  ["religious-function-catering", "Religious & Family Functions"],
];

export default function CateringLandingPage({ page, slug }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://www.pandeycatering.in/${slug}#service`,
        name: page.title,
        serviceType: page.title,
        description: page.metaDescription,
        url: `https://www.pandeycatering.in/${slug}`,
        areaServed: "Hanumana, Madhya Pradesh",
        provider: { "@id": "https://www.pandeycatering.in/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pandeycatering.in/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.pandeycatering.in/services" },
          { "@type": "ListItem", position: 3, name: page.title, item: `https://www.pandeycatering.in/${slug}` },
        ],
      },
    ],
  };
  return <>
    <Pnavbar />
    <main className="min-h-screen bg-[#fffaf5] pb-16 pt-24 text-[#173332] sm:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="hover:text-[#9a6b13]">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/services" className="hover:text-[#9a6b13]">Services</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-[#173332]">{page.title}</li></ol></nav>

        <header className="rounded-3xl bg-[#173332] px-5 py-8 text-white sm:px-9 sm:py-11">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f0c766]">Pandey Catering · Hanumana, Madhya Pradesh</p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl">{page.heading}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">{page.description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/enqury" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#bd861a] px-6 text-sm font-bold text-white transition hover:bg-[#a87512]">Request an Enquiry <ArrowRight size={17} /></Link>
            <a href="tel:+917389368597" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10">Call +91 73893 68597</a>
          </div>
        </header>

        <section className="mt-8 grid gap-5 rounded-3xl border border-[#e9dfcf] bg-white p-5 sm:p-8 md:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a87716]">Menu &amp; service</p><h2 className="mt-2 font-serif text-2xl font-bold">{page.menuHeading}</h2></div>
          <ul className="grid gap-3 sm:grid-cols-2">{page.menu.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><Check size={17} className="mt-1 shrink-0 text-[#a87716]" />{item}</li>)}</ul>
        </section>

        <section className="mt-8 rounded-3xl bg-[#f3eee4] p-5 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a87716]">How it works</p><h2 className="mt-2 font-serif text-2xl font-bold">Start with your event details</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{page.process}</p></section>

        <section className="mt-10" aria-labelledby="catering-faq-heading"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a87716]">Helpful answers</p><h2 id="catering-faq-heading" className="mt-2 font-serif text-2xl font-bold">Frequently asked questions</h2><div className="mt-4 grid gap-3">{page.faqs.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#e9dfcf] bg-white p-4"><summary className="cursor-pointer font-semibold text-[#173332] marker:text-[#a87716]">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></section>

        <nav aria-label="Related catering services" className="mt-10 border-t border-[#e6ddce] pt-7"><h2 className="font-serif text-xl font-bold">Explore catering services</h2><div className="mt-3 flex flex-wrap gap-2">{serviceLinks.filter(([otherSlug]) => otherSlug !== slug).map(([otherSlug, label]) => <Link key={otherSlug} href={`/${otherSlug}`} className="rounded-full border border-[#e3d8c4] bg-white px-4 py-2 text-sm font-semibold text-[#38514c] transition hover:border-[#bd861a] hover:text-[#8a5f10]">{label}</Link>)}</div><Link href="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9a6b13] hover:underline">View all services <ArrowRight size={15} /></Link></nav>
      </div>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
