
import React from "react";
import Pnavbar from "./Pnavbar";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Services from "./Services";
import ServicesSection from "./ServicesSection";
import Statss from "./Statss";
import About from "./About";
import Contact from "./Conatact";
import Footer from "./Footer";

function Home() {
  return (
    <div className="max-w-full bg-[#fffaf5] text-slate-800">
      <Pnavbar />
      <Hero />
      <WhyChooseUs />
      <Services />
      <ServicesSection />
      <Statss />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default React.memo(Home);
