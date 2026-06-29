import { motion } from "framer-motion";
import {
  ChefHat,
  Truck,
  HeartHandshake,
  UtensilsCrossed,
} from "lucide-react";

const features = [
  {
    icon: <ChefHat size={45} />,
    title: "Expert Chefs",
    desc: "Our experienced chefs prepare delicious and hygienic food with authentic taste.",
  },
  {
    icon: <Truck size={45} />,
    title: "On-Time Service",
    desc: "We ensure timely delivery and professional catering service for every event.",
  },
  {
    icon: <HeartHandshake size={45} />,
    title: "Trusted by 500+ Families",
    desc: "Thousands of happy customers trust Pandey Catering for weddings and parties.",
  },
  {
    icon: <UtensilsCrossed size={45} />,
    title: "Premium Quality",
    desc: "Fresh ingredients, modern equipment and high-quality service at affordable prices.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="py-20 bg-linear-to-r from-orange-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-orange-500 font-semibold uppercase tracking-widest">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
            We Make Every Event
            <span className="text-orange-500"> Special</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            We provide premium catering services with delicious food,
            professional staff, and unforgettable experiences for every occasion.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.04,
              }}
              className="bg-white rounded-3xl shadow-lg p-8 text-center border border-orange-100 hover:shadow-2xl transition-all duration-300"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}