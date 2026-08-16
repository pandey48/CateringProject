
import React, { Suspense, lazy, useEffect } from "react";
import Pnavbar from "./Pnavbar";

const Hero = lazy(() => import("./Hero"));
const WhyChooseUs = lazy(() => import("./WhyChooseUs"));
const Services = lazy(() => import("./Services"));
const ServicesSection = lazy(() => import("./ServicesSection"));
const Statss = lazy(() => import("./Statss"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Conatact"));
const Footer = lazy(() => import("./Footer"));

function Home() {
  useEffect(() => {
    // Warm-up important chunks shortly after mount to improve navigation speed
    const t = setTimeout(() => {
      import("./Hero");
      import("./Services");
      import("./About");
      import("./Footer");
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-gray-50 max-w-full text-gray-800">
      <Pnavbar />
      <Suspense fallback={<div aria-busy="true">Loading...</div>}>
        <Hero />
        <WhyChooseUs />
        <Services />
        <ServicesSection />
        <Statss />
        <About />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default React.memo(Home);
