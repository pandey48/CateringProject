import { CalendarCheck2, ChefHat, ConciergeBell, UsersRound } from "lucide-react";

const benefits = [
  { Icon: ChefHat, title: "Expert Chefs", detail: "Delicious & Hygienic Food" },
  { Icon: UsersRound, title: "Custom Packages", detail: "As per Your Needs" },
  { Icon: ConciergeBell, title: "Fresh & Quality Ingredients", detail: "Always" },
  { Icon: CalendarCheck2, title: "Serving All Occasions", detail: "Weddings · Corporate · Social" },
];

export default function HeroBenefits() {
  return (
    <section className="home-hero-benefits" aria-label="Our service benefits">
      <div className="home-hero-benefits__grid">
        {benefits.map(({ Icon, title, detail }) => (
          <article className="home-hero-benefits__item" key={title}>
            <span className="home-hero-benefits__icon"><Icon size={27} strokeWidth={1.8} /></span>
            <h2>{title}</h2>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
