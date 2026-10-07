"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Star, UtensilsCrossed, UsersRound } from "lucide-react";

const heroPhotos = [
  "/images/pandey-catering-event-buffet.webp",
  "/images/pandey-catering-wedding-celebration.webp",
  "/images/pandey-catering-dessert-counter.webp",
];

const promises = ["Professional Cooks", "Fresh Catering", "Complete Event Setup"];

export default function Hero() {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % heroPhotos.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__layout">
        <motion.div
          className="home-hero__copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="home-hero__eyebrow"><Star size={15} fill="currentColor" /> Trusted Event Management Services</span>
          <h1 id="home-hero-title">Pandey Catering – <span>Wedding &amp; Event Catering Services</span></h1>
          <p className="home-hero__tagline">कुक <i>·</i> कैटरिंग <i>·</i> इवेंट</p>
          <p className="home-hero__promise">आपका Event, हमारी जिम्मेदारी</p>
          <p className="home-hero__capacity">
            <span className="home-hero__capacity-desktop">Serving 10 to 1000+ Guests</span>
            <span className="home-hero__capacity-mobile">10 से 1000+ लोगों तक के लिए कैटरिंग सेवा</span>
          </p>
          <p className="home-hero__description">
            Wedding, party and event catering with vegetarian menus, professional cooks and complete food service for family celebrations in Hanumana and nearby areas.
          </p>
          <div className="home-hero__actions">
            <a className="home-hero__button" href="#quote"><CalendarDays size={17} /> Get a Free Quote</a>
            <a className="home-hero__button home-hero__button--secondary" href="#services">Explore Services <ArrowUpRight size={17} /></a>
          </div>
        </motion.div>

        <motion.div
          className="home-hero__visual"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <Image
            src={heroPhotos[activePhoto]}
            alt="Buffet catering and event setup for a celebration"
            className="home-hero__photo"
            fill
            priority
            loading="eager"
            sizes="(max-width: 680px) 100vw, 55vw"
          />
          <div className="home-hero__photo-label">
            <div className="home-hero__photo-label-title">All in 1 · Complete Food &amp; Event Service</div>
            <div className="home-hero__photo-label-points">
              {promises.map((label) => (
                <span key={label}><Check size={14} />{label}</span>
              ))}
            </div>
            <p><UsersRound size={15} /> 10 से 1000+ मेहमानों तक</p>
          </div>
          <div className="home-hero__photo-label-mobile">
            <UtensilsCrossed size={27} aria-hidden="true" />
            <div>
              <strong>Delicious Catering</strong>
              <span>Fresh Food <i>·</i> Great Taste <i>·</i> Happy Guests</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
