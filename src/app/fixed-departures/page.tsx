import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import HeroSection from "../../ui/Elements/HeroSection";
import SectionTitleWithIllustrations from "../../ui/Elements/SectionTitleWithIllustrations";
import TourSearchFilter from "../../components/Tour/TourSearchFilter";
import TourGrid from "../../components/Tour/TourGrid";
import TourCard from "../../components/Tour/TourCard";
import packageData from "../../data/packagedetails.json";
import TourOverlay from "../../components/Tour/TourOverlay";
import SSButton from "../../ui/Buttons/SSButton";

// Shuffle function to randomize the tours array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TourPage = () => {
  const location = useLocation();
  // treat both /tour and /tours as "all tours" URL variants
  const isAllTours = location.pathname.startsWith("/tour");

  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastAppliedFilter, setLastAppliedFilter] = useState(null);

  // New: current visible section id (short/domestic/international/other)
  const [currentSection, setCurrentSection] = useState("short");

  useEffect(() => {
    try {
      setIsLoading(true);
      if (packageData && packageData.length > 0) {
        const randomizedTours = shuffleArray(packageData);
        setTours(randomizedTours);
        setFilteredTours(randomizedTours);
        console.log("Tours loaded:", randomizedTours.length);
      } else {
        console.error("Package data is empty or invalid");
      }
    } catch (error) {
      console.error("Error loading package data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized applyFilters function (unchanged) ...
  const applyFilters = useMemo(() => {
    return (query, filter) => {
      console.log("Applying filters:", { query, filter });
      let result = [...tours];
      if (query && query.trim() !== "") {
        const lowerCaseQuery = query.toLowerCase();
        result = result.filter(
          (tour) =>
            (tour.title && tour.title.toLowerCase().includes(lowerCaseQuery)) ||
            (tour.route && tour.route.toLowerCase().includes(lowerCaseQuery)) ||
            (tour.description &&
              tour.description.toLowerCase().includes(lowerCaseQuery)) ||
            (tour.category &&
              tour.category.toLowerCase().includes(lowerCaseQuery)) ||
            (tour.location &&
              tour.location.toLowerCase().includes(lowerCaseQuery))
        );
      }

      if (filter && typeof filter === "object" && filter.type === "composite") {
        if (filter.categories && filter.categories.length > 0) {
          result = result.filter((tour) => {
            if (!tour.category) return false;
            const tourCategories = tour.category
              .split(",")
              .map((cat) => cat.trim().toLowerCase());
            return filter.categories.some((filterCat) =>
              tourCategories.includes(filterCat.toLowerCase())
            );
          });
        }

        if (filter.price && filter.price.length > 0) {
          result = result.filter((tour) => {
            if (!tour.price) return false;
            return filter.price.some((priceRange) => {
              const range = priceRange.replace(/₹/g, "").split("-");
              if (range.length === 2) {
                const min = parseInt(range[0].replace(/,/g, ""));
                const max = parseInt(range[1].replace(/,/g, ""));
                return tour.price >= min && tour.price <= max;
              } else if (priceRange.includes("+")) {
                const min = parseInt(priceRange.replace(/₹|\+|,/g, ""));
                return tour.price >= min;
              }
              return false;
            });
          });
        }
      } else if (filter && filter !== "all") {
        if (filter === "india") {
          result = result.filter((tour) => tour.location === "India");
        } else if (filter === "international") {
          result = result.filter((tour) => tour.location !== "India");
        } else {
          result = result.filter(
            (tour) =>
              tour.category &&
              tour.category
                .split(",")
                .map((cat) => cat.trim().toLowerCase())
                .includes(filter.toLowerCase())
          );
        }
      }

      console.log("Filter results:", result.length);
      return result;
    };
  }, [tours]);

  const handleFilterChange = useCallback(
    (filter) => {
      console.log("Filter changed to:", filter);
      setActiveFilter(filter);
      setLastAppliedFilter(filter);
      const results = applyFilters(searchQuery, filter);
      setFilteredTours(results);
    },
    [applyFilters, searchQuery]
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filterToApply = activeFilter || lastAppliedFilter || "all";
    const results = applyFilters(query, filterToApply);
    setFilteredTours(results);
  };

  // handler for section changes coming from TourGrid
  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  // --- compute section counts from filteredTours (same rules as TourGrid) ---
  const parseDaysFromDuration = (tour) => {
    try {
      const d = String(tour.duration || "");
      const mDays = d.match(/(\d{1,3})\s*D\b/i);
      if (mDays) return parseInt(mDays[1], 10);
      const mNights = d.match(/(\d{1,3})\s*N\b/i);
      if (mNights) return parseInt(mNights[1], 10) + 1;
    } catch (e) {}
    return Infinity;
  };

  const hasAvailableDates = (tour) => {
    try {
      if (!Array.isArray(tour?.availableDates)) return false;
      return tour.availableDates.some(
        (month) =>
          Array.isArray(month.dates) &&
          month.dates.some((d) => d.enabled !== false)
      );
    } catch (e) {
      return false;
    }
  };

  const locationTypeOf = (tour) =>
    String(tour?.locationType || "")
      .trim()
      .toLowerCase();

  const shortDepartures = filteredTours.filter(
    (t) => parseDaysFromDuration(t) <= 4 && hasAvailableDates(t)
  );

  const domesticDepartures = filteredTours.filter(
    (t) =>
      parseDaysFromDuration(t) > 4 &&
      locationTypeOf(t) === "domestic" &&
      hasAvailableDates(t)
  );

  const internationalDepartures = filteredTours.filter(
    (t) => locationTypeOf(t) === "international" && hasAvailableDates(t)
  );

  const groupedSet = new Set([
    ...shortDepartures.map((t) => t.id),
    ...domesticDepartures.map((t) => t.id),
    ...internationalDepartures.map((t) => t.id),
  ]);

  const others = filteredTours.filter((t) => !groupedSet.has(t.id));

  // counts
  const sectionCounts = isAllTours
    ? { all: filteredTours.length }
    : {
        short: shortDepartures.length,
        domestic: domesticDepartures.length,
        international: internationalDepartures.length,
        other: others.length,
      };

  // creative title for All Tours
  const pageTitle = isAllTours
    ? "All Journeys — Every Expedition & Hidden Gem | Safari Sutra"
    : "Explore Our Curated Tour Collection | Safari Sutra";

  const pageDescription = isAllTours
    ? "Browse every tour across Safari Sutra — curated escapes, classic itineraries and hidden gems for every traveler."
    : "Explore our curated selection of fixed departures: mini escapes, home‑turf adventures and faraway wonders.";

  // page-level animation variants (simple and quick)
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease: "easeIn" } },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <AnimatePresence mode="wait">
        {/* key toggles when switching between /tour and /fixeddepartures to force animation both ways */}
        <motion.div
          key={isAllTours ? "all-tours" : "fixed-departures"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
        >
          <HeroSection
            title={
              isAllTours ? "Tours That Make Stories" : "Ready‑To‑Go Departures"
            }
            subtitle={
              isAllTours
                ? "From mountain treks to beachside bliss, discover adventures that create lasting memories and Instagram-worthy moments."
                : "Handpicked fixed‑date departures with guaranteed departure dates — book quickly and travel confidently."
            }
            buttonText="Find Your Next Adventure"
            buttonColor="var(--color-orange)"
            scrollTo="packages"
            backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            overlay={0.6}
            titleSize="text-4xl md:text-5xl lg:text-6xl "
          />

          <div className="container mx-auto px-4 py-12" id="packages">
            <SectionTitleWithIllustrations
              icon={<Compass size={18} />}
              pillText="Find Your Adventure"
              title={
                isAllTours
                  ? "All Journeys: Discover Every Expedition"
                  : "Explore Our Curated Tour Collection"
              }
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
                <p className="text-xl font-medium text-gray-600">
                  Loading tours...
                </p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-medium text-gray-600 mb-4">
                  No tours found matching your criteria
                </p>
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
            ) : isAllTours ? (
              // Simple single-list grid for "All Tours" URL (no section segregation)
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                id="packages-list"
              >
                {filteredTours.map((tour, idx) => (
                  <div key={`${tour.id}-all-${idx}`} className="tour-card-item">
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            ) : (
              // Fixed Departures: grouped sections (no "others" removed by TourGrid prop)
              <TourGrid
                tours={filteredTours}
                onSectionChange={handleSectionChange}
                showOthers={false}
              />
            )}
          </div>

          {/* Bottom CTA to switch listing mode: shows opposite listing URL */}
          <div className="container mx-auto px-4 pb-12">
            <div className="flex justify-center">
              <SSButton
                to={isAllTours ? "/fixeddepartures" : "/tour"}
                type="primary"
                color="var(--color-green)"
                className="px-6 py-3"
              >
                {isAllTours ? "See Fixed Departures" : "Browse All Tours"}
              </SSButton>
            </div>
          </div>

          {/* Overlay only for fixeddepartures listing */}
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
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TourPage;
