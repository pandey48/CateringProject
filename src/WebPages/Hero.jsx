import cateringImg from "../assets/images/catering.jpg";
import { Phone, Instagram, Menu, X } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${cateringImg})`,
      }}
    >
      <div className="bg-black/60 p-3 sm:p-10 rounded-xl text-center max-w-2xl mx-4
                animate-fadeInUp">
  <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
    Premium Catering Services
  </h1>

  <p className="text-white text-base sm:text-lg mb-6">
    Delicious food & professional service for all occasions.
  </p>

  <a
    href="#contact"
    className="inline-block bg-yellow-500 hover:bg-yellow-600
               transition transform hover:scale-105 px-6 py-3 rounded
               text-white font-semibold"
  >
    Book Now
  </a>
  <div className="hidden md:flex gap-3">
          <a href="https://www.instagram.com/pandey_caterrs" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-pink-600" />
          </a>

          <a href="tel:+917389368597">
            <Phone className="w-6 h-6 text-green-600" />
          </a>
        </div>
</div>
 

    </section>
  );
}
