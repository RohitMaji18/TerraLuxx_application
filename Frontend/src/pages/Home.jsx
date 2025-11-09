import React from "react";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { TopToursSection } from "../components/landing/TopToursSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CallToActionSection } from "../components/landing/CallToActionSection";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TopToursSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
