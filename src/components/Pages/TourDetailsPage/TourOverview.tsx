"use client";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { CheckCircle, MapPin, Clock, Calendar, X } from "lucide-react";

type DateObj = {
  range: string;
  enabled?: boolean;
  [key: string]: unknown;
};

type AvailableMonth = {
  month: string;
  dates: DateObj[];
};

type ItineraryDay = {
  day?: number;
  title?: string;
  description?: string;
  [key: string]: unknown;
};

type Tour = {
  id?: string | number;
  title?: string;
  subtitle?: string;
  description?: string;
  route?: string;
  duration?: string;
  availableDates?: AvailableMonth[];
  itinerary?: ItineraryDay[];
  highlights?: string[];
  attractions?: string[];
  gallery?: string[];
  [key: string]: unknown;
};

interface Props {
  tour: Tour;
  onDateSelect?: (month: string, range: string) => void;
}

const TourOverview: React.FC<Props> = ({ tour, onDateSelect }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedTooltipInfo, setSelectedTooltipInfo] = useState<{ month: string; date: string } | null>(null);

  const allDates = Array.isArray(tour?.availableDates) ? tour.availableDates : [];

  // Set tour ids here to disable the "20 days" blocking rule for specific tours.
  const TWENTY_DAY_RULE_DISABLED_IDS: number[] = [57];

  const monthNameToIndex = (name: string) => {
    const m = name.toLowerCase();
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return months.indexOf(m);
  };

  const startOfDay = (d: Date | string) => {
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  };

  const parseRangeStartDate = (monthLabel: string | undefined, range: string | undefined) => {
    if (!monthLabel || !range) return null;
    const ml = String(monthLabel).trim();
    const mm = ml.match(/([A-Za-z]+)\s+(\d{4})/);
    if (!mm) return null;
    const monthIdx = monthNameToIndex(mm[1]);
    const year = parseInt(mm[2], 10);

    const parts = String(range).split(/[-–—]/).map((p) => p.trim());
    if (parts.length === 0) return null;
    const first = parts[0];
    const firstDayMatch = first.match(/(\d{1,2})/);
    if (!firstDayMatch) return null;
    const day = parseInt(firstDayMatch[1], 10);

    return new Date(year, monthIdx, day);
  };

  const daysBetween = (a: Date, b: Date) => {
    const diffMs = startOfDay(a).getTime() - startOfDay(b).getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  };

  // build itinerary JSON-LD when itinerary exists
  const itineraryJsonLd =
    Array.isArray(tour?.itinerary) && tour.itinerary.length
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${tour.title || "Tour"} - Itinerary`,
          description: tour.subtitle || tour.description || `${tour.title} itinerary`,
          itemListElement: (tour.itinerary as ItineraryDay[]).map((day: ItineraryDay, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: `Day ${day.day !== undefined ? day.day : idx + 1}: ${day.title ?? ""}`,
            description: day.description ?? "",
          })),
        }
      : null;

  const showDatesSection = allDates.length > 0;

  const handleDateClick = (month: string, dateObject: DateObj) => {
    const startDate = parseRangeStartDate(month, dateObject.range);
    const today = new Date();
    const past = startDate ? startOfDay(startDate) < startOfDay(today) : false;

    const diffDays = startDate ? daysBetween(startDate, today) : Infinity;
    const within20 = diffDays >= 0 && diffDays <= 20; // date is today..20 days ahead

    const disable20RuleForThisTour = TWENTY_DAY_RULE_DISABLED_IDS.includes(Number(tour?.id));

    const disabledBecause = dateObject.enabled === false || past || (!disable20RuleForThisTour && within20);

    if (!disabledBecause) {
      if (typeof onDateSelect === "function") onDateSelect(month, dateObject.range);

      setSelectedTooltipInfo({ month, date: dateObject.range });
      setShowTooltip(true);

      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  const origin =
    typeof window !== "undefined" && window.location && window.location.origin ? window.location.origin : "https://thesafarisutra.com";

  const canonical =
    typeof window !== "undefined" && window.location
      ? `${window.location.origin}${window.location.pathname}${window.location.search || ""}`
      : `${origin}/tour/${tour?.id ?? ""}`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
      {/* SEO: itinerary JSON-LD and canonical */}
      <Head>
        {itineraryJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itineraryJsonLd) }} />}
        <link rel="canonical" href={canonical} />
      </Head>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Tour Overview</h2>

      {/* Route and Duration summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center">
          <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Route</span>
            <p className="font-medium text-sm sm:text-base text-gray-800">{tour.route ?? "Various destinations"}</p>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />

        <div className="flex items-center">
          <Clock size={16} className="text-orange-500 mr-2 flex-shrink-0" />
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Duration</span>
            <p className="font-medium text-sm sm:text-base text-gray-800">{tour.duration ?? "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="prose prose-sm sm:prose max-w-none mb-6">
        <p className="text-gray-700 text-justify" style={{ textAlignLast: "left" }}>
          {tour.description}
        </p>
      </div>

      {/* Available Dates Section with color-coded availability */}
      {showDatesSection && (
        <>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 flex items-center">
            <Calendar size={20} className="mr-2 text-orange-500" />
            Available Dates
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2" />
                <span className="text-xs text-gray-700">Available</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2" />
                <span className="text-xs text-gray-700">Not Available</span>
              </div>
            </div>
            <div className="flex-grow sm:text-right mt-2 sm:mt-0">
              <span className="text-xs text-gray-600 italic">Click on an available date to select it</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {(allDates as AvailableMonth[]).map((monthData, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-800 border-b pb-2 mb-2">{monthData.month}</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(monthData.dates) &&
                      monthData.dates.map((dateObj, i) => {
                        const startDate = parseRangeStartDate(monthData.month, dateObj.range);
                        const today = new Date();
                        const past = startDate ? startOfDay(startDate) < startOfDay(today) : false;

                        const diffDays = startDate ? daysBetween(startDate, today) : Infinity;
                        const within20 = diffDays >= 0 && diffDays <= 20;

                        const disable20RuleForThisTour = TWENTY_DAY_RULE_DISABLED_IDS.includes(Number(tour?.id));

                        const isRed = dateObj.enabled === false || past || (!disable20RuleForThisTour && within20);

                        const disabled = isRed;

                        const className = isRed
                          ? "bg-red-100 text-red-700 cursor-not-allowed opacity-95 line-through"
                          : "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer";

                        return (
                          <button
                            key={i}
                            onClick={() => handleDateClick(monthData.month, dateObj)}
                            disabled={disabled}
                            className={`inline-block text-xs py-1 px-2 rounded-md transition-all ${className}`}
                            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                            title={startDate ? startDate.toDateString() : undefined}
                            aria-disabled={disabled}
                          >
                            {dateObj.range}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">* Dates are subject to availability at the time of booking.</p>
          </div>
        </>
      )}

      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Tour Highlights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {Array.isArray(tour.highlights) &&
          tour.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
              <p className="text-sm sm:text-base text-gray-700">{highlight}</p>
            </div>
          ))}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Attractions Covered</h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
        {Array.isArray(tour.attractions) &&
          tour.attractions.map((attraction, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              {String(attraction)}
            </span>
          ))}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Photo Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {Array.isArray(tour.gallery) &&
          tour.gallery.slice(0, 4).map((photo, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <Image src={photo} alt={`${tour.title ?? "Tour"} - ${index + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
      </div>

      {Array.isArray(tour.gallery) && tour.gallery.length > 4 && (
        <div className="mt-3 text-center">
          <button className="text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors">View all {tour.gallery.length} photos</button>
        </div>
      )}

      {/* Selection tooltip */}
      {showTooltip && selectedTooltipInfo && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle size={18} className="mr-2 text-green-600" />
          <span>
            Selected: {selectedTooltipInfo.date}, {selectedTooltipInfo.month}
          </span>
          <button onClick={() => setShowTooltip(false)} className="ml-3 text-green-600 hover:text-green-800">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TourOverview;
