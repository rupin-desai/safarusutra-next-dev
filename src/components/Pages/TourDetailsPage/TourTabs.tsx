"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, Variants } from "framer-motion";

const VALID_TABS = ["overview", "itinerary", "inclusions", "policy"] as const;
type Tab = (typeof VALID_TABS)[number];

interface Props {
  initialTab?: Tab;
  onChangeTab?: (tab: Tab) => void;
  activeTab?: Tab;
  setActiveTab?: (tab: Tab) => void;
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
}) => {
  const [localActive, setLocalActive] = useState<Tab>(
    propActiveTab ?? initialTab
  );
  const active = (propActiveTab ?? localActive) as Tab;

  // Scroll to section on tab click
  const handleTabClick = (tab: Tab) => {
    setLocalActive(tab);
    if (typeof propSetActiveTab === "function") propSetActiveTab(tab);
    if (typeof onChangeTab === "function") onChangeTab(tab);

    // Scroll to the section
    if (typeof window !== "undefined") {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div>
      <Head>
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
                const isActive = active === tab;
                return (
                  <React.Fragment key={tab}>
                    {index > 0 && (
                      <div className="h-5 w-px bg-gray-300 mx-2 md:mx-4" />
                    )}
                    <button
                      type="button"
                      onClick={() => handleTabClick(tab)}
                      className={`relative whitespace-nowrap cursor-pointer px-1 md:px-2 py-2 text-sm md:text-base font-medium transition-all duration-300 block ${
                        isActive
                          ? "text-[var(--color-orange)]"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      aria-current={isActive ? "page" : "false"}
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
                            transition={{
                              duration: 0.3,
                              ease: [0.42, 0, 0.58, 1],
                            }}
                          />
                        )}
                      </motion.span>
                    </button>
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
