"use client";

import React from "react";
import { MapPin, Info } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SSButton from "../UI/SSButton";
import { generateTourBookingInquiry } from "@/utils/contact.utils";

// export or declare the Tour shape used by TourCard
export type Tour = {
  // make `id` optional to be compatible with other module types that allow undefined
  id?: string | number;
  title?: string;
  subtitle?: string;
  route?: string;
  description?: string;
  category?: string | string[];
  location?: string;
  price?: number | string;
  duration?: string;
  
  // New responsive image properties
  srcSetWebp?: string;
  srcFallback?: string;
  alt?: string;
  imageTitle?: string;
  
  // Legacy image properties for backward compatibility
  image?: string;
  heroImage?: string;
  
  // Gallery with responsive support
  gallery?: (GalleryItem | string)[];
  
  // Other tour properties
  highlights?: string[];
  attractions?: string[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  cancellationPolicy?: string[];
  availableDates?: AvailableMonth[];
  featured?: boolean;
  relatedDestinations?: (string | number)[];
  destinationNames?: string[];
  locationType?: string;
  metaDescription?: string;
  bestTime?: string;
  contact?: string;
  notes?: string;
  slug?: string;
  
  [k: string]: unknown;
} & Record<string, unknown>;

// Supporting types
export type GalleryItem = {
  srcSetWebp?: string;
  srcFallback?: string;
  alt?: string;
  imageTitle?: string;
  [key: string]: unknown;
};

export type ItineraryDay = {
  day?: number;
  title?: string;
  description?: string;
  activities?: string[];
  [key: string]: unknown;
};

export type AvailableMonth = {
  month: string;
  dates: DateObj[];
};

export type DateObj = {
  range: string;
  enabled?: boolean;
  [key: string]: unknown;
};

const cardVariants: Variants = {
  initial: {
    transform: "translate3d(0px, 0px, 0px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    transform: "translate3d(0px, -5px, 0px)",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const createSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const extractTitle = (title?: string): string => {
  if (!title) return "";
  const colonIndex = title.indexOf(":");
  return colonIndex > 0 ? title.substring(0, colonIndex).trim() : title;
};

// Helper function to generate responsive srcSet from base path
const generateResponsiveSrcSet = (basePath?: string): string => {
  if (!basePath) return "";
  
  // Extract the base path and extension
  const lastSlash = basePath.lastIndexOf('/');
  const lastDot = basePath.lastIndexOf('.');
  
  if (lastSlash === -1 || lastDot === -1) return basePath;
  
  const pathPrefix = basePath.substring(0, lastSlash + 1);
  const nameWithoutExt = basePath.substring(lastSlash + 1, lastDot);
  const extension = basePath.substring(lastDot);
  
  // Generate responsive sizes: 480w, 720w, 1080w
  const sizes = [480, 720, 1080];
  const srcSetEntries = sizes.map(size => {
    const imagePath = `${pathPrefix}${nameWithoutExt}-${size}${extension}`;
    return `${imagePath} ${size}w`;
  });
  
  return srcSetEntries.join(', ');
};

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const router = useRouter();

  const formattedPrice =
    typeof tour.price === "number" ? `₹${tour.price.toLocaleString()}` : "₹24,999";
  const attractionCount = (Array.isArray(tour.attractions) && tour.attractions.length) || 0;
  const durationDisplay = tour.duration ? String(tour.duration) : "N/A";

  // Use detailsTitle (from TourDetails.json) for the view-details slug when available.
  // Fall back to tour.title or id if not provided.
  const slugSource = ((tour as Record<string, unknown>).detailsTitle as string) ?? (tour.title as string) ?? String(tour.id);
  const titleSlug = createSlug(String(slugSource));

  const displayTitle = extractTitle(tour.title);

  // Accessible ids for sr-only headings (ensure string)
  const idStr = String(tour.id);
  const titleId = `tour-title-${idStr}`;
  const routeId = `tour-route-${idStr}`;

  // Image handling - use new responsive properties or fallback to legacy
  const imageSrc = tour.srcFallback || tour.image || tour.heroImage || "https://images.unsplash.com/photo-1668537824956-ef29a3d910b2";
  const imageAlt = tour.alt || tour.title || `Tour ${idStr}`;
  const imageTitle = tour.imageTitle || tour.title || `Tour ${idStr}`;
  
  // Generate responsive srcSet
  const responsiveSrcSet = tour.srcSetWebp && tour.srcSetWebp.includes(',') 
    ? tour.srcSetWebp // Already contains multiple sizes
    : generateResponsiveSrcSet(tour.srcSetWebp || tour.srcFallback || tour.image);

  const handleBookNow = () => {
    const result = generateTourBookingInquiry(tour) as { subject?: string; message?: string };
    const subject = result.subject ?? "";
    const message = result.message ?? "";
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (message) params.set("message", message);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <motion.div
      role="article"
      aria-labelledby={titleId}
      aria-describedby={routeId}
      className="relative h-[500px] max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-lg group"
      initial="initial"
      whileHover="hover"
      animate="initial"
      variants={cardVariants}
    >
      {/* Screen-reader only headings for SEO / accessibility */}
      <h2 id={titleId} className="sr-only">
        {displayTitle || `Tour ${idStr}`}
      </h2>
      <h3 id={routeId} className="sr-only">
        {tour.route || ""}
      </h3>

      <div className="absolute inset-0 w-full h-full">
        <picture>
          {responsiveSrcSet && (
            <source 
              srcSet={responsiveSrcSet}
              sizes="(max-width: 480px) 320px, (max-width: 768px) 400px, (max-width: 1200px) 360px, 400px"
              type="image/webp"
            />
          )}
          <img
            src={imageSrc}
            alt={imageAlt}
            title={imageTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={400}
            height={500}
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-3 mt-3 p-3">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 font-family-baloo line-clamp-2">
            {displayTitle}
          </h4>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <p className="truncate">{tour.route}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6 mt-16">
          <div className="flex items-center justify-between w-full">
            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">From</p>
              <p className="text-lg font-bold text-white">{formattedPrice}</p>
            </div>

            <div className="h-10 w-px bg-white/30" />

            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">Duration</p>
              <p className="text-white text-base">{durationDisplay}</p>
            </div>

            <div className="h-10 w-px bg-white/30" />

            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">Attractions</p>
              <p className="text-white text-base">{attractionCount}+</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SSButton variant="primary" color="#f89b21" onClick={handleBookNow} className="text-sm py-2">
            Book Now
          </SSButton>

          <Link
            href={`/tour/${titleSlug}`}
            className="flex-1 py-2 text-white text-center rounded-2xl font-medium transition-all duration-150 hover:brightness-110 hover:shadow-md active:scale-95 active:shadow-inner"
            aria-label={`View details for ${tour.title}`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Info size={16} className="opacity-90" />
              <span>View Details</span>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
