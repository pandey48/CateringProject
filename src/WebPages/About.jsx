import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

export default function About() {
  const points = ["Catering and professional cooks", "Weddings, parties and family functions", "Event planning from setup to service"];

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-[#fffaf5] py-10 sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              About us
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Creating Memorable Events with <span className="text-[#bd861a]">Care &amp; Creativity</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700 sm:text-lg">
              Pandey Catering &amp; Event Services brings food, skilled cooks and event planning together for weddings, birthdays, corporate events and family occasions. Tell us what you need and we will help plan the details.
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-[#31504c]">
              {points.map((point) => <li key={point} className="flex items-center gap-2"><Check size={17} className="shrink-0 text-[#bd861a]" />{point}</li>)}
            </ul>
            <a href="/booking" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173332] px-6 text-sm font-bold text-white transition hover:bg-[#bd861a]">Plan Your Event <ArrowUpRight size={17} /></a>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-[#e8dfd2] sm:min-h-[390px]">
            <Image src="/images/pandey-catering-wedding-celebration.webp" alt="A celebration venue prepared for guests" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102b2b]/55 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#173332]">Thoughtful service for every occasion</p>
          </div>
        </div>
      </div>
    </section>
  );
}
