"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Compass } from "lucide-react";
import HeroSection from "@/components/UI/HeroSection";
import SectionTitleWithIllustrations from "@/components/UI/SectionTitleWithIllustrations";
import TourSearchFilter from "@/components/Pages/ToursPage/TourSearchFilter";
import TourGrid from "@/components/Pages/ToursPage/TourGrid";
import packageData from "@/data/TourDetails.json";
import TourOverlay from "@/components/Pages/ToursPage/TourOverlay";
import SSButton from "@/components/UI/SSButton";
import type { Tour } from "@/app/tour/TourPage.client"; // reuse Tour type from TourPage.client

type AvailableDateMonth = { month: string; dates: Array<{ date: string; enabled?: boolean }>; [k: string]: unknown };
type CompositeFilter = { type: "composite"; categories?: string[]; price?: string[] };
type Filter = "all" | "india" | "international" | string | CompositeFilter;

/* Generic shuffle */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FixedDeparturesPageClient: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastAppliedFilter, setLastAppliedFilter] = useState<Filter | null>(null);

  // New: current visible section id (short/domestic/international/other)
  const [currentSection, setCurrentSection] = useState<string>("short");

  useEffect(() => {
    try {
      setIsLoading(true);
      if (Array.isArray(packageData) && (packageData as unknown[]).length > 0) {
        const randomizedTours = shuffleArray<Tour>(packageData as unknown as Tour[]);
        setTours(randomizedTours);
        setFilteredTours(randomizedTours);
      } else {
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

  // Client-side meta handling (kept in client for parity with previous behavior)
  const pageTitle = "Fixed‑Date Departures — Ready‑To‑Go Tours | Safari Sutra";
  const pageDescription =
    "Handpicked fixed‑date departures with guaranteed departure dates — mini escapes, home‑turf adventures and faraway wonders.";

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      document.title = pageTitle;
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (meta) meta.content = pageDescription;
      else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = pageDescription;
        document.head.appendChild(m);
      }
    } catch  {
      // noop
    }
  }, []);

  // Memoized applyFilters function
  const applyFilters = useMemo(() => {
    return (query: string, filter: Filter): Tour[] => {
      let result = [...tours];
      if (query && query.trim() !== "") {
        const lowerCaseQuery = query.toLowerCase();
        result = result.filter(
          (tour) =>
            (tour.title && String(tour.title).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.route && String(tour.route).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.description && String(tour.description).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.category && String(tour.category).toLowerCase().includes(lowerCaseQuery)) ||
            (tour.location && String(tour.location).toLowerCase().includes(lowerCaseQuery))
        );
      }

      if (filter && typeof filter === "object" && (filter as CompositeFilter).type === "composite") {
        const comp = filter as CompositeFilter;
        if (comp.categories && comp.categories.length > 0) {
          result = result.filter((tour) => {
            if (!tour.category) return false;
            const tourCategories = String(tour.category)
              .split(",")
              .map((cat: string) => cat.trim().toLowerCase());
            return comp.categories!.some((filterCat) => tourCategories.includes(filterCat.toLowerCase()));
          });
        }

        if (comp.price && comp.price.length > 0) {
          result = result.filter((tour) => {
            if (tour.price == null || typeof tour.price !== "number") return false;
            return comp.price!.some((priceRange) => {
              const range = priceRange.replace(/₹/g, "").split("-");
              if (range.length === 2) {
                const min = parseInt(range[0].replace(/,/g, ""), 10);
                const max = parseInt(range[1].replace(/,/g, ""), 10);
                return Number(tour.price) >= min && Number(tour.price) <= max;
              } else if (priceRange.includes("+")) {
                const min = parseInt(priceRange.replace(/₹|\+|,/g, ""), 10);
                return Number(tour.price) >= min;
              }
              return false;
            });
          });
        }
      } else if (filter && filter !== "all") {
        if (filter === "india") {
          result = result.filter((tour) => String(tour.location) === "India");
        } else if (filter === "international") {
          result = result.filter((tour) => String(tour.location) !== "India");
        } else {
          result = result.filter((tour) =>
            String(tour.category || "")
              .split(",")
              .map((cat) => cat.trim().toLowerCase())
              .includes(String(filter).toLowerCase())
          );
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

  const handleSearch = (e: string | React.ChangeEvent<HTMLInputElement>) => {
    const query = typeof e === "string" ? e : e.target.value;
    setSearchQuery(query);
    const filterToApply = activeFilter || lastAppliedFilter || "all";
    const results = applyFilters(query, filterToApply as Filter);
    setFilteredTours(results);
  };

  // handler for section changes coming from TourGrid
  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  // --- compute section counts from filteredTours (same rules as TourGrid) ---
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
      return (tour.availableDates as AvailableDateMonth[]).some((month) => Array.isArray(month.dates) && month.dates.some((d) => d.enabled !== false));
    } catch {
    }
    return false;
  };

  const locationTypeOf = (tour: Tour) => String(tour?.locationType || "").trim().toLowerCase();

  const shortDepartures = filteredTours.filter((t) => parseDaysFromDuration(t) <= 4 && hasAvailableDates(t));

  const domesticDepartures = filteredTours.filter(
    (t) => parseDaysFromDuration(t) > 4 && locationTypeOf(t) === "domestic" && hasAvailableDates(t)
  );

  const internationalDepartures = filteredTours.filter((t) => locationTypeOf(t) === "international" && hasAvailableDates(t));

  const groupedSet = new Set<string>([
    ...shortDepartures.map((t) => String(t.id)),
    ...domesticDepartures.map((t) => String(t.id)),
    ...internationalDepartures.map((t) => String(t.id)),
  ]);

  const others = filteredTours.filter((t) => !groupedSet.has(String(t.id)));

  // counts for overlay
  const sectionCounts: Record<string, number> = {
    short: shortDepartures.length,
    domestic: domesticDepartures.length,
    international: internationalDepartures.length,
    other: others.length,
  };

  return (
    <>
      <div key="fixed-departures">
        <HeroSection
          title="Ready‑To‑Go Departures"
          backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          overlay={0.6}
          titleSize="text-4xl md:text-5xl lg:text-6xl "
        />

        <div className="container mx-auto px-4 py-12" id="packages">
          <SectionTitleWithIllustrations
            icon={<Compass size={18} />}
            pillText="Find Your Adventure"
            title="Fixed‑Date Departures"
            color="#f89b21"
            titleSize="large"
            containerClassName="mb-4"
          />

          <TourSearchFilter searchQuery={searchQuery} handleSearch={handleSearch} activeFilter={activeFilter} handleFilterChange={handleFilterChange} />

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
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <TourGrid tours={filteredTours} onSectionChange={handleSectionChange} showOthers={false} />
          )}
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="flex justify-center">
            <SSButton to="/tour/" variant="primary" color="var(--color-green)" className="px-6 py-3">
              Browse All Tours
            </SSButton>
          </div>
        </div>

        <TourOverlay
          sections={[
            { id: "short", label: "Mini Escapes" },
            { id: "domestic", label: "Home‑Turf Adventures" },
            { id: "international", label: "Faraway Wonders" },
          ]}
          currentSection={currentSection}
          sectionCounts={sectionCounts}
        />
      </div>
    </>
  );
};

export default FixedDeparturesPageClient;