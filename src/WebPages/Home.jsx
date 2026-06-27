import React from "react";
import Hero from "./Hero";
import About from "./About";

import Services from "./Services";
import Contact from "./Booking";
import Footer from "./Footer";
import Pnavbar from "./Pnavbar";
import ServicesSection from "./ServicesSection";
import  Enqury from "./Enqury";

export default function Home(){
    return(
        <div className="bg-gray-50 max-w-full text-gray-800">
            <Pnavbar/>
            <Hero/>
             <Services/>
             <ServicesSection/>
            <About/>
            <Contact/>
            <Enqury/>
            <Footer/>

        </div>

    )
}
