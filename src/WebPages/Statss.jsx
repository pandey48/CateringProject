"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Users,
  Award,
  UtensilsCrossed,
} from "lucide-react";

const stats = [
  {
    Icon: CalendarCheck,
    number: "500+",
    title: "Events Completed",
  },
  {
    Icon: Users,
    number: "10,000+",
    title: "Happy Guests",
  },
  {
    Icon: Award,
    number: "15+",
    title: "Years Experience",
  },
  {
    Icon: UtensilsCrossed,
    number: "120+",
    title: "Menu Items",
  },
];

export default function Statss() {
  return (
    <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 py-16 sm:py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Achievements
          </h2>

          <p className="mt-3 text-orange-100">
            Trusted by hundreds of families for unforgettable celebrations.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.Icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl bg-white p-6 text-center shadow-xl"
              >

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <Icon
                    size={42}
                    className="text-orange-500"
                  />
                </div>

                {/* Number */}
                <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {item.number}
                </h3>

                {/* Title */}
                <p className="mt-3 text-sm font-semibold text-gray-600 sm:text-base">
                  {item.title}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}