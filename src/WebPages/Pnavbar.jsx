import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logopc.png";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Instagram,
  Menu,
  X,
  Calendar,
} from "lucide-react";

export default function Pnavbar() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scroll ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={logo}
            alt="Pandey Catering Logo"
            className="h-12 w-12 object-contain md:h-16 md:w-16"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />

          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-orange-600 sm:text-xl md:text-2xl">
              Pandey Catering
            </h2>
            <p className="hidden text-xs text-slate-600 md:block">
              Catering & Event Management
            </p>
          </div>
        </motion.div>

        <div className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
          {[
            "About",
            "Menu",
            "Services",
            "Gallery",
            "Contact",
          ].map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative transition hover:text-orange-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {item}
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] bg-orange-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <motion.a
            href="https://www.instagram.com/pandey_caterrs"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition"
          >
            <Instagram size={18} />
          </motion.a>

          <motion.a
            href="tel:+917389368597"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 transition"
          >
            <Phone size={18} />
          </motion.a>

          <motion.button
            onClick={() => navigate("/booking")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Calendar size={16} />
            Book Now
          </motion.button>
        </div>

        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-white/40 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <div className="border-t border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-2">
            {[
              "About",
              "Menu",
              "Services",
              "Gallery",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {item}
              </a>
            ))}

            <motion.button
              onClick={() => navigate("/booking")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}