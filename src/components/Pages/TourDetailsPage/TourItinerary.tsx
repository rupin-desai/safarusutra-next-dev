import React from "react";
import Head from "next/head";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react";

const TourItinerary = ({
  tour,
  openAccordion,
  toggleAccordion,
}: {
  tour: any;
  openAccordion: number | null;
  toggleAccordion: (index: number) => void;
}) => {
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

  // build JSON-LD ItemList for itinerary (improves SEO indexing of day-by-day itinerary)
  const itineraryJsonLd =
    Array.isArray(tour?.itinerary) && tour.itinerary.length
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${tour.title || "Tour"} - Itinerary`,
          description:
            tour.subtitle || tour.description || `${tour.title} itinerary`,
          itemListElement: tour.itinerary.map((day: any, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: `Day ${day.day !== undefined ? day.day : idx + 1}: ${
              day.title || ""
            }`,
            description: day.description || "",
          })),
        }
      : null;

  // If tour has no itinerary, show a message
  if (!tour.itinerary || !tour.itinerary.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Tour Itinerary
        </h2>

        {/* Route and Duration summary */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Route</span>
              <p className="font-medium text-sm sm:text-base text-gray-800">
                {tour.route || "Various destinations"}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-gray-300 mx-2"></div>

          <div className="flex items-center">
            <Clock size={16} className="text-orange-500 mr-2 flex-shrink-0" />
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Duration</span>
              <p className="font-medium text-sm sm:text-base text-gray-800">
                {tour.duration || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 italic text-center py-6 sm:py-8 text-sm sm:text-base">
          Detailed itinerary for this tour is currently being updated. Please
          contact us for more information.
        </p>
      </div>
    );
  }

  // Add page title/meta for better SEO (specific, keyword-rich)
  const metaTitle = tour?.title
    ? `${tour.title} — Day-by-Day Itinerary & Highlights | Safari Sutra`
    : "Tour Itinerary — Day-by-Day | Safari Sutra";
  const metaDescription =
    (tour?.subtitle || tour?.description || "").slice(0, 160) ||
    `${tour?.title || "Tour"} itinerary and day by day schedule.`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
      {/* Inject JSON-LD + SEO meta into head for SEO crawlers */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? window.location.href
              : `https://thesafarisutra.com/tour/${tour?.id || ""}/itinerary`
          }
        />
        {itineraryJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itineraryJsonLd) }}
          />
        )}
      </Head>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
        Tour Itinerary
      </h2>

      {/* Route and Duration summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center">
          <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Route</span>
            <p className="font-medium text-sm sm:text-base text-gray-800">
              {tour.route || "Various destinations"}
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-300 mx-2"></div>

        <div className="flex items-center">
          <Clock size={16} className="text-orange-500 mr-2 flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Duration</span>
            <p className="font-medium text-sm sm:text-base text-gray-800">
              {tour.duration || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Day-by-day itinerary */}
      <div className="space-y-3 sm:space-y-4">
        {tour.itinerary.map((day: any, index: number) => (
          <div
            key={`day-${day.day !== undefined ? day.day : index}`}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Day header (always visible) */}
            <button
              className={`flex justify-between items-center w-full p-3 sm:p-4 text-left focus:outline-none transition-colors ${
                openAccordion === index
                  ? "bg-orange-50"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={openAccordion === index}
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base text-gray-800">
                  {/* Use day.day if defined, otherwise use index+1 */}
                  Day {day.day !== undefined ? day.day : index + 1}: {day.title}
                </h3>
                {day.location && (
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center mt-1">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    {day.location}
                  </p>
                )}
              </div>
              {openAccordion === index ? (
                <ChevronUp size={18} className="text-orange-500 flex-shrink-0" />
              ) : (
                <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />
              )}
            </button>

            {/* Day details (expandable) */}
            <AnimatePresence initial={false}>
              {openAccordion === index && (
                <motion.div
                  key={`day-content-${index}`}
                  variants={accordionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="border-t border-gray-200"
                >
                  <div className="p-3 sm:p-4">
                    <p
                      className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base text-justify"
                      style={{ textAlignLast: "left" }}
                    >
                      {day.description}
                    </p>

                    {day.activities && day.activities.length > 0 && (
                      <div className="space-y-1 sm:space-y-2">
                        <h4 className="font-medium text-sm sm:text-base text-gray-800">
                          Activities:
                        </h4>
                        <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                          {day.activities.map((activity: string, idx: number) => (
                            <li
                              key={idx}
                              className="text-gray-700 text-sm sm:text-base"
                            >
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {day.meals && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1 sm:mb-2">
                          Meals:
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          {day.meals.breakfast && (
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm">
                              Breakfast
                            </span>
                          )}
                          {day.meals.lunch && (
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm">
                              Lunch
                            </span>
                          )}
                          {day.meals.dinner && (
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm">
                              Dinner
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {day.accommodation && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1">
                          Accommodation:
                        </h4>
                        <p className="text-gray-700 text-sm sm:text-base">
                          {day.accommodation}
                        </p>
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
        <p className="font-medium text-orange-800 mb-1 sm:mb-2 text-sm sm:text-base">
          Important Note:
        </p>
        <p
          className="text-sm sm:text-base text-justify"
          style={{ textAlignLast: "left" }}
        >
          Itinerary is subject to change based on local conditions, weather, and
          other factors. We'll do our best to adhere to the schedule but
          flexibility may be required.
        </p>
      </div>
    </div>
  );
};

export default TourItinerary;
