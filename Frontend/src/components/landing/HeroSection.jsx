import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2070&q=80"
        alt="Breathtaking mountain lake"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight shadow-lg">
          Incredible Adventures, Effortlessly Booked.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto shadow-md">
          Discover and book unforgettable tours to the world's most breathtaking
          destinations.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/tours">Explore All Tours</Link>
        </Button>
      </div>
    </section>
  );
};
