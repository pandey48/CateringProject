import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function Contact() {
  const contactItems = [
    { icon: Phone, title: "Phone", value: "+91 73893 68597" },
    { icon: Mail, title: "Email", value: "pandeycatering@gmail.com" },
    { icon: MapPin, title: "Address", value: "Madha Raghuvar Hanumna Mauganj" },
    { icon: Clock, title: "Working Hours", value: "Any time available" },
  ];

  return (
    <section id="contact" className="bg-slate-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Contact us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Let&apos;s plan your next event
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Get in touch with us for weddings, birthdays, corporate events and catering bookings.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactItems.map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-md shadow-slate-200/70 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200/80 sm:p-8"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <textarea
                rows="5"
                placeholder="Message"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white"
              />

              <button
                className="w-full rounded-xl bg-orange-500 px-4 py-4 text-base font-semibold text-white transition hover:bg-orange-600"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}