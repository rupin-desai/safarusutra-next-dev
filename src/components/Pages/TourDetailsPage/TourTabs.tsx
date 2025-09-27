"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

const VALID_TABS = ["overview", "itinerary", "inclusions", "policy"] as const;
type Tab = typeof VALID_TABS[number];

interface Props {
  initialTab?: Tab;
  onChangeTab?: (tab: Tab) => void;
  activeTab?: Tab;
  setActiveTab?: (tab: Tab) => void;
  // added slug prop so pages can pass the current slug (primitive only)
  slug?: string;
}

const tabsVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 10px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

const TourTabs: React.FC<Props> = ({
  initialTab = "overview",
  onChangeTab,
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab,
  slug: slugProp,
}) => {
  const pathname = usePathname() ?? "/";

  // derive active tab from pathname if present
  const pathLower = pathname.toLowerCase();
  const pathActive: Tab = pathLower.endsWith("/itinerary/")
    ? "itinerary"
    : pathLower.endsWith("/inclusions/")
    ? "inclusions"
    : pathLower.endsWith("/policy/")
    ? "policy"
    : "overview";

  // prefer explicit prop activeTab, then initialTab, then path-derived
  const [localActive, setLocalActive] = useState<Tab>(propActiveTab ?? initialTab ?? pathActive);
  const active = (propActiveTab ?? localActive) as Tab;

  useEffect(() => {
    if (pathActive !== active) {
      setLocalActive(pathActive);
      if (typeof propSetActiveTab === "function") propSetActiveTab(pathActive);
      if (typeof onChangeTab === "function") onChangeTab(pathActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // parse id/slug from pathname segments to build base route
  const buildBase = () => {
    // if page explicitly passed slug, prefer that
    if (slugProp && slugProp.length > 0) return `/tour/${encodeURIComponent(slugProp)}`;

    const parts = pathname.split("/").filter(Boolean); // remove empty segments
    const tourIndex = parts.findIndex((p) => p === "tour");
    if (tourIndex === -1) return pathname; // fallback to current path
    const next = parts[tourIndex + 1] ?? "";
    return `/tour/${encodeURIComponent(next)}`;
  };

  // Generate URLs for each tab
  const getTabUrl = (tab: Tab): string => {
    const base = buildBase();
    return tab === "overview" ? base : `${base}/${tab}`;
  };

  const handleTabClick = (tab: Tab) => {
    if (!VALID_TABS.includes(tab)) return;

    if (typeof propSetActiveTab === "function") propSetActiveTab(tab);
    setLocalActive(tab);
    if (typeof onChangeTab === "function") onChangeTab(tab);

    // Smooth scroll to top when tab changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const origin =
    typeof window !== "undefined" && window.location && window.location.origin
      ? window.location.origin
      : "https://thesafarisutra.com";

  return (
    <div>
      <Head>
        <link rel="canonical" href={`${origin}${pathname}`} />
        <meta name="robots" content="index,follow" />
      </Head>

      <div className="bg-white shadow-md z-30">
        <motion.div
          className="container mx-auto px-4 py-2 md:py-3"
          initial="initial"
          animate="animate"
          variants={tabsVariants}
        >
          <div className="flex justify-start md:justify-center overflow-x-auto scrollbar-hide">
            <div className="flex items-center py-1 px-1">
              {VALID_TABS.map((tab, index) => {
                const tabUrl = getTabUrl(tab);
                const isActive = active === tab;
                
                return (
                  <React.Fragment key={tab}>
                    {index > 0 && <div className="h-5 w-px bg-gray-300 mx-2 md:mx-4" />}

                    <Link
                      href={tabUrl}
                      onClick={() => handleTabClick(tab)}
                      className={`relative whitespace-nowrap cursor-pointer px-1 md:px-2 py-2 text-sm md:text-base font-medium transition-all duration-300 block ${
                        isActive ? "text-[var(--color-orange)]" : "text-gray-600 hover:text-gray-900"
                      }`}
                      aria-current={isActive ? "page" : "false"}
                      prefetch={true}
                    >
                      <motion.span
                        initial="initial"
                        whileHover="hover"
                        className="block"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-orange)] rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                          />
                        )}
                      </motion.span>
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TourTabs;
