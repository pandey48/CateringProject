import { useState } from "react";
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
      className="w-full py-5"
      style={{ backgroundImage: `url(${cateringImg})` }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-center text-white mb-14 sm:mb-20">
          Our Services
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.title}
                onClick={() => setActiveService(service)}
                className="group h-36 sm:h-40 rounded-2xl
                           bg-white/10 backdrop-blur-md
                           border border-white/20
                           flex flex-col items-center justify-center
                           transition-all duration-300
                           hover:border-yellow-400/60
                           hover:shadow-[0_0_25px_rgba(255,215,0,0.35)]
                           focus:outline-none"
              >
                <Icon
                  className="text-3xl sm:text-4xl mb-3
                             text-white transition-colors duration-300
                             group-hover:text-yellow-300"
                />

                <span
                  className="text-sm sm:text-base font-medium tracking-wide
                             text-white transition-colors duration-300
                             group-hover:text-yellow-300 text-center px-2"
                >
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative max-w-md w-full rounded-2xl
                          bg-zinc-900 border border-white/20
                          p-6 sm:p-8 text-center">
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl"
            >
              ×
            </button>

            <activeService.icon className="text-5xl text-yellow-400 mx-auto mb-4" />

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              {activeService.title}
            </h3>

            <p className="text-white/80 text-sm sm:text-base">
              {activeService.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
