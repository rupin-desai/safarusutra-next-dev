"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import tourData from "@/data/TourDetails.json";

// Import components (adjusted to actual workspace paths)
import TourHero from "../../../components/Pages/TourDetailsPage/TourHero";
import TourTabs from "../../../components/Pages/TourDetailsPage/TourTabs";
import TourOverview from "../../../components/Pages/TourDetailsPage/TourOverview";
import TourItinerary from "../../../components/Pages/TourDetailsPage/TourItinerary";
import TourInclusions from "../../../components/Pages/TourDetailsPage/TourInclusions";
import TourPolicy from "../../../components/Pages/TourDetailsPage/TourPolicy";
import TourSidebar from "../../../components/Pages/TourDetailsPage/TourSidebar";

const TourPageDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [tour, setTour] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "inclusions" | "policy">("overview");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Add state for selected dates
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    try {
      // Support slug being an id, a slug string, or a numeric id encoded in slug
      const findTour = (s?: string | null) => {
        if (!s) return null;
        const sLower = String(s).toLowerCase();

        // exact id match
        const byId = tourData.find((t: any) => String(t.id) === s);
        if (byId) return byId;

        // match by slug property on tour
        const bySlug = tourData.find((t: any) => String(t.slug || "").toLowerCase() === sLower);
        if (bySlug) return bySlug;

        // match by title (slug-like)
        const byTitle = tourData.find((t: any) => String(t.title || "").toLowerCase().includes(sLower));
        if (byTitle) return byTitle;

        // fallback: parse numeric prefix from slug (e.g. "123-some-title")
        const num = parseInt(String(s).split("-")[0], 10);
        if (!Number.isNaN(num)) {
          const byNum = tourData.find((t: any) => Number(t.id) === num);
          if (byNum) return byNum;
        }

        return null;
      };

      const found = findTour(slug ?? null);

      if (found) {
        setTour(found);
      } else {
        // redirect to destination listing if not found
        router.push("/destination");
      }
    } catch (err) {
      console.error("Error loading tour data:", err);
      router.push("/destination");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const toggleAccordion = (day: number) => {
    setOpenAccordion((prev) => (prev === day ? null : day));
  };

  // Handler for date selection from TourOverview
  const handleDateSelect = (month: string, dateRange: string) => {
    setSelectedMonth(month);
    setSelectedDateRange(dateRange);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!tour) {
    // Safety fallback (should have redirected already)
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{`${tour.title} | Safari Sutra`}</title>
        <meta name="description" content={String(tour.description || "").slice(0, 160)} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : `https://thesafarisutra.com/tour/${tour.id}`} />
      </Head>

      {/* Hero Section */}
      <TourHero tour={tour} />

      {/* Navigation Tabs */}
      <TourTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && <TourOverview tour={tour} onDateSelect={handleDateSelect} />}
            {activeTab === "itinerary" && <TourItinerary tour={tour} openAccordion={openAccordion} toggleAccordion={toggleAccordion} />}
            {activeTab === "inclusions" && <TourInclusions tour={tour} />}
            {activeTab === "policy" && <TourPolicy tour={tour} />}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <TourSidebar tour={tour} selectedMonth={selectedMonth} selectedDateRange={selectedDateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPageDetails;
