import { ArrowRight, CalendarDays, Camera, Check, ChefHat, Flower2, Mail, Music2, Sparkles, TentTree, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

const coreServices = [
  {
    id: "cook",
    icon: ChefHat,
    label: "Food & Catering",
    title: "Professional Cook",
    description: "Experienced cooks for weddings, parties, family functions and large gatherings.",
    features: ["Experienced cooks", "Regional menus", "Flexible menu options", "Custom menu"],
    image: "/services/pandey-catering-cook-service.webp",
    imageAlt: "Professional cook preparing food for an event",
    action: "Explore Cook Service",
    href: "/services?service=professional-cook",
  },
  {
    id: "catering",
    icon: UtensilsCrossed,
    label: "FOOD & CATERING",
    title: "Catering Service",
    description: "Complete catering for small functions to large events.",
    features: ["Wedding catering", "Party catering", "Fresh ingredients", "Serving staff"],
    image: "/images/pandey-catering-event-buffet.webp",
    imageAlt: "A neatly arranged catering buffet at an event",
    action: "Explore Catering",
    href: "/services?service=catering-service",
  },
  {
    id: "events",
    icon: CalendarDays,
    label: "Complete Event",
    title: "Complete Event Management",
    description: "Food, catering, tent, decoration, DJ, sound, lighting and more.",
    features: ["Weddings & receptions", "Birthday parties", "Corporate events", "Social functions"],
    image: "/images/pandey-catering-wedding-celebration.webp",
    imageAlt: "A decorated venue ready for a special celebration",
    action: "Plan Your Event",
    href: "/services?service=complete-event-management",
  },
  {
    id: "all-in-one",
    icon: Sparkles,
    label: "Complete Event",
    title: "Complete Event Management",
    description: "Food, catering, tent, decoration, DJ, sound, lighting and more.",
    features: [
      { label: "Camera & photography", icon: Camera },
      { label: "Invitation cards", icon: Mail },
      { label: "DJ & sound", icon: Music2 },
      { label: "Tent & decoration", icon: TentTree },
      { label: "Catering", icon: UtensilsCrossed },
      { label: "Lighting & flowers", icon: Flower2 },
    ],
    image: "/services/pandey-catering-event-management.webp",
    imageAlt: "Complete event setup for a celebration",
    action: "Explore All Services",
    href: "/services?service=complete-event-management",
  },
];

export default function CoreServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#fbf8f1] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="pointer-events-none absolute -right-36 top-12 h-80 w-80 rounded-full bg-[#eddbb4]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-7 max-w-2xl text-center sm:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ead9b5] bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.19em] text-[#9a6b13]"><Sparkles size={14} /> Cook · Catering · Events</span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#142d2d] sm:text-4xl">Our Core Services</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">The people, food and planning that make your occasion feel effortless.</p>
        </header>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {coreServices.map(({ icon: Icon, ...service }) => (
            <a key={service.id} href={service.href} aria-label={`Explore ${service.title}`} className="group flex min-w-0 flex-col overflow-hidden rounded-[1.6rem] border border-[#e9dfcf] bg-white p-2 shadow-[0_10px_28px_rgba(24,45,39,.07)] transition duration-300 hover:-translate-y-1 hover:border-[#d5b56e] hover:shadow-[0_20px_42px_rgba(24,45,39,.13)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd861a]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] bg-[#e9e1d4]">
                <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" className="object-cover transition duration-500 group-hover:scale-[1.045]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2928]/55 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-[#fffaf0]/95 px-3 py-1.5 text-[10px] font-bold tracking-[.1em] text-[#79550f] shadow-sm">{service.label}</span>
                <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-2xl border border-white/25 bg-[#123332]/95 text-[#efbd54] shadow-lg"><Icon size={21} /></span>
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4 sm:pb-4">
                <h3 className="font-serif text-xl font-bold leading-snug text-[#173332]">{service.title}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-600">{service.description}</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 rounded-2xl bg-[#faf7f0] p-3 text-xs leading-5 text-[#52615b] sm:text-[13px]">
                  {service.features.map((feature) => {
                    const FeatureIcon = typeof feature === "string" ? Check : feature.icon;
                    const label = typeof feature === "string" ? feature : feature.label;
                    return <li key={label} className="flex min-w-0 items-start gap-1.5"><FeatureIcon size={14} className="mt-0.5 shrink-0 text-[#b77e14]" /><span>{label}</span></li>;
                  })}
                </ul>
                <span className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#123332] px-4 text-sm font-bold text-white transition group-hover:bg-[#bd861a]">
                  {service.action}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
