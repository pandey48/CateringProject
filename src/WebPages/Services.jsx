"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cateringImg from "../assets/images/servicebg.jpg";
import {
  FaUtensils,
  FaBirthdayCake,
  FaBuilding,
  FaHome,
  FaCamera,
  FaMusic,
  FaCar,
  FaGlassCheers,
} from "react-icons/fa";

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      title: "Wedding Catering",
      icon: FaGlassCheers,
      desc: "Complete wedding catering with premium menu, live counters, and professional staff.",
    },
    {
      title: "Birthday Catering",
      icon: FaBirthdayCake,
      desc: "Fun, delicious, and customizable catering for birthday celebrations.",
    },
    {
      title: "Corporate Events",
      icon: FaBuilding,
      desc: "Professional catering solutions for meetings, conferences, and office events.",
    },
    {
      title: "House Parties",
      icon: FaHome,
      desc: "Small gathering catering with personalized menus and quick service.",
    },
    {
      title: "Tent & Decoration",
      icon: FaUtensils,
      desc: "Elegant tent setup and wedding-style decoration for all events.",
    },
    {
      title: "Photo & Video Shooting",
      icon: FaCamera,
      desc: "Professional photography & videography to capture your special moments.",
    },
    {
      title: "DJ Services",
      icon: FaMusic,
      desc: "High-quality DJ sound system with professional DJs.",
    },
    {
      title: "Car Booking",
      icon: FaCar,
      desc: "Luxury and regular cars available for weddings and events.",
    },
  ];

  return (
    <section
      id="services"
      className="w-full bg-cover bg-center py-14 sm:py-20"
      style={{ backgroundImage: `url(${cateringImg.src})` }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <p className="mt-3 text-gray-200 text-sm sm:text-base">Everything you need for your perfect event</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveService(service)}
                className="group relative h-36 flex flex-col items-center justify-center rounded-2xl
                           bg-white/10 backdrop-blur-md
                           border border-white/20
                           transition-all duration-300
                           hover:border-yellow-400/60
                           hover:shadow-[0_0_25px_rgba(255,215,0,0.35)]
                           focus:outline-none sm:h-40"
              >
                <motion.div
                  className="text-3xl sm:text-4xl mb-3
                             text-white transition-colors duration-300
                             group-hover:text-yellow-300"
                  whileHover={{ rotate: 10, scale: 1.2 }}
                >
                  <Icon />
                </motion.div>

                <span
                  className="text-sm sm:text-base font-medium tracking-wide
                             text-white transition-colors duration-300
                             group-hover:text-yellow-300 text-center px-2"
                >
                  {service.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full rounded-3xl
                          bg-zinc-900 border border-white/20
                          p-6 sm:p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setActiveService(null)}
                whileHover={{ rotate: 90 }}
                className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl transition"
              >
                ×
              </motion.button>

              <motion.div
                className="text-5xl text-yellow-400 mx-auto mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <activeService.icon />
              </motion.div>

              <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl sm:text-2xl font-semibold text-white mb-3">
                {activeService.title}
              </motion.h3>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/80 text-sm sm:text-base">
                {activeService.desc}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
