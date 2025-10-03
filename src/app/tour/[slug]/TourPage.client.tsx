"use client";

import React from "react";
import TourHero from "../../../components/Pages/TourDetailsPage/TourHero";
import TourOverview from "../../../components/Pages/TourDetailsPage/TourOverview";
import TourSidebar from "../../../components/Pages/TourDetailsPage/TourSidebar";
import TourItinerary from "../../../components/Pages/TourDetailsPage/TourItinerary";
import TourInclusions from "../../../components/Pages/TourDetailsPage/TourInclusions";
import TourPolicy from "../../../components/Pages/TourDetailsPage/TourPolicy";
import TourTabs from "../../../components/Pages/TourDetailsPage/TourTabs";
import type { Tour } from "../../../components/UI/TourCard";
import type { TourWithPolicy } from "../../../components/Pages/TourDetailsPage/TourPolicy";

export default function TourPageClient({
  tour,
}: {
  tour: Tour;
}): React.ReactElement {
  // Handle date selection from TourOverview
  const handleDateSelect = (month: string, range: string) => {
    // You can implement additional logic here if needed
    console.log("Date selected:", { month, range });
  };

  // Convert tour to TourWithPolicy format for the Policy component
  const policyTour = React.useMemo((): TourWithPolicy => {
    const stringGallery = tour.gallery
      ?.map((item) =>
        typeof item === "string"
          ? item
          : typeof item.src === "string"
          ? item.src
          : typeof item.url === "string"
          ? item.url
          : undefined
      )
      .filter(
        (item): item is string => typeof item === "string" && item.length > 0
      );

    return {
      ...tour,
      gallery: stringGallery,
    };
  }, [tour]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* JSON-LD removed to prevent duplication - now defined in page.tsx */}

      <TourHero tour={tour} />

      {/* Add TourTabs at the top */}
      <TourTabs />

      <div className="container mx-auto px-4 py-8">
        {/* Main content area with sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Overview Section */}
            <section id="overview" className="mb-16">
              <TourOverview tour={tour} onDateSelect={handleDateSelect} />
            </section>

            {/* Itinerary Section */}
            <section id="itinerary" className="mb-16">
              <TourItinerary tour={tour} />
            </section>

            {/* Inclusions Section */}
            <section id="inclusions" className="mb-16">
              <TourInclusions tour={tour} />
            </section>

            {/* Policy Section - use the converted tour */}
            <section id="policy" className="mb-16">
              <TourPolicy tour={policyTour} />
            </section>
          </div>

          {/* Sidebar - always visible */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
              <TourSidebar tour={tour} selectedMonth="" selectedDateRange="" />
            
          </div>
        </div>
      </div>
    </div>
  );
}
