// File: src/pages/ToursPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllTours } from "../services/api";

//Checkmark icon for highlights
const CheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getAllTours();
        const toursData =
          response.data.tours ||
          response.data.data?.tours ||
          response.data ||
          [];
        setTours(toursData);
      } catch (err) {
        setError("Failed to fetch tours. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <div className="text-center py-10">Loading tours...</div>;
  if (error)
    return <div className="text-center py-10 text-destructive">{error}</div>;

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-foreground">
          Explore All Our Tours
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find your next adventure from our curated list of experiences.
        </p>
      </div>

      <div className="relative w-full max-w-5xl">
        <Carousel
          opts={{ align: "start" }}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className="-mt-4 h-[450px]">
            {tours.map((tour) => (
              <CarouselItem key={tour._id} className="pt-4 md:basis-full">
                <div className="p-1 h-full">
                  {/* the card now  the image as  background */}
                  <Card
                    className="h-full w-full bg-cover bg-center rounded-xl relative flex items-center"
                    style={{
                      backgroundImage: `url(http://localhost:3000/${tour.image[2]})`,
                    }}
                  >
                    {/* this div is the gradient overlay and it covers the whole card means all the tours details in single card  */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/60 to-black/80 rounded-xl"></div>

                    {/* the content means tour details name,price,highlights  is now placed on top of the gradient overlay */}
                    <div className="relative w-1/2 p-8 ml-auto text-white">
                      <CardContent className="flex flex-col justify-center h-full">
                        <div>
                          <p className="text-md font-semibold text-white/80">
                            {tour.location}
                          </p>
                          <h3 className="text-4xl font-bold mt-2">
                            {tour.title}
                          </h3>
                          <p className="text-lg text-white/70 mt-4">
                            {tour.duration} Days
                          </p>
                          <div className="mt-6">
                            <ul className="space-y-2">
                              {tour.highlights
                                .slice(0, 3)
                                .map((highlight, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-white/90"
                                  >
                                    <CheckIcon className="h-5 w-5 text-white/90 mr-3 flex-shrink-0" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full mt-8">
                          <div className="text-4xl font-bold">
                            ₹{tour.price.toLocaleString("en-IN")}
                          </div>
                          <Link to={`/tours/${tour._id}`}>
                            <Button size="lg" variant="secondary">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-60px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-60px] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}

export default ToursPage;
