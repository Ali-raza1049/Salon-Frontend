import React from 'react'
import Navbar from "../../components/customer/Navbar.jsx";
import Hero from "../../components/customer/Hero.jsx";
import FeaturedServices from "../../components/customer/FeaturedService.jsx";
import ExpertSection from "../../components/customer/ExpertSection.jsx";
import Testimonials from "../../components/customer/Testimonials.jsx";
import Footer from "../../components/customer/Footer.jsx"; 

export const HomePage = () => {
  return (
    <>
       
        <Hero />
        <FeaturedServices />
        <ExpertSection />
        <Testimonials />
        <Footer />
    </>
  )
}
