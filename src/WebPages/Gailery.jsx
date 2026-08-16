import { motion } from "framer-motion";
import { Eye } from "lucide-react";

import img1 from "../assets/gallery/wedding1.jpg";
import img2 from "../assets/gallery/wedding2.jpg";
import img3 from "../assets/gallery/buffet.jpg";
import img4 from "../assets/gallery/birthday.jpg";
import img5 from "../assets/gallery/corporate.jpg";
import img6 from "../assets/gallery/sweets.jpg";

const images = [
  {
    image: img1,
    title: "Wedding Catering",
  },
  {
    image: img2,
    title: "Royal Decoration",
  },
  {
    image: img3,
    title: "Buffet Service",
  },
  {
    image: img4,
    title: "Birthday Party",
  },
  {
    image: img5,
    title: "Corporate Event",
  },
  {
    image: img6,
    title: "Delicious Sweets",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-slate-900 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <motion.span
            className="text-orange-400 text-sm font-semibold uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Gallery
          </motion.span>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Beautiful Events
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400 text-sm sm:text-base">
            Every event tells a story. Explore some memorable moments
            from weddings, birthdays, corporate events and catering services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-xl"
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover md:h-72"
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.4 }}
              />

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Eye
                    className="mb-4 text-white"
                    size={45}
                  />
                </motion.div>

                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {item.title}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}