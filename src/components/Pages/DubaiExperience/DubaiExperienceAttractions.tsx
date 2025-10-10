"use client";
import React from "react";
import { Eye } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";

// Map preview and full image sources
const MAP_PREVIEW_SRCSET =
  "/images/dubai-safari/map-preview-480.webp 480w, /images/dubai-safari/map-preview-720.webp 720w, /images/dubai-safari/map-preview-1080.webp 1080w";
const MAP_PREVIEW_SRC = "/images/dubai-safari/map-preview-1080.webp";
const MAP_FULL_SRC = "/images/dubai-safari/map-full.jpg";
const MAP_ALT = "Dubai Safari Park Map";
const MAP_TITLE = "Dubai Safari Park Map";

// Facility data (add your actual image paths)
const facilities = [
  {
    name: "Eco Taxi",
    image: "/images/dubai-safari/facilities/eco-taxi.webp",
  },
  {
    name: "Main Parking",
    image: "/images/dubai-safari/facilities/main-parking.webp",
  },
  {
    name: "Mobility",
    image: "/images/dubai-safari/facilities/mobility.webp",
  },
  {
    name: "Prayer Room",
    image: "/images/dubai-safari/facilities/prayer-room.webp",
  },
  {
    name: "Retail Store",
    image: "/images/dubai-safari/facilities/retail-store.webp",
  },
];

export default function DestinationAttractions() {
  // Open full image in new tab
  const openFullMap = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(MAP_FULL_SRC, "_blank", "noopener,noreferrer");
  };

  // Split facilities into rows of 3 for centering logic
  const columns = 3;
  const rows: { name: string; image: string }[][] = [];
  for (let i = 0; i < facilities.length; i += columns) {
    rows.push(facilities.slice(i, i + columns));
  }

  return (
    <section className="w-full">
      {/* Full-width Map Preview */}
      <div className="relative w-full">
        <picture>
          <source srcSet={MAP_PREVIEW_SRCSET} type="image/webp" />
          <img
            src={MAP_PREVIEW_SRC}
            alt={MAP_ALT}
            title={MAP_TITLE}
            className="w-full h-[320px] md:h-[480px] object-cover object-center"
            loading="lazy"
          />
        </picture>
        {/* Eye Icon Button */}
        <button
          type="button"
          aria-label="View Full Map"
          onClick={openFullMap}
          className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
        >
          <Eye size={28} />
        </button>
      </div>

      {/* Facilities Section for md+ */}
      <div className="container mx-auto px-4 py-16 hidden sm:block">
        <SectionTitle
          icon={<Eye size={18} />}
          pillText="Park Facilities"
          title="Explore Some of the Amenities We Offer"
          color="#1976D2"
          containerClassName="mb-8"
          centered
          as="h2"
        />
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
                row.length < columns ? "justify-center" : ""
              }`}
              style={
                row.length < columns
                  ? {
                      justifyContent: "center",
                      display: "grid",
                      gridTemplateColumns: `repeat(${row.length}, minmax(260px, 340px))`,
                    }
                  : undefined
              }
            >
              {row.map((facility) => (
                <div
                  key={facility.name}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center px-8 py-10 min-w-[260px] max-w-[400px] h-[340px]"
                >
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-20 h-20 object-contain mb-6"
                    loading="lazy"
                  />
                  <span className="text-xl font-bold text-gray-900 text-center mb-2">
                    {facility.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Section for mobile only */}
      <div className="container mx-auto px-4 py-16 sm:hidden">
        <SectionTitle
          icon={<Eye size={18} />}
          pillText="Park Facilities"
          title="Explore Some  of the Amenities We Offer"
          color="#1976D2"
          containerClassName="mb-8"
          centered
          as="h2"
        />
        <div className="flex flex-col gap-8">
          {facilities.map((facility) => (
            <div
              key={facility.name}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center px-8 py-10 min-w-[260px] max-w-[400px] h-[340px] mx-auto"
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-20 h-20 object-contain mb-6"
                loading="lazy"
              />
              <span className="text-xl font-bold text-gray-900 text-center mb-2">
                {facility.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
