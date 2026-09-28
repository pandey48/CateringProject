
import React from "react";
import Pnavbar from "./Pnavbar";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import Services from "./Services";
import ServicesSection from "./ServicesSection";
import Gallery from "./Gailery";
import Statss from "./Statss";
import About from "./About";
import Contact from "./Conatact";
import Footer from "./Footer";
import LeadForm from "../components/LeadForm";
import CateringCarousel from "../components/CateringCarousel";
import CoreServices from "../components/CoreServices";
import HomeHighlights from "../components/HomeHighlights";
import HowItWorks from "../components/HowItWorks";
import FinalCTA from "../components/FinalCTA";
import HeroBenefits from "../components/HeroBenefits";
import ServicesPage from "./ServicesPage";
function Home() {
  return (
    <div className="max-w-full bg-[#fffaf5] text-slate-800">
      <Pnavbar />
      <Hero />
      <div className="home-feature-sequence">
        <HeroBenefits />
        <CoreServices />
      <CateringCarousel />
      <HomeHighlights />
        <WhyChooseUs />
       
      </div>
    <ServicesPage/>
      <HowItWorks />
      {/* <Services /> */}
      <ServicesSection />
      <LeadForm />
      <Gallery />
      <Statss />
      <About />
      <Contact />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default React.memo(Home);
