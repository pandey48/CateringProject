import { ArrowUpRight, Check, ChefHat, UsersRound, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    id: "catering-service",
    eyebrow: "Catering for every occasion",
    title: "स्वाद जो आपके मेहमान याद रखें",
    subtitle: "Delicious catering for every occasion",
    description: "शादी, पार्टी और कॉर्पोरेट कार्यक्रमों के लिए ताज़ा खाना, व्यवस्थित सर्विस और आपकी पसंद का मेन्यू।",
    image: "/images/event-catering.jpg",
    imageAlt: "A premium buffet prepared for a catered event",
    imageFirst: true,
    icon: UtensilsCrossed,
    points: ["Wedding catering", "Party catering", "Corporate catering", "Birthday & family functions"],
    button: "Get Catering Quote",
    href: "/booking",
    count: "10 से 1000+ मेहमान",
    note: "Small gatherings to large celebrations",
  },
  {
    id: "cook-service",
    eyebrow: "For home and special events",
    title: "Professional Cook Service",
    subtitle: "अनुभवी कुक, आपकी पसंद के स्वाद के साथ।",
    description: "घर, शादी, पार्टी और बड़े आयोजनों के लिए अपने मेहमानों के सामने ताज़ा खाना बनवाएँ।",
    image: "/services/saile-ilyas-SiwrpBnxDww-unsplash.jpg",
    imageAlt: "Professional cooking service with fresh ingredients",
    imageFirst: false,
    icon: ChefHat,
    points: ["Experienced cooks", "Custom menu", "Fresh ingredients", "Hygienic cooking", "Flexible menu options", "Traditional Indian cuisine"],
    button: "Book a Cook",
    href: "/booking",
  },
  {
    id: "event-service",
    eyebrow: "Events made memorable",
    title: "आपका Event, हमारी ज़िम्मेदारी",
    subtitle: "Thoughtful planning from start to finish.",
    description: "शादी से लेकर छोटे समारोह तक, प्लानिंग, सजावट, खान-पान और कार्यक्रम की व्यवस्था में हमारी टीम साथ देती है।",
    image: "/images/event-celebration.jpg",
    imageAlt: "A beautifully arranged celebration venue",
    imageFirst: true,
    icon: UsersRound,
    points: ["Weddings & receptions", "Birthday parties", "Corporate events", "Engagements & social events"],
    button: "Plan Your Event",
    href: "/booking",
  },
];

function Highlight({ item }) {
  const Icon = item.icon;
  const image = (
    <div className="relative min-h-64 overflow-hidden rounded-3xl bg-[#eee7db] sm:min-h-80">
      <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      {item.count && (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-[#fffdfa]/90 p-4 shadow-lg backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
          <p className="flex items-center gap-2 text-lg font-bold text-[#142d2d]"><UsersRound size={19} className="text-amber-700" />{item.count}</p>
          <p className="mt-1 text-sm text-slate-600">{item.note}</p>
        </div>
      )}
    </div>
  );

  return (
    <section id={item.id} key={item.id} className="bg-[#fffdfa] px-4 py-9 sm:px-6 sm:py-11 lg:px-8">
      <div className={`mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-2 lg:gap-10 ${item.imageFirst ? "" : ""}`}>
        <div className={item.imageFirst ? "lg:order-1" : "lg:order-2"}>{image}</div>
        <div className={item.imageFirst ? "lg:order-2" : "lg:order-1"}>
          <span className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">{item.eyebrow}</span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#142d2d] sm:text-4xl">{item.title}</h2>
          <p className="mt-3 text-lg font-semibold text-slate-700">{item.subtitle}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {item.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eaf0eb] text-[#315448]"><Check size={14} /></span>{point}
              </li>
            ))}
          </ul>
          <a href={item.href} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#bd861a] px-6 text-sm font-bold text-white shadow-md shadow-amber-900/10 transition hover:bg-[#a87512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd861a]">
            <Icon size={17} />{item.button}<ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomeHighlights() {
  return highlights.map((item) => <Highlight item={item} key={item.id} />);
}
