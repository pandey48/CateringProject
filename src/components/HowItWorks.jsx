import { ArrowRight, ClipboardList, PhoneCall, Sparkles } from "lucide-react";

const steps = [
  { Icon: PhoneCall, number: "01", title: "Contact Us", description: "अपनी ज़रूरत और कार्यक्रम की जानकारी साझा करें।" },
  { Icon: ClipboardList, number: "02", title: "Choose a Service", description: "कुक, कैटरिंग या इवेंट मैनेजमेंट चुनें।" },
  { Icon: Sparkles, number: "03", title: "Enjoy Your Event", description: "खास दिन का आनंद लें, व्यवस्था हम संभालेंगे।" },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f7f3eb] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 text-center sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">A simple process</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#142d2d] sm:text-4xl">आयोजन ऐसे करें आसान</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {steps.map(({ Icon, ...step }, index) => (
            <article key={step.number} className="relative rounded-2xl border border-[#e8e1d5] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf0eb] text-[#315448]"><Icon size={22} /></span>
                <span className="font-serif text-3xl font-bold text-[#d7c8a7]">{step.number}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#142d2d]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              {index < steps.length - 1 && <ArrowRight size={18} className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-amber-700 md:block" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
