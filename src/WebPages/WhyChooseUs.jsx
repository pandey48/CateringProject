import { ArrowRight, ChefHat, Settings, ShieldCheck, Star, UsersRound } from "lucide-react";

const features = [
  {
    Icon: ShieldCheck,
    title: "Hygienic & Safe Food",
    desc: "100% fresh and quality ingredients",
  },
  {
    Icon: UsersRound,
    title: "Experienced Team",
    desc: "Professional & skilled staff",
  },
  {
    Icon: Settings,
    title: "Customized Planning",
    desc: "Planned around your needs",
  },
  {
    Icon: Star,
    title: "On-Time Delivery",
    desc: "Every detail managed with care",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="why-choose-section">
      <div className="why-choose-inner mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="why-choose-heading">
          <span><i aria-hidden="true" />Why Choose Us?</span>
          <h2>Making Every Event Special</h2>
          <p>We bring creativity, taste and professionalism to make your event truly memorable.</p>
        </header>

        <div className="why-choose-list">
          {features.map(({ Icon, title, desc }) => (
            <article className="why-choose-card" key={title}>
              <span className="why-choose-icon"><Icon size={29} strokeWidth={1.9} /></span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>

        <a className="why-choose-booking" href="/booking">
          <ChefHat size={19} />Book Now<ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
