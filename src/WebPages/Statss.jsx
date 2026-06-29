import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  CalendarCheck,
  Users,
  Award,
  UtensilsCrossed,
} from "lucide-react";

const stats = [
  {
    icon: <CalendarCheck size={40} />,
    number: 500,
    suffix: "+",
    title: "Events Completed",
  },
  {
    icon: <Users size={40} />,
    number: 10000,
    suffix: "+",
    title: "Happy Guests",
  },
  {
    icon: <Award size={40} />,
    number: 15,
    suffix: "+",
    title: "Years Experience",
  },
  {
    icon: <UtensilsCrossed size={40} />,
    number: 120,
    suffix: "+",
    title: "Menu Items",
  },
];

export default function Statss() {
  return (
    <section className="py-20 bg-linear-to-r from-orange-500 to-amber-500">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Achievements
          </h2>

          <p className="text-orange-100 mt-4 text-lg">
            Trusted by hundreds of families for unforgettable celebrations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: .8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * .15,
                duration: .5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              className="bg-white rounded-3xl p-8 text-center shadow-xl"
            >
              <div className="text-orange-500 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-5xl font-bold text-gray-900">
  {item.number}
  {item.suffix}
</h3>

              <p className="mt-4 text-gray-600 font-semibold">
                {item.title}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}