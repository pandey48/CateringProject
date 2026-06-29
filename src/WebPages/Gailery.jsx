import { motion } from "framer-motion";
import { Eye } from "lucide-react";

import img1 from "../assets/gallery/wedding1.jpg";
import img2 from "../assets/gallery/wedding2.jpg";
import img3 from "../assets/gallery/buffet.jpg";
import img4 from "../assets/gallery/birthday.jpg";
import img5 from "../assets/gallery/corporate.jpg";
import img6 from "../assets/gallery/sweets.jpg";

const images = [
  {
    image: img1,
    title: "Wedding Catering",
  },
  {
    image: img2,
    title: "Royal Decoration",
  },
  {
    image: img3,
    title: "Buffet Service",
  },
  {
    image: img4,
    title: "Birthday Party",
  },
  {
    image: img5,
    title: "Corporate Event",
  },
  {
    image: img6,
    title: "Delicious Sweets",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-orange-400 font-semibold uppercase tracking-widest">
            Gallery
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Our Beautiful Events
          </h2>

          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Every event tells a story. Explore some memorable moments
            from weddings, birthdays, corporate events and catering
            services.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover duration-700 group-hover:scale-110"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 duration-500 flex flex-col justify-center items-center">

                <Eye
                  className="text-white mb-4"
                  size={45}
                />

                <h3 className="text-white text-2xl font-bold">
                  {item.title}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}