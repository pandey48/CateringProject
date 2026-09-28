"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const images = [
  {
    image: "/images/event-catering.jpg",
    title: "Event Catering",
    categories: ["Food", "Catering"],
  },
  {
    image: "/images/event-celebration.jpg",
    title: "Event Celebration",
    categories: ["Wedding", "Events"],
  },
  {
    image: "/images/event-desserts.jpg",
    title: "Sweet Moments",
    categories: ["Food", "Catering"],
  },
  {
    image: "/services/lidya-nada-MD_ha01Bk7c-unsplash.jpg",
    title: "Professional Cooking",
    categories: ["Food", "Cook"],
  },
  {
    image: "/services/saile-ilyas-SiwrpBnxDww-unsplash.jpg",
    title: "Cook Service",
    categories: ["Cook", "Events"],
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Food", "Cook", "Catering", "Wedding", "Events"];
  const visibleImages = images.filter((item) => activeCategory === "All" || item.categories.includes(activeCategory));

  return (
    <section
      id="gallery"
      className="bg-[#102b2b] py-10 sm:py-12"
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
            className="text-amber-300 text-sm font-semibold uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Gallery
          </motion.span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Beautiful Events
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400 text-sm sm:text-base">
            Every event tells a story. Explore some memorable moments
            from weddings, birthdays, corporate events and catering services.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Filter gallery by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${activeCategory === category ? "border-amber-400 bg-amber-400 text-[#142d2d]" : "border-white/20 bg-white/5 text-white/80 hover:border-amber-300 hover:text-amber-200"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleImages.map((item, index) => (
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
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
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
