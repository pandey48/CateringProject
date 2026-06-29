import {
  Facebook,
  Instagram,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Company */}

        <div>

          <h2 className="text-3xl font-bold text-orange-500">
            Pandey Catering
          </h2>

          <p className="mt-4 text-gray-400">
            Premium Catering & Event Management
            for Weddings, Birthdays,
            Corporate Events and Special Occasions.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li><a href="#about">About</a></li>

            <li><a href="#menu">Menu</a></li>

            <li><a href="#gallery">Gallery</a></li>

            <li><a href="#contact">Contact</a></li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">

            <div className="flex gap-3">
              <Phone size={18}/>
              +91 73893 68597
            </div>

            <div className="flex gap-3">
              <Mail size={18}/>
              pandeycatering@gmail.com
            </div>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-5">

            <a
              href="https://www.instagram.com/pandey_caterrs"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="hover:text-orange-500 transition"/>
            </a>

            <a href="#">
              <Facebook className="hover:text-orange-500 transition"/>
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-5 text-gray-400">

        © {new Date().getFullYear()} Pandey Catering.
        All Rights Reserved.

      </div>

    </footer>
  );
}