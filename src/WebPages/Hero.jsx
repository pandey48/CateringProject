import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cateringImg from "../assets/images/catering.jpg";
import {
  Phone,
  Instagram,
  Star,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section
  className="relative min-h-screen pt-25 bg-cover bg-center"
  style={{
    backgroundImage: `url(${cateringImg})`,
  }}
>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">

        <div className="max-w-7xl mx-auto   px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full mb-5">
              ⭐ Since 2010 • Premium Catering
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Making Every
              <span className="text-orange-400">
                {" "}Celebration
              </span>
              {" "}Delicious
            </h1>

            <p className="text-gray-200 text-lg mt-6 max-w-xl">
              Wedding, Birthday, Corporate Events,
              House Parties and Outdoor Catering with
              authentic taste and unforgettable service.
            </p>

            <div className="flex gap-4 mt-8">

              <button onClick={() => navigate("/booking")}
           className="border  bg-orange-500 border-white text-white hover:bg-white hover:text-black px-7 py-4 rounded-full transition"
          >
            Book Now
          </button>

              <a
                href="#menu"
                className="border border-white text-white hover:bg-white hover:text-black px-7 py-4 rounded-full transition"
              >
                Explore Menu
              </a>

            </div>

            {/* Rating */}

            <div className="flex items-center gap-3 mt-10">

              <div className="flex text-yellow-400">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>

              <p className="text-white">
                500+ Happy Events
              </p>

            </div>

            {/* Contact */}

            <div className="flex gap-5 mt-8">

              <a
                href="tel:+917389368597"
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition"
              >
                <Phone className="text-white" />
              </a>

              <a
                href="https://www.instagram.com/pandey_caterrs"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center hover:scale-110 transition"
              >
                <Instagram className="text-white" />
              </a>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden md:flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">

              <h3 className="text-3xl text-white font-bold mb-4">
                Why Choose Us?
              </h3>

              <ul className="space-y-4 text-gray-200">
                <li>✔ 15+ Years Experience</li>
                <li>✔ 500+ Successful Events</li>
                <li>✔ Fresh & Hygienic Food</li>
                <li>✔ Professional Staff</li>
                <li>✔ Affordable Packages</li>
              </ul>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={34} />
      </div>

    </section>
  );
}