
import React, { Suspense, lazy } from "react";
import Pnavbar from "./Pnavbar";

const Hero = lazy(() => import("./Hero"));
const WhyChooseUs = lazy(() => import("./WhyChooseUs"));
const Services = lazy(() => import("./Services"));
const ServicesSection = lazy(() => import("./ServicesSection"));
const Statss = lazy(() => import("./Statss"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Conatact"));
const Footer = lazy(() => import("./Footer"));

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#fffaf5] text-sm font-medium text-slate-500" aria-busy="true">
    Loading experience...
  </div>
);

function Home() {
  return (
    <div className="max-w-full bg-[#fffaf5] text-slate-800">
      <Pnavbar />
      <Suspense fallback={<LoadingScreen />}>
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
