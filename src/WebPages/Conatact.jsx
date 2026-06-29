import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <span className="text-orange-500 uppercase tracking-widest font-semibold">
            Contact Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
            Let's Plan Your Next Event
          </h2>

          <p className="mt-4 text-gray-600">
            Get in touch with us for weddings, birthdays,
            corporate events and catering bookings.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <div className="flex gap-5 bg-white rounded-2xl p-6 shadow">

              <Phone className="text-orange-500" size={35} />

              <div>
                <h3 className="font-bold text-xl">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 73893 68597
                </p>

              </div>

            </div>

            <div className="flex gap-5 bg-white rounded-2xl p-6 shadow">

              <Mail className="text-orange-500" size={35} />

              <div>
                <h3 className="font-bold text-xl">
                  Email
                </h3>

                <p className="text-gray-600">
                  pandeycatering@gmail.com
                </p>

              </div>

            </div>

            <div className="flex gap-5 bg-white rounded-2xl p-6 shadow">

              <MapPin className="text-orange-500" size={35} />

              <div>

                <h3 className="font-bold text-xl">
                  Address
                </h3>

                <p className="text-gray-600">
                  Rewa, Madhya Pradesh
                </p>

              </div>

            </div>

            <div className="flex gap-5 bg-white rounded-2xl p-6 shadow">

              <Clock className="text-orange-500" size={35} />

              <div>

                <h3 className="font-bold text-xl">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Mon - Sun : 8:00 AM - 10:00 PM
                </p>

              </div>

            </div>

          </motion.div>

          {/* Right */}

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 space-y-5"
          >

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl p-4 outline-orange-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-xl p-4 outline-orange-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-xl p-4 outline-orange-500"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full border rounded-xl p-4 outline-orange-500"
            />

            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition"
            >
              Send Message
            </button>

          </motion.form>

        </div>

      </div>
    </section>
  );
}