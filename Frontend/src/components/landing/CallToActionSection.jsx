import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CallToActionSection = () => (
  <section className="py-16 md:py-24 bg-primary text-primary-foreground text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold">Ready for Your Next Journey?</h2>
      <Button asChild size="lg" variant="secondary" className="mt-8">
        <Link to="/tours">Browse All Available Tours</Link>
      </Button>
    </div>
  </section>
);
