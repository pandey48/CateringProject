import React from "react";
import Hero from "./Hero";
import About from "./About";
import Footer from "./Footer";
import Pnavbar from "./Pnavbar";
import ServicesSection from "./ServicesSection";
import  Enqury from "./Enqury";
import WhyChooseUs from "./WhyChooseUs";
import Statss from "./Statss";
import Contact from "./Conatact";
import Services from "./Services";




export default function Home(){
    return(
        <div className="bg-gray-50 max-w-full text-gray-800">
            <Pnavbar/>
            <Hero/>
            <WhyChooseUs/>
            <Services/>
            <ServicesSection/>
             <Statss/>
             
            <About/>
            
            <Contact/>

            
            
            <Footer/>

        </div>

    )
}
