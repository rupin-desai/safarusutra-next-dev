"use client";
import React from "react";
import TourCard, { Tour as TourType } from "../../UI/TourCard";
import tourDetailsRaw from "../../../data/TourDetails.json";

type TopTour = {
  id: string;
  slug?: string;
  title?: string;
  duration?: string;
  price?: string | number;
  excerpt?: string;
  image?: string;
};

type TourDetail = {
  id?: string | number;
  slug?: string;
  title?: string;
  subtitle?: string;
  route?: string; // <-- use this property as requested
  duration?: string;
  price?: string | number;

  // Legacy image properties for backward compatibility
  image?: string;
  heroImage?: string;

  // New responsive image properties
  srcSetWebp?: string;
  srcFallback?: string;
  alt?: string;
  imageTitle?: string;

  gallery?: string[];
  description?: string;
  excerpt?: string;
  highlights?: string[];
  attractions?: string[];
  itinerary?: unknown[];
  inclusions?: string[];
  exclusions?: string[];
  cancellationPolicy?: string[];
  locationType?: string;
  [k: string]: unknown;
};

const tourDetails = (tourDetailsRaw as unknown) as TourDetail[];

/**
 * Use TourDetails.json as the source of truth for the `route` property.
 * - Lookup by id from TopTour entry (tours-from data).
 * - If found: set tour.route = detail.route (display route string from TourDetails.json)
 * - If not found: route is left undefined (per request to take route only from TourDetails.json)
 */
export default function ToursFromTourCard({ tour }: { tour: TopTour }) {
  const idStr = String(tour.id ?? "");

  const detail = tourDetails.find((d) => String(d?.id) === idStr);

  // ROUTE: use "route" field from TourDetails.json only (display route like "Port Blair (2N) – ...")
  const routeFromDetail = detail?.route ? String(detail.route) : undefined;

  // Generate responsive image properties with fallbacks
  const getImageProperties = () => {
    // Priority: detail.srcSetWebp/srcFallback > detail.heroImage/image > tour.image > generated fallback
    const srcSetWebp = detail?.srcSetWebp || undefined;
    const srcFallback =
      detail?.srcFallback ||
      detail?.heroImage ||
      detail?.image ||
      tour.image ||
      (tour.slug ? `/images/tours/${tour.slug}.jpg` : `/images/tours/${tour.id}.jpg`);

    const alt = detail?.alt || `${tour.title || detail?.title || "Tour"} image`;
    const imageTitle = detail?.imageTitle || tour.title || detail?.title || "Tour";

    return {
      srcSetWebp,
      srcFallback,
      alt,
      imageTitle,
    };
  };

  const { srcSetWebp, srcFallback, alt, imageTitle } = getImageProperties();

  // prefer detail for rich fields, but card title still prefers TopTour.title per earlier behavior
  const mapped: TourType = {
    id: String(detail?.id ?? tour.id ?? "unknown"),
    title: String(tour.title ?? detail?.title ?? "Untitled tour"),
    // assign route from detail.route only
    // note: TourCard expects a route value; providing undefined is intentional if no TourDetails entry exists
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    route: routeFromDetail,
    duration: String((detail?.duration ?? tour.duration) ?? "") || undefined,
    price: (detail?.price ?? tour.price) as string | number | undefined,

    // New responsive image properties
    srcSetWebp,
    srcFallback,
    alt,
    imageTitle,

    // Legacy image property for backward compatibility
    image: srcFallback,

    description: String((detail?.description ?? detail?.excerpt ?? tour.excerpt ?? "")),
    slug: (detail?.slug ?? tour.slug) as string | undefined,
    // detailsTitle used for "View details" label — ONLY from TourDetails.json
    detailsTitle: detail?.title ? String(detail.title) : undefined,
    // include attractions if available
    attractions: Array.isArray(detail?.attractions) ? (detail!.attractions as string[]) : undefined,
  } as TourType;

  return <TourCard tour={mapped} />;
}