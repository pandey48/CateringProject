import React, { useState } from "react";
import logo from "../assets/logopc.png";
import { Phone, Instagram, Menu, X } from "lucide-react";

export default function Pnavbar() {
  const [open, setOpen] = useState(false);

  // Function to close menu when a link is clicked
  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-2">

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-24 h-14" />
          <h3 className="text-lg md:text-2xl font-bold text-yellow-600">
            Catering & Event Management
          </h3>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 bg-amber-200" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links */}
        <div className={`flex-col md:flex-row md:flex md:space-x-6 
        absolute md:static top-16 left-0 w-full md:w-auto bg-white 
        md:bg-transparent shadow-md md:shadow-none p-4 md:p-0
        transition-all duration-300 
        ${open ? "flex" : "hidden"}`}>

          {/* Add onClick to close menu on mobile */}
          <a href="#about" onClick={handleLinkClick} className="hover:text-yellow-600 py-2">About</a>
          <a href="#menu" onClick={handleLinkClick} className="hover:text-yellow-600 py-2">Menu</a>
          <a href="#services" onClick={handleLinkClick} className="hover:text-yellow-600 py-2">Services</a>
          <a href="#contact" onClick={handleLinkClick} className="hover:text-yellow-600 py-2">Contact</a>
        </div>

        {/* Icons */}
        <div className="hidden md:flex gap-3">
          <a href="https://www.instagram.com/pandey_caterrs" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-pink-600" />
          </a>

          <a href="tel:+917389368597">
            <Phone className="w-6 h-6 text-green-600" />
          </a>
        </div>
      </div>
    </nav>
  );
}
