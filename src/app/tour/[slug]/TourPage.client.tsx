"use client";

import React from "react";
import TourHero from "../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../components/Pages/TourDetailsPage/TourTabs";
import TourOverview from "../../../components/Pages/TourDetailsPage/TourOverview";
import TourSidebar from "../../../components/Pages/TourDetailsPage/TourSidebar";
import type { Tour } from "../../../components/UI/TourCard";

export default function TourPageClient({ tour }: { tour: Tour }): React.ReactElement {
  // Handle date selection from TourOverview
  const handleDateSelect = (month: string, range: string) => {
    // You can implement additional logic here if needed
    console.log('Date selected:', { month, range });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <TourHero tour={tour} />
      <TourTabs />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TourOverview 
              tour={tour} 
              onDateSelect={handleDateSelect}
            />
          </div>

          <div className="lg:col-span-1">
            <TourSidebar tour={tour} selectedMonth="" selectedDateRange="" />
          </div>
        </div>
      </div>
    </div>
  );
}