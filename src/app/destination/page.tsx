"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Head from "next/head";
import HeroSection from "@/components/UI/HeroSection";
import DestinationAllPackages from "@/components/Pages/DestinationPage/DestinationAllPackages";
import DestinationDiscover from "@/components/Pages/DestinationPage/DestinationDiscover";
import DestinationContactBanner from "@/components/Pages/DestinationPage/DestinationContactBanner";
import DestinationSearchFilter from "@/components/Pages/DestinationPage/DestinationSearchFilter";
import packageData from "@/data/Destinations.json";

const DestinationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    price: [] as string[],
    tags: [] as string[],
  });
  const [filteredPackages, setFilteredPackages] = useState(() => packageData);

  // Gather all unique filter options from package data
  const availableFilters = useMemo(() => {
    const locations = [...new Set(packageData.map((pkg) => pkg.location))].sort();

    const priceRanges = [
      "₹0-₹10,000",
      "₹10,000-₹20,000",
      "₹20,000-₹30,000",
      "₹30,000+",
    ];

    const allTags = packageData.reduce<string[]>((tags, pkg) => {
      return pkg.tags ? [...tags, ...pkg.tags] : tags;
    }, []);
    const uniqueTags = [...new Set(allTags)].sort();

    return {
      locations,
      priceRanges,
      tags: uniqueTags,
    };
  }, []);

  // Handle search and filter changes
  const handleSearchAndFilter = useCallback((term: string, filters: { price: string[]; tags: string[] }) => {
    setSearchTerm(term);
    setActiveFilters(filters);
  }, []);

  // Filter packages based on search term and active filters
  useEffect(() => {
    const filterPackages = () => {
      let results = [...packageData];

      if (searchTerm) {
        const lowerCaseTerm = searchTerm.toLowerCase();
        results = results.filter((pkg) => {
          const highlightsMatch = Array.isArray(pkg.highlights)
            ? pkg.highlights.some((h: string) => h.toLowerCase().includes(lowerCaseTerm))
            : false;

          const tagsMatch = Array.isArray(pkg.tags)
            ? pkg.tags.some((tag: string) => tag.toLowerCase().includes(lowerCaseTerm))
            : false;

          return (
            pkg.title?.toLowerCase().includes(lowerCaseTerm) ||
            pkg.caption?.toLowerCase().includes(lowerCaseTerm) ||
            pkg.description?.toLowerCase().includes(lowerCaseTerm) ||
            highlightsMatch ||
            tagsMatch
          );
        });
      }

      if (activeFilters.price && activeFilters.price.length > 0) {
        results = results.filter((pkg) => {
          const price = Number(String(pkg.price).replace(/[^\d]/g, "")) || 0;

          return activeFilters.price.some((range) => {
            if (range === "₹0-₹10,000") return price <= 10000;
            if (range === "₹10,000-₹20,000") return price > 10000 && price <= 20000;
            if (range === "₹20,000-₹30,000") return price > 20000 && price <= 30000;
            if (range === "₹30,000+") return price > 30000;
            return false;
          });
        });
      }

      if (activeFilters.tags && activeFilters.tags.length > 0) {
        results = results.filter(
          (pkg) => Array.isArray(pkg.tags) && activeFilters.tags.some((tag) => pkg.tags.includes(tag))
        );
      }

      setFilteredPackages(results);
    };

    filterPackages();
  }, [searchTerm, activeFilters]);

  return (
    <div>
      <Head>
        <title>Tour Packages | Safari Sutra</title>
        <meta
          name="description"
          content="Explore our wide range of domestic and international tour packages. From mountains to beaches, city breaks to wildlife adventures - find your perfect journey."
        />
        <meta
          name="keywords"
          content="tour packages, travel packages, domestic tours, international tours, india tours"
        />
        <link rel="canonical" href="https://thesafarisutra.com/tour" />
        <meta property="og:title" content="Tour Packages | Safari Sutra" />
        <meta
          property="og:description"
          content="Explore our wide range of domestic and international tour packages. From mountains to beaches, city breaks to wildlife adventures - find your perfect journey."
        />
        <meta property="og:url" content="https://thesafarisutra.com/tour" />
        <meta property="og:type" content="website" />
      </Head>

      <HeroSection
        title="Where To Next?"
        backgroundImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        overlay={0.4}
        titleSize="text-4xl md:text-6xl"
      />

      <section className="py-12 px-4 md:px-8" id="destinations">
        <div className="container mx-auto max-w-7xl">
          <DestinationSearchFilter
            onSearch={handleSearchAndFilter}
            availableFilters={availableFilters}
            initialFilters={{ price: [], tags: [] }}
          />

          <DestinationAllPackages filteredPackages={filteredPackages} />
        </div>
      </section>

      <DestinationDiscover />
      <DestinationContactBanner />
    </div>
  );
};

export default DestinationPage;
