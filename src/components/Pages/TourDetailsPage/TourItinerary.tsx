"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react";

type MealFlags = {
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  [key: string]: unknown;
};

type ItineraryDay = {
  day?: number;
  title?: string;
  description?: string;
  location?: string;
  activities?: string[];
  meals?: MealFlags;
  accommodation?: string;
  [key: string]: unknown;
};

type Tour = {
  id?: string | number;
  title?: string;
  subtitle?: string;
  description?: string;
  route?: string;
  duration?: string;
  itinerary?: ItineraryDay[];
  image?: string;
  heroImage?: string;
  price?: string | number;
  [key: string]: unknown;
};

const TourItinerary: React.FC<{ tour: Tour }> = ({ tour }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  // Animation variants consistent with the codebase style
  const accordionVariants: Variants = {
    hidden: {
      height: 0,
      opacity: 0,
      transform: "translate3d(0, -10px, 0)",
    },
    visible: {
      height: "auto",
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Enhanced JSON-LD for TouristTrip/TravelAction structured data
  const tourJsonLd =
    tour && Array.isArray(tour.itinerary) && tour.itinerary.length
      ? {
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.title || "Tour Package",
          description: tour.subtitle || tour.description || `${tour.title} itinerary`,
          image: tour.heroImage || tour.image || undefined,
          touristType: "leisure",
          duration: tour.duration || undefined,
          ...(tour.price && {
            offers: {
              "@type": "Offer",
              price: typeof tour.price === "string" ? tour.price.replace(/[^\d.]/g, "") : tour.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
          itinerary: (tour.itinerary as ItineraryDay[]).map((day: ItineraryDay, idx: number) => ({
            "@type": "TouristAttraction",
            name: `Day ${day.day !== undefined ? day.day : idx + 1}: ${day.title || "Tour Day"}`,
            description: day.description || undefined,
            address: day.location
              ? {
                  "@type": "PostalAddress",
                  addressLocality: day.location,
                }
              : undefined,
            ...(Array.isArray(day.activities) && day.activities.length > 0 && {
              potentialAction: day.activities.map((activity: string) => ({
                "@type": "Action",
                name: activity,
              })),
            }),
          })),
          subTrip: (tour.itinerary as ItineraryDay[]).map((day: ItineraryDay, idx: number) => ({
            "@type": "Trip",
            name: `Day ${day.day !== undefined ? day.day : idx + 1}`,
            description: day.description || undefined,
            partOfTrip: {
              "@type": "TouristTrip",
              name: tour.title,
            },
            ...(day.location && {
              arrivalLocation: {
                "@type": "Place",
                name: day.location,
              },
            }),
            ...(day.accommodation && {
              accommodationBooking: {
                "@type": "LodgingReservation",
                lodgingBusiness: {
                  "@type": "LodgingBusiness",
                  name: day.accommodation,
                },
              },
            }),
          })),
        }
      : null;

  if (!tour.itinerary || tour.itinerary.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Tour Itinerary</h2>

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Route</span>
              <p className="font-medium text-sm sm:text-base text-gray-800">{tour.route || "Various destinations"}</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />

          <div className="flex items-center">
            <Clock size={16} className="text-orange-500 mr-2 flex-shrink-0" />
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Duration</span>
              <p className="font-medium text-sm sm:text-base text-gray-800">{tour.duration || "N/A"}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 italic text-center py-6 sm:py-8 text-sm sm:text-base">
          Detailed itinerary for this tour is currently being updated. Please contact us for more information.
        </p>
      </div>
    );
  }

  const metaTitle = tour?.title ? `${tour.title} — Day-by-Day Itinerary & Highlights | Safari Sutra` : "Tour Itinerary — Day-by-Day | Safari Sutra";
  const metaDescription = (tour?.subtitle || tour?.description || "").slice(0, 160) || `${tour?.title || "Tour"} itinerary and day by day schedule.`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? window.location.href
              : `https://thesafarisutra.com/tour/${tour?.id ?? ""}/itinerary`
          }
        />
        {tourJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
          />
        )}
      </Head>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Tour Itinerary</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center">
          <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Route</span>
            <p className="font-medium text-sm sm:text-base text-gray-800">{tour.route || "Various destinations"}</p>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />

        <div className="flex items-center">
          <Clock size={16} className="text-orange-500 mr-2 flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Duration</span>
            <p className="font-medium text-sm sm:text-base text-gray-800">{tour.duration || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {(tour.itinerary as ItineraryDay[]).map((day: ItineraryDay, index: number) => (
          <div key={`day-${day.day !== undefined ? day.day : index}`} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className={`flex justify-between items-center w-full p-3 sm:p-4 text-left focus:outline-none transition-colors ${openAccordion === index ? "bg-orange-50" : "bg-white hover:bg-gray-50"}`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={openAccordion === index}
              type="button"
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base text-gray-800">
                  Day {day.day !== undefined ? day.day : index + 1}: {day.title}
                </h3>
                {day.location && (
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center mt-1">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    {day.location}
                  </p>
                )}
              </div>
              {openAccordion === index ? <ChevronUp size={18} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />}
            </button>

            <AnimatePresence initial={false}>
              {openAccordion === index && (
                <motion.div key={`day-content-${index}`} variants={accordionVariants} initial="hidden" animate="visible" exit="hidden" className="border-t border-gray-200">
                  <div className="p-3 sm:p-4">
                    <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base text-justify" style={{ textAlignLast: "left" }}>
                      {day.description}
                    </p>

                    {Array.isArray(day.activities) && day.activities.length > 0 && (
                      <div className="space-y-1 sm:space-y-2">
                        <h4 className="font-medium text-sm sm:text-base text-gray-800">Activities:</h4>
                        <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                          {day.activities.map((activity: string, idx: number) => (
                            <li key={idx} className="text-gray-700 text-sm sm:text-base">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {day.meals && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1 sm:mb-2">Meals:</h4>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          {day.meals.breakfast && <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm">Breakfast</span>}
                          {day.meals.lunch && <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm">Lunch</span>}
                          {day.meals.dinner && <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm">Dinner</span>}
                        </div>
                      </div>
                    )}

                    {day.accommodation && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1">Accommodation:</h4>
                        <p className="text-gray-700 text-sm sm:text-base">{day.accommodation}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100 text-gray-700">
        <p className="font-medium text-orange-800 mb-1 sm:mb-2 text-sm sm:text-base">Important Note:</p>
        <p className="text-sm sm:text-base text-justify" style={{ textAlignLast: "left" }}>
          Itinerary is subject to change based on local conditions, weather, and other factors. We&apos;ll do our best to adhere to the schedule but flexibility may be required.
        </p>
      </div>
    </div>
  );
};

export default TourItinerary;
