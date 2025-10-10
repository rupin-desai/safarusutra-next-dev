"use client";
import React from "react";
import { Eye } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Facility data (update your actual image paths)
const facilities = [
  {
    name: "Eco Taxi",
    image: "/images/dubai-safari/facilities/eco-taxi.webp",
    srcSet:
      "/images/dubai-safari/facilities/eco-taxi-480.webp 480w, /images/dubai-safari/facilities/eco-taxi-720.webp 720w, /images/dubai-safari/facilities/eco-taxi-1080.webp 1080w",
  },
  {
    name: "Main Parking",
    image: "/images/dubai-safari/facilities/main-parking.webp",
    srcSet:
      "/images/dubai-safari/facilities/main-parking-480.webp 480w, /images/dubai-safari/facilities/main-parking-720.webp 720w, /images/dubai-safari/facilities/main-parking-1080.webp 1080w",
  },
  {
    name: "Mobility",
    image: "/images/dubai-safari/facilities/mobility.webp",
    srcSet:
      "/images/dubai-safari/facilities/mobility-480.webp 480w, /images/dubai-safari/facilities/mobility-720.webp 720w, /images/dubai-safari/facilities/mobility-1080.webp 1080w",
  },
  {
    name: "Exclusive Wildlife Parks",
    image: "/images/dubai-safari/facilities/wildlife.webp",
    srcSet:
      "/images/dubai-safari/facilities/wildlife-480.webp 480w, /images/dubai-safari/facilities/wildlife-720.webp 720w, /images/dubai-safari/facilities/wildlife-1080.webp 1080w",
  },
  {
    name: "Retail Store",
    image: "/images/dubai-safari/facilities/retail-store.webp",
    srcSet:
      "/images/dubai-safari/facilities/retail-store-480.webp 480w, /images/dubai-safari/facilities/retail-store-720.webp 720w, /images/dubai-safari/facilities/retail-store-1080.webp 1080w",
  },
];

// Map preview and full image sources
const MAP_PREVIEW_SRCSET =
  "/images/dubai-safari/map-full.jpg 480w, /images/dubai-safari/map-full.jpg 720w, /images/dubai-safari/map-full.jpg 1080w";
const MAP_PREVIEW_SRC = "/images/dubai-safari/map-full.jpg";
const MAP_FULL_SRC = "/images/dubai-safari/map-full.jpg";
const MAP_ALT = "Dubai Safari Park Map";
const MAP_TITLE = "Dubai Safari Park Map";

// JSON-LD for Map (ImageObject) and Facilities (ItemList)
const mapJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: `https://safarusutra.com${MAP_PREVIEW_SRC}`,
  name: "Dubai Safari Park Map",
  description: "Map of Dubai Safari Park showing all zones and facilities.",
  url: "https://safarusutra.com/dubai-safari-experience#park-map",
  representativeOfPage: true,
};

const facilitiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dubai Safari Park Facilities",
  itemListElement: facilities.map((facility, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: facility.name,
    image: `https://safarusutra.com${facility.image}`,
    url: `https://safarusutra.com/dubai-safari-experience#facility-${encodeURIComponent(
      facility.name.toLowerCase().replace(/\s+/g, "-")
    )}`,
  })),
};

// Animation variants
const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
const cardVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: (i: number) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

export default function DestinationAttractions() {
  // Open full image in new tab
  const openFullMap = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(MAP_FULL_SRC, "_blank", "noopener,noreferrer");
  };

  // Split facilities into rows of 3 for centering logic
  const columns = 3;
  const rows: { name: string; image: string; srcSet: string }[][] = [];
  for (let i = 0; i < facilities.length; i += columns) {
    rows.push(facilities.slice(i, i + columns));
  }

  return (
    <motion.section
      className="w-full"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      {/* JSON-LD for Map and Facilities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mapJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitiesJsonLd) }}
      />

      {/* Full-width Map Preview */}
      <motion.div
        className="relative w-full"
        id="park-map"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.18 }}
        variants={sectionVariants}
      >
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
      </motion.div>

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
                      gridTemplateColumns: `repeat(${row.length}, minmax(260px, 400px))`,
                    }
                  : undefined
              }
            >
              {row.map((facility, i) => (
                <motion.div
                  key={facility.name}
                  id={`facility-${facility.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden min-w-[260px] max-w-[400px] h-[340px] flex flex-col justify-end items-center"
                  custom={i}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={cardVariants}
                >
                  <picture>
                    <source srcSet={facility.srcSet} type="image/webp" />
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <div className="relative z-10 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6 flex flex-col items-center">
                    <span className="text-xl font-bold text-white text-center drop-shadow">
                      {facility.name}
                    </span>
                  </div>
                </motion.div>
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
          {facilities.map((facility, i) => (
            <motion.div
              key={facility.name}
              id={`facility-${facility.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden min-w-[260px] max-w-[400px] h-[340px] mx-auto flex flex-col justify-end items-center"
              custom={i}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.18 }}
              variants={cardVariants}
            >
              <picture>
                <source srcSet={facility.srcSet} type="image/webp" />
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="relative z-10 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6 flex flex-col items-center">
                <span className="text-xl font-bold text-white text-center drop-shadow">
                  {facility.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
