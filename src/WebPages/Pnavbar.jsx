import React, { useState, useEffect } from "react";
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
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scroll
          ? "bg-white/95 backdrop-blur-lg shadow-xl py-2"
          : "bg-transparent "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4  flex justify-between items-center mt-0">
        {/* Logo */}

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt=""
            className="w-12 h-12 md:w-20 md:h-20 object-contain"
          />

          <div>

            <h2 className="font-bold text-xl md:text-2xl text-orange-600">
              Pandey Catering
            </h2>

            <p className="text-xs text-gray-600 hidden md:block">
              Catering & Event Management
            </p>

          </div>

        </div>

        {/* Desktop Menu */}

        <div className="hidden sticky top-0 z-50 md:flex items-center gap-8 font-medium">

          {["About","Menu","Services","Gallery","Contact"].map((item)=>(
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group hover:text-orange-500 transition"
            >
              {item}

              <span className="absolute left-0 -bottom-1 h-[2px] bg-orange-500 w-0 group-hover:w-full transition-all duration-300"></span>

            </a>
          ))}

        </div>

        {/* Right Side */}

        <div className="hidden md:flex items-center gap-4">

          <a href="https://www.instagram.com/pandey_caterrs">
            <Instagram className="text-pink-600 hover:scale-125 duration-300" />
          </a>

          <a href="tel:+917389368597">
            <Phone className="text-green-600 hover:scale-125 duration-300" />
          </a>

          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 duration-300"
          >
            <Calendar size={18} />
            Book Now
          </button>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`md:hidden overflow-hidden  transition-all duration-500 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >

        <div className="bg-white shadow-lg flex flex-col p-5">

          {["About","Menu","Services","Gallery","Contact"].map((item)=>(
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={handleLinkClick}
              className="py-3 border-b hover:text-orange-500"
            >
              {item}
            </a>
          ))}

          <button onClick={() => navigate("/booking")}
            className="mt-5 bg-orange-500 text-white py-3 rounded-full"
          >
            Book Now
          </button>
          

        </div>

      </div>

    </nav>
  );
}