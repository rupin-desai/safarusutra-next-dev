/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";

export type Tour = {
  id: string | number;
  title?: string;
  srcSetWebp: string;
  srcFallback: string;
  alt?: string;
  imageTitle?: string;
  location?: string;
  caption?: string;
  price?: string;
  duration?: string;
};

interface DestinationCardProps {
  tour: Tour;
  index?: number;
  isNewlyLoaded?: boolean;
}

// Function to convert title to URL-friendly slug
const createSlug = (title?: string): string => {
  const t = String(title ?? "");
  return t
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const DestinationCard: FC<DestinationCardProps> = ({
  tour,
  index = 0,
  isNewlyLoaded = false,
}) => {
  // Determine button color based on location (domestic or international)
  const buttonColor =
    (tour.location ?? "").toLowerCase() !== "india"
      ? "var(--color-green)"
      : "var(--color-orange)";

  // Determine animation delay for staggered effect (still kept for inline transition if needed)
  const animationDelay = isNewlyLoaded ? 0.1 * (index % 9) : 0;

  // Create slug from tour title
  const titleSlug = createSlug(tour.title);

  return (
    <div
      className="relative w-full h-[440px] md:h-[380px] xl:h-[440px] rounded-xl overflow-hidden shadow-lg group"
      style={{ transitionDelay: `${animationDelay}s` }}
    >
      {/* Responsive Image using <img> and srcSet */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
        <img
          src={tour.srcFallback}
          srcSet={tour.srcSetWebp}
          alt={tour.alt ?? String(tour.title ?? "")}
          title={tour.imageTitle ?? String(tour.title ?? "")}
          className="object-cover object-center w-full h-full"
          style={{ width: "100%", height: "100%" }}
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

      {/* Inner Card at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-5 z-20">
        <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] p-5 md:p-4 xl:p-5 transform transition-all duration-300 group-hover:-translate-y-1">
          <h3
            className="text-xl md:text-lg xl:text-xl font-bold text-gray-900 leading-tight mb-1"
            style={{ fontFamily: "var(--font-family-baloo)" }}
          >
            {String(tour.title ?? "")}
          </h3>

          <p
            className="text-sm md:text-xs xl:text-sm font-medium mb-3 md:mb-2 xl:mb-3"
            style={{ color: buttonColor }}
          >
            {tour.caption ?? "Unforgettable Safari Experience"}
          </p>

          <div className="flex items-center text-gray-600 text-sm md:text-xs xl:text-sm">
            <span className="font-medium">From {String(tour.price ?? "")}</span>
            <span className="mx-2">•</span>
            <span>{String(tour.duration ?? "")} trip</span>
          </div>

          <Link
            href={`/destination/${titleSlug}`}
            className="mt-4 md:mt-3 xl:mt-4 inline-block w-full py-2 md:py-1.5 xl:py-2 text-white text-center rounded-lg font-medium 
                       transition-all duration-150 
                       hover:brightness-110 hover:shadow-md 
                       active:scale-95 active:shadow-inner"
            style={{ backgroundColor: buttonColor }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
