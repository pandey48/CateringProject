import {
  Facebook,
  Instagram,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 sm:text-3xl">Pandey Event Management</h2>
          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            Event planning, catering, decoration, tent, photography, DJ and more for memorable occasions.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a className="transition hover:text-orange-400" href="#about">About</a></li>
            <li><a className="transition hover:text-orange-400" href="#menu">Menu</a></li>
            <li><a className="transition hover:text-orange-400" href="#gallery">Gallery</a></li>
            <li><a className="transition hover:text-orange-400" href="#contact">Contact</a></li>
            <li><a className="transition hover:text-orange-400" href="/enqury">Enquiry</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Contact</h3>
          <div className="space-y-3 text-sm text-gray-400 sm:text-base">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-orange-400" />
              <a className="transition hover:text-orange-400" href="tel:+917389368597">+91 73893 68597</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-orange-400" />
              <a className="transition hover:text-orange-400" href="mailto:pandeycatering@gmail.com">pandeycatering@gmail.com</a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Follow Us</h3>
          <div className="flex gap-5 text-gray-300">
            <a href="https://www.instagram.com/pandey_caterrs" target="_blank" rel="noreferrer" className="rounded-full border border-gray-700 p-2.5 transition hover:border-orange-500 hover:text-orange-400">
              <Instagram size={18} />
            </a>
            <a href="#" className="rounded-full border border-gray-700 p-2.5 transition hover:border-orange-500 hover:text-orange-400">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Pandey Event Management. All Rights Reserved.
      </div>
    </footer>
  );
}