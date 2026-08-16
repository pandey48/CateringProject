import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cateringImg from "../assets/images/catering.jpg";
import {
  Phone,
  Instagram,
  Star,
  ChevronDown,
  Zap,
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    // Preload image without blocking render
    const img = new Image();
    img.src = cateringImg;
    img.onload = () => setBgLoaded(true);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const features = [
    { icon: "👨‍🍳", text: "Expert Chefs & Cooks" },
    { icon: "🥘", text: "120+ Authentic Menu Items" },
    { icon: "✅", text: "Hygienic Food Handling" },
    { icon: "🚀", text: "On-Time Professional Service" },
    { icon: "💚", text: "Affordable Premium Pricing" },
  ];

  return (
    <section
      className="
        relative
        min-h-[720px]
        h-auto
        lg:pt-30
        lg:h-screen
        lg:min-h-[650px]
        lg:max-h-[900px]
        overflow-hidden
        bg-cover
        bg-center
        bg-gradient-to-r
        from-orange-900
        via-orange-800
        to-orange-900
      "
      style={{
        backgroundImage: bgLoaded ? `url(${cateringImg})` : undefined,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/70" />

      {/* Main Content */}
      <div className="relative z-10 flex h-full items-center">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-7xl
            grid-cols-1
            items-center
            gap-10
            px-4
            py-20
            sm:px-6
            lg:grid-cols-[1.4fr_0.6fr]
            lg:gap-8
            lg:px-8
            lg:py-12
            xl:gap-12
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="
              mx-auto
              w-full
              max-w-3xl
              text-center
              lg:mx-0
              lg:text-left
            "
          >
            {/* Badge */}
            <motion.span
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                inline-flex
                
                gap-2
                rounded-full
                bg-orange-500
                px-4
                py-2
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/40
                sm:text-sm
              "
            >
              <Zap size={15} />
              15+ Years • Trusted by 10,000+ Guests
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                mt-5
                text-4xl
                font-black
                leading-[1.08]
                text-white
                sm:text-4xl
                md:text-4xl
                lg:mt-6
                lg:text-4xl
                xl:text-6xl
              "
            >
              Premium

              <motion.span
                className="block text-orange-400 drop-shadow-lg"
                animate={{
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
              >
                Catering & Food
              </motion.span>

              <span className="block">
                for Every Occasion
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-relaxed
                text-gray-100
                sm:text-base
                md:text-lg
                lg:mx-0
              "
            >
              Authentic dishes, professional service, and unforgettable
              culinary experiences for weddings, birthdays, corporate events,
              and celebrations of all sizes.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                mt-6
                flex
                flex-row
                justify-center
                gap-1
                sm:gap-7
                sm:flex-row
                lg:justify-start
              "
            >
              <motion.button
                onClick={() => navigate("/booking")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  px-7
                  py-3.5
                  text-base
                  font-bold
                  text-white
                  shadow-xl
                "
              >
                Book Now
              </motion.button>

              <motion.a
              
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="
                  rounded-full
                  border-2
                  border-white
                  px-7
                  py-3.5
                  text-center
                  text-base
                  font-bold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
               All services
              </motion.a>
            </motion.div>

            {/* Rating */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                mt-6
                flex
                flex-row
                items-center
                gap-4
                sm:flex-row
                lg:justify-start
              "
            >
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-white">
                Trusted by 500+ Families
              </span>
            

            {/* Contact */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                mt-5
                flex
                justify-center
                gap-4
                lg:justify-start
              "
            >
              <motion.a
                href="tel:+917389368597"
                whileHover={{ scale: 1.12 }}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500
                  shadow-lg
                "
              >
                <Phone size={19} className="text-white" />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/pandey_caterrs"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.12 }}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-pink-600
                  shadow-lg
                "
              >
                <Instagram size={19} className="text-white" />
              </motion.a>
            </motion.div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT CARD ================= */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="
              flex
              w-full
              justify-center
              lg:justify-end
            "
          >
            <motion.div
              whileHover={{ y: -6 }}
              className="
                w-full
                max-w-[320px]
                rounded-2xl
                border
                border-white/25
                bg-black/25
                p-5
                shadow-2xl
                backdrop-blur-xl
                lg:max-w-[300px]
                lg:p-5
                xl:max-w-[320px]
              "
            >
              {/* Card Header */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-orange-500
                    text-xl
                  "
                >
                  👨‍🍳
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Why Pandey Catering?
                  </h3>

                  <p className="text-xs text-orange-200">
                    Quality • Taste • Service
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {features.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.7 + idx * 0.1,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      bg-white/10
                      px-3
                      py-2.5
                      text-sm
                      text-gray-100
                    "
                  >
                    <span className="text-lg">
                      {item.icon}
                    </span>

                    <span className="font-medium">
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom Badge */}
              <div
                className="
                  mt-4
                  rounded-xl
                  bg-orange-500/20
                  px-3
                  py-2
                  text-center
                  text-xs
                  font-semibold
                  text-orange-200
                "
              >
                ⭐ Premium Catering Experience
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
          absolute
          bottom-4
          left-1/2
          hidden
          -translate-x-1/2
          text-white
          lg:block
        "
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}