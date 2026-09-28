import { ArrowUpRight, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-[#102b2b] px-4 py-10 text-center text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">Let’s make it memorable</span>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">आपका अगला आयोजन, हमारे साथ</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          कुक, कैटरिंग या पूरे इवेंट मैनेजमेंट के लिए अपनी ज़रूरत बताएँ। हमारी टीम आपके कार्यक्रम की योजना बनाने में मदद करेगी।
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/booking" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#bd861a] px-6 text-sm font-bold text-white transition hover:bg-[#a87512]">
            Book Now <ArrowUpRight size={17} />
          </a>
          <a href="#quote" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-bold text-white transition hover:bg-white/10">
            Get a Free Quote
          </a>
          <a href="tel:+917389368597" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-sm font-bold text-white transition hover:bg-white/10">
            <Phone size={16} /> Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
