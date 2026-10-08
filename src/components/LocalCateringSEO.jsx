import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const services = [
  ["wedding-catering", "Wedding catering", "Food service planned around your ceremony, guest count and event schedule."],
  ["party-catering", "Party catering", "Catering for birthdays, anniversaries and family celebrations."],
  ["event-catering", "Event catering", "Discuss food and serving arrangements for your gathering."],
  ["vegetarian-catering", "Vegetarian catering", "Plan a vegetarian menu around your family’s preferences."],
  ["religious-function-catering", "Religious & family functions", "Discuss food choices and service for meaningful family occasions."],
];

const serviceAreas = [
  ["hanumana", "Hanumana"],
  ["mauganj", "Mauganj"],
  ["rewa", "Rewa"],
  ["sidhi", "Sidhi"],
  ["nagpur", "Nagpur"],
  ["mirzapur", "Mirzapur"],
  ["prayagraj", "Prayagraj"],
  ["jabalpur", "Jabalpur"],
];

const faqs = [
  ["Do you provide wedding catering?", "Yes. Contact Pandey Catering with your wedding date and guest estimate to discuss menu options and service arrangements."],
  ["Can I request vegetarian food?", "Yes. Share your dietary and menu preferences with the team when you enquire."],
  ["Can the menu be customized?", "Menu options can be discussed around your occasion, family preferences and guest requirements."],
  ["Which areas do you serve?", "Pandey Catering serves Hanumana, Mauganj, Rewa, Sidhi and Jabalpur in Madhya Pradesh; Mirzapur and Prayagraj in Uttar Pradesh; and Nagpur in Maharashtra. Contact the team to confirm availability for your event date and venue."],
  ["How can I enquire or book?", "Use our short enquiry form or call +91 73893 68597 with your event date and expected guest count."],
];

export default function LocalCateringSEO() {
  return <section id="service-areas" className="bg-[#fffaf5] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#a87716]">Pandey Catering · Hanumana</span>
        <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#173332] sm:text-4xl">Catering for weddings, parties and family events</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Pandey Catering helps families and event hosts in Hanumana, Mauganj, Rewa, Sidhi and Jabalpur in Madhya Pradesh; Mirzapur and Prayagraj in Uttar Pradesh; and Nagpur in Maharashtra, plan food service for weddings, parties, religious functions and other gatherings. Discuss vegetarian food, guest numbers, menu preferences and serving arrangements with our team before confirming your event.</p>
      </header>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{services.map(([slug, title, description]) => <Link key={slug} href={`/${slug}`} className="group rounded-2xl border border-[#e9dfcf] bg-white p-4 transition hover:border-[#d6bc83] hover:shadow-md"><h3 className="font-serif text-lg font-bold text-[#173332]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#9a6b13]">Learn more <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" /></span></Link>)}</div>

      <div className="mt-8 grid gap-6 rounded-3xl bg-[#f2eee5] p-5 sm:p-7 md:grid-cols-2">
        <div><h2 className="font-serif text-2xl font-bold text-[#173332]">Why choose Pandey Catering?</h2><ul className="mt-4 grid gap-3 text-sm text-[#405550]">{["Menu planning shaped around your occasion", "Vegetarian and family-favourite food options", "Catering for weddings, parties and functions", "Event details confirmed directly with our team"].map((item) => <li key={item} className="flex gap-2"><Check size={17} className="shrink-0 text-[#a87716]" />{item}</li>)}</ul></div>
        <div><h2 className="font-serif text-2xl font-bold text-[#173332]">Our service areas</h2><p className="mt-3 text-sm leading-6 text-slate-600">Pandey Catering serves Hanumana, Mauganj, Rewa, Sidhi and Jabalpur in Madhya Pradesh; Mirzapur and Prayagraj in Uttar Pradesh; and Nagpur in Maharashtra. Contact us to confirm availability for your event date and venue.</p><div className="mt-4 flex flex-wrap gap-2">{serviceAreas.map(([slug, name]) => <Link key={slug} href={`/catering-${slug}`} className="rounded-full border border-[#e2d8c7] bg-white px-3 py-1.5 text-sm font-semibold text-[#38514c] transition hover:border-[#bd861a] hover:text-[#8a5f10]">Catering in {name}</Link>)}</div><a href="tel:+917389368597" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#173332] px-5 text-sm font-bold text-white transition hover:bg-[#bd861a]">Call +91 73893 68597 <ArrowUpRight size={15} /></a></div>
      </div>

      <section className="mt-10" aria-labelledby="home-faq-title"><h2 id="home-faq-title" className="font-serif text-2xl font-bold text-[#173332]">Questions about catering?</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-[#e9dfcf] bg-white p-4"><summary className="cursor-pointer font-semibold text-[#173332]">{question}</summary><p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div><Link href="/enqury" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#bd861a] px-5 text-sm font-bold text-white transition hover:bg-[#a87512]">Ask about your event <ArrowUpRight size={16} /></Link></section>
    </div>
  </section>;
}
