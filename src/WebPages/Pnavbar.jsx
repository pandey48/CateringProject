"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logopc.png";
import { useRouter } from "next/navigation";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Calendar,
} from "lucide-react";

export default function Pnavbar({ showQuickActions = true, fixed = true }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const router = useRouter();
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Catering", href: "/#catering-service" },
    { label: "Events", href: "/#event-service" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`home-site-nav ${fixed ? "fixed left-1/2 top-3 z-50 -translate-x-1/2 sm:top-5" : "relative mx-auto"} w-[calc(100%-1.5rem)] max-w-[1420px] rounded-2xl border border-white/70 transition-all duration-500 sm:w-[calc(100%-3rem)] ${
          scroll ? "bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur-md" : "bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-md"
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={logo.src}
            alt="Pandey Event Management Logo"
            className="h-12 w-12 object-contain md:h-16 md:w-16"
          />

          <div>
            <h2 className="font-serif text-lg font-bold tracking-tight text-[#142d2d] sm:text-xl md:text-2xl">
              Pandey  
            </h2>
            <p className="text-[10px] leading-tight text-slate-600 sm:text-xs">
              Catering and Event Services
            </p>
          </div>
        </motion.div>

        <div className="hidden items-center gap-5 text-[13px] font-medium text-slate-800 lg:flex xl:gap-7">
          {links.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="group relative transition hover:text-amber-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] bg-orange-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+917389368597" className="rounded-full border border-[#ded6c8] px-4 py-2.5 text-sm font-semibold text-[#173332] transition hover:border-[#bd861a] hover:text-[#94640f]">Call Us</a>
          <a href="https://wa.me/917389368597" target="_blank" rel="noreferrer" className="rounded-full border border-[#ded6c8] px-4 py-2.5 text-sm font-semibold text-[#173332] transition hover:border-[#bd861a] hover:text-[#94640f]">WhatsApp</a>
          <motion.button
            onClick={() => router.push("/booking")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-[#bd861a] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/15 transition hover:bg-[#a87512]"
          >
            <Calendar size={16} />
            Book Now
          </motion.button>
        </div>

        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-800 transition hover:bg-amber-50 lg:hidden"
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
        className="overflow-hidden lg:hidden"
      >
        <div className="border-t border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-2">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {item.label}
              </a>
            ))}

            <motion.button
              onClick={() => router.push("/booking")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 rounded-full bg-[#bd861a] px-5 py-3 text-sm font-semibold text-white"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      </motion.nav>

      {showQuickActions && <div className="fixed bottom-20 right-4 z-[60] flex flex-col gap-2 md:bottom-5">
        <a
          href="https://wa.me/917389368597"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-900/20 transition duration-200 hover:scale-110 hover:bg-green-600 active:scale-95"
        >
          <MessageCircle size={21} />
        </a>
        <a
          href="tel:+917389368597"
          aria-label="Call Pandey Event Management"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:scale-110 hover:bg-blue-600 active:scale-95"
        >
          <Phone size={20} />
        </a>
      </div>}

      {showQuickActions && <div className="fixed inset-x-3 bottom-3 z-50 flex gap-2 md:hidden">
        <a
          href="/enqury"
          className="flex flex-1 items-center justify-center rounded-xl border border-orange-500 bg-white px-4 py-3 text-sm font-semibold text-orange-600 shadow-lg shadow-slate-900/10 transition duration-200 hover:scale-[1.03] hover:bg-orange-50 active:scale-95"
        >
          Enquiry
        </a>
        <a
          href="/booking"
          className="flex flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/20 transition duration-200 hover:scale-[1.03] hover:bg-orange-600 active:scale-95"
        >
          Book Now
        </a>
      </div>}
    </>
  );
}
