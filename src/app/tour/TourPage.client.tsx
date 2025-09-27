"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
// removed page-level framer-motion animations
import { usePathname } from "next/navigation";
import { Compass } from "lucide-react";
import HeroSection from "@/components/UI/HeroSection";
import SectionTitleWithIllustrations from "@/components/UI/SectionTitleWithIllustrations";
import TourSearchFilter from "@/components/Pages/ToursPage/TourSearchFilter";
import TourGrid from "@/components/Pages/ToursPage/TourGrid";
import TourCard from "@/components/UI/TourCard";
import type { Tour, AvailableMonth, DateObj } from "@/components/UI/TourCard"; // Import unified types
import tourData from "@/data/TourDetails.json";
import TourOverlay from "@/components/Pages/ToursPage/TourOverlay";
import SSButton from "@/components/UI/SSButton";

/* Remove duplicate Tour type - use the one from TourCard */

type CompositeFilter = {
  type: "composite";
  categories?: string[];
  price?: string[];
};

type Filter = "all" | "india" | "international" | string | CompositeFilter;

/* Generic shuffle to avoid `any` */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // swap
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/* Helper function to convert price to number */
const getPriceAsNumber = (price: string | number | undefined): number | null => {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    // Remove currency symbols, commas, and convert to number
    const cleanPrice = price.replace(/[₹,]/g, "");
    const numPrice = parseFloat(cleanPrice);
    return isNaN(numPrice) ? null : numPrice;
  }
  return null;
};

/* Normalize raw tour data to match the unified Tour type */
const normalizeRawTourData = (rawTours: unknown[]): Tour[] => {
  return rawTours.map((rawTour): Tour => {
    const tour = rawTour as Record<string, unknown>;
    
    // Normalize availableDates from the raw data format to the expected format
    const normalizedAvailableDates: AvailableMonth[] | undefined = Array.isArray(tour.availableDates)
      ? (tour.availableDates as unknown[]).map((month) => {
          const monthData = month as Record<string, unknown>;
          return {
            month: String(monthData.month || ''),
            dates: Array.isArray(monthData.dates)
              ? (monthData.dates as unknown[]).map((dateItem): DateObj => {
                  const date = dateItem as Record<string, unknown>;
                  return {
                    range: String(date.date || date.range || ''), // Map 'date' to 'range'
                    enabled: date.enabled !== false,
                  };
                })
              : [],
          };
        })
      : undefined;

    // Normalize gallery to match the expected format
    const normalizedGallery = Array.isArray(tour.gallery) 
      ? (tour.gallery as unknown[]).map((g) => {
          if (typeof g === "string") return g; // Legacy string format
          if (g && typeof g === "object") {
            const galleryItem = g as Record<string, unknown>;
            return {
              srcSetWebp: typeof galleryItem.srcSetWebp === "string" ? galleryItem.srcSetWebp : undefined,
              srcFallback: typeof galleryItem.srcFallback === "string" ? galleryItem.srcFallback : undefined,
              alt: typeof galleryItem.alt === "string" ? galleryItem.alt : undefined,
              imageTitle: typeof galleryItem.imageTitle === "string" ? galleryItem.imageTitle : undefined,
              ...galleryItem,
            };
          }
          return String(g ?? "");
        })
      : undefined;

    return {
      id: tour.id as string | number,
      title: typeof tour.title === "string" ? tour.title : undefined,
      subtitle: typeof tour.subtitle === "string" ? tour.subtitle : undefined,
      route: typeof tour.route === "string" ? tour.route : undefined,
      description: typeof tour.description === "string" ? tour.description : undefined,
      category: tour.category as string | string[],
      location: typeof tour.location === "string" ? tour.location : undefined,
      price: typeof tour.price === "number" ? tour.price : typeof tour.price === "string" ? tour.price : undefined,
      duration: typeof tour.duration === "string" ? tour.duration : undefined,
      locationType: typeof tour.locationType === "string" ? tour.locationType : undefined,
      
      // New responsive image properties
      srcSetWebp: typeof tour.srcSetWebp === "string" ? tour.srcSetWebp : undefined,
      srcFallback: typeof tour.srcFallback === "string" ? tour.srcFallback : undefined,
      alt: typeof tour.alt === "string" ? tour.alt : undefined,
      imageTitle: typeof tour.imageTitle === "string" ? tour.imageTitle : undefined,
      
      // Legacy image properties
      image: typeof tour.image === "string" ? tour.image : undefined,
      heroImage: typeof tour.heroImage === "string" ? tour.heroImage : undefined,
      
      // Normalized data
      availableDates: normalizedAvailableDates,
      gallery: normalizedGallery,
      
      // Other properties
      highlights: Array.isArray(tour.highlights) ? tour.highlights.map(h => String(h)) : undefined,
      attractions: Array.isArray(tour.attractions) ? tour.attractions.map(a => String(a)) : undefined,
      inclusions: Array.isArray(tour.inclusions) ? tour.inclusions.map(i => String(i)) : undefined,
      exclusions: Array.isArray(tour.exclusions) ? tour.exclusions.map(e => String(e)) : undefined,
      cancellationPolicy: Array.isArray(tour.cancellationPolicy) ? tour.cancellationPolicy.map(c => String(c)) : undefined,
      featured: typeof tour.featured === "boolean" ? tour.featured : undefined,
      relatedDestinations: Array.isArray(tour.relatedDestinations) ? tour.relatedDestinations : undefined,
      destinationNames: Array.isArray(tour.destinationNames) ? tour.destinationNames.map(d => String(d)) : undefined,
      metaDescription: typeof tour.metaDescription === "string" ? tour.metaDescription : undefined,
      bestTime: typeof tour.bestTime === "string" ? tour.bestTime : undefined,
      contact: typeof tour.contact === "string" ? tour.contact : undefined,
      notes: typeof tour.notes === "string" ? tour.notes : undefined,
      slug: typeof tour.slug === "string" ? tour.slug : undefined,
      
      // Preserve any other properties
      ...tour,
    } as Tour;
  });
};

export default function TourPageClient(): React.ReactElement {
  const pathname = usePathname() ?? "/";
  const isAllTours = pathname.startsWith("/tour/");

  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastAppliedFilter, setLastAppliedFilter] = useState<Filter | null>(null);

  const [currentSection, setCurrentSection] = useState<string>("short");

  useEffect(() => {
    try {
      setIsLoading(true);
      if (Array.isArray(tourData) && (tourData as unknown[]).length > 0) {
        // Normalize the raw tour data to match the unified Tour type
        const normalizedTours = normalizeRawTourData(tourData as unknown[]);
        const randomizedTours = shuffleArray<Tour>(normalizedTours);
        setTours(randomizedTours);
        setFilteredTours(randomizedTours);
      } else {
        console.error("Package data is empty or invalid");
        setTours([]);
        setFilteredTours([]);
      }
    } catch (error) {
      console.error("Error loading package data:", error);
      setTours([]);
      setFilteredTours([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyFilters = useMemo(() => {
    return (query: string, filter: Filter): Tour[] => {
      let result = [...tours];
      if (query && query.trim() !== "") {
        const lowerCaseQuery = query.toLowerCase();
        result = result.filter((tour: Tour) => {
          return (
            (tour.title && String(tour.title).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.route && String(tour.route).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.description && String(tour.description).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.category && String(tour.category).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.location && String(tour.location).toLowerCase().includes(lowerCaseQuery))
          );
        });
      }

      if (filter && typeof filter === "object" && (filter as CompositeFilter).type === "composite") {
        const comp = filter as CompositeFilter;
        if (comp.categories && comp.categories.length > 0) {
          result = result.filter((tour: Tour) => {
            if (!tour.category) return false;
            const tourCategories = String(tour.category)
              .split(",")
              .map((cat) => cat.trim().toLowerCase());
            return comp.categories!.some((filterCat) => tourCategories.includes(filterCat.toLowerCase()));
          });
        }

        if (comp.price && comp.price.length > 0) {
          result = result.filter((tour: Tour) => {
            const tourPrice = getPriceAsNumber(tour.price);
            if (tourPrice === null) return false;
            
            return comp.price!.some((priceRange) => {
              const range = priceRange.replace(/₹/g, "").split("-");
              if (range.length === 2) {
                const min = parseInt(range[0].replace(/,/g, ""), 10);
                const max = parseInt(range[1].replace(/,/g, ""), 10);
                return tourPrice >= min && tourPrice <= max;
              } else if (priceRange.includes("+")) {
                const min = parseInt(priceRange.replace(/₹|\+|,/g, ""), 10);
                return tourPrice >= min;
              }
              return false;
            });
          });
        }
      } else if (filter && filter !== "all") {
        if (filter === "india") {
          result = result.filter((tour: Tour) => tour.location === "India");
        } else if (filter === "international") {
          result = result.filter((tour: Tour) => tour.location !== "India");
        } else {
          const f = String(filter).toLowerCase();
          result = result.filter((tour: Tour) => {
            if (!tour.category) return false;
            return String(tour.category)
              .split(",")
              .map((cat) => cat.trim().toLowerCase())
              .includes(f);
          });
        }
      }

      return result;
    };
  }, [tours]);

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      setActiveFilter(filter);
      setLastAppliedFilter(filter);
      const results = applyFilters(searchQuery, filter);
      setFilteredTours(results);
    },
    [applyFilters, searchQuery]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const query = typeof e === "string" ? e : e.target?.value ?? "";
    setSearchQuery(query);
    const filterToApply = activeFilter || lastAppliedFilter || "all";
    const results = applyFilters(query, filterToApply);
    setFilteredTours(results);
  };

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  const parseDaysFromDuration = (tour: Tour) => {
    try {
      const d = String(tour.duration || "");
      const mDays = d.match(/(\d{1,3})\s*D\b/i);
      if (mDays) return parseInt(mDays[1], 10);
      const mNights = d.match(/(\d{1,3})\s*N\b/i);
      if (mNights) return parseInt(mNights[1], 10) + 1;
    } catch {}
    return Infinity;
  };

  const hasAvailableDates = (tour: Tour) => {
    try {
      if (!Array.isArray(tour?.availableDates)) return false;
      return tour.availableDates.some((month: AvailableMonth) => 
        Array.isArray(month.dates) && month.dates.some((d: DateObj) => d.enabled !== false)
      );
    } catch {
      return false;
    }
  };

  const locationTypeOf = (tour: Tour) => String(tour?.locationType || "").trim().toLowerCase();

  const shortDepartures = filteredTours.filter((t) => parseDaysFromDuration(t) <= 4 && hasAvailableDates(t));

  const domesticDepartures = filteredTours.filter(
    (t) => parseDaysFromDuration(t) > 4 && locationTypeOf(t) === "domestic" && hasAvailableDates(t)
  );

  const internationalDepartures = filteredTours.filter((t) => locationTypeOf(t) === "international" && hasAvailableDates(t));

  const groupedSet = new Set([
    ...shortDepartures.map((t) => t.id),
    ...domesticDepartures.map((t) => t.id),
    ...internationalDepartures.map((t) => t.id),
  ]);

  const others = filteredTours.filter((t) => !groupedSet.has(t.id));

  const sectionCounts: Record<string, number> = {
    short: shortDepartures.length,
    domestic: domesticDepartures.length,
    international: internationalDepartures.length,
    other: others.length,
    all: filteredTours.length,
  };

  return (
    <>
      <div>
        <HeroSection
          title={isAllTours ? "Tours That Make Stories" : "Ready‑To‑Go Departures"}
          backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          overlay={0.6}
          titleSize="text-4xl md:text-5xl lg:text-6xl "
        />

        <div className="container mx-auto px-4 py-12" id="packages">
          <SectionTitleWithIllustrations
            icon={<Compass size={18} />}
            pillText="Find Your Adventure"
            title={isAllTours ? "All Journeys: Discover Every Expedition" : "Explore Our Curated Tour Collection"}
            color="#f89b21"
            titleSize="large"
            containerClassName="mb-4"
          />

          <TourSearchFilter
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            activeFilter={activeFilter}
            handleFilterChange={handleFilterChange}
          />

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl font-medium text-gray-600">Loading tours...</p>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-medium text-gray-600 mb-4">No tours found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                  setFilteredTours(tours);
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                type="button"
              >
                Reset Filters
              </button>
            </div>
          ) : isAllTours ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="packages-list">
              {filteredTours.map((tour, idx) => (
                <div key={`${tour.id}-all-${idx}`} className="tour-card-item">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <TourGrid tours={filteredTours} onSectionChange={handleSectionChange} showOthers={false} />
          )}
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="flex justify-center">
            <SSButton to={isAllTours ? "/fixed-departures/" : "/tour/"} variant="primary" color="var(--color-green)" className="px-6 py-3">
              {isAllTours ? "See Fixed Departures" : "Browse All Tours"}
            </SSButton>
          </div>
        </div>

        {!isAllTours && (
          <TourOverlay
            sections={[
              { id: "short", label: "Mini Escapes" },
              { id: "domestic", label: "Home‑Turf Adventures" },
              { id: "international", label: "Faraway Wonders" },
            ]}
            currentSection={currentSection}
            sectionCounts={sectionCounts}
          />
        )}
      </div>
    </>
  );
}