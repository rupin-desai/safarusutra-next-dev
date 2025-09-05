"use client";

import React from "react";
import TourHero from "../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../components/Pages/TourDetailsPage/TourTabs";
import TourOverview from "../../../components/Pages/TourDetailsPage/TourOverview";
import TourItinerary from "../../../components/Pages/TourDetailsPage/TourItinerary";
import TourInclusions from "../../../components/Pages/TourDetailsPage/TourInclusions";
import TourPolicy from "../../../components/Pages/TourDetailsPage/TourPolicy";
import TourSidebar from "../../../components/Pages/TourDetailsPage/TourSidebar";
import type { Tour } from "../../../components/UI/TourCard";

export default function TourPageClient({ tour }: { tour: Tour }): React.ReactElement {
  return (
    <div className="bg-gray-50 min-h-screen">
      <TourHero tour={tour} />
      <TourTabs />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TourOverview tour={tour} />
            <TourItinerary tour={tour} />
            <TourInclusions tour={tour} />
            <TourPolicy tour={tour} />
          </div>

          <div className="lg:col-span-1">
            <TourSidebar tour={tour} selectedMonth="" selectedDateRange="" />
          </div>
        </div>
      </div>
    </div>
  );
}