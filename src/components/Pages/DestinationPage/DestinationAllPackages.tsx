import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import packageData from "@/data/Destinations.json";
import DestinationCard from "@/components/UI/DestinationCard";
import type { Tour as DestinationCardTour } from "@/components/UI/DestinationCard";

type PackageItem = {
  id: string | number;
  location?: string;
  title?: string;
  srcSetWebp: string;
  srcFallback: string;
  alt?: string;
  imageTitle?: string;
  caption?: string;
  price?: string;
  duration?: string;
  [key: string]: unknown;
};

interface Props {
  filteredPackages?: PackageItem[];
}

const tabsVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const gridVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.06,
      when: "beforeChildren",
    },
  },
};

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const DestinationAllPackages: React.FC<Props> = ({ filteredPackages }) => {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic"
  );
  const [visibleTours, setVisibleTours] = useState<PackageItem[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const allPackages: PackageItem[] = (filteredPackages ??
    (packageData as PackageItem[])) as PackageItem[];

  // Memoize arrays so they don't change on every render
  const domesticTours = useMemo(
    () =>
      allPackages.filter(
        (tour) => String(tour.location ?? "").toLowerCase() === "india"
      ),
    [allPackages]
  );
  const internationalTours = useMemo(
    () =>
      allPackages.filter(
        (tour) => String(tour.location ?? "").toLowerCase() !== "india"
      ),
    [allPackages]
  );

  const shuffleArray = (arr: PackageItem[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const initialTours =
      activeTab === "domestic" ? domesticTours : internationalTours;
    setVisibleTours(shuffleArray(initialTours));
  }, [activeTab, filteredPackages, domesticTours, internationalTours]);

  const selectTab = (tab: "domestic" | "international") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    const toursToShow = tab === "domestic" ? domesticTours : internationalTours;
    setVisibleTours(shuffleArray(toursToShow));
  };

  const getActiveTabColor = (tab: "domestic" | "international") =>
    tab === "domestic" ? "text-orange-500" : "text-green-600";

  const getActiveTabBgColor = (tab: "domestic" | "international") =>
    tab === "domestic" ? "bg-orange-50" : "bg-green-50";

  return (
    <section className="overflow-hidden" ref={sectionRef}>
      <motion.div
        className="flex justify-center mb-12 px-3"
        initial="initial"
        animate="animate"
        variants={tabsVariants}
      >
        <div className="inline-flex w-full max-w-md bg-gray-100 rounded-full p-1.5">
          <motion.button
            onClick={() => selectTab("domestic")}
            className={`flex items-center justify-center flex-1 cursor-pointer px-3 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "domestic"
                ? `bg-white ${getActiveTabColor("domestic")} shadow-sm`
                : `text-gray-600 hover:${getActiveTabBgColor("domestic")}`
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
          >
            <MapPin size={16} className="mr-1 sm:mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Domestic</span>
            <span className="ml-1 sm:ml-2 bg-gray-100 text-xs py-0.5 px-1.5 rounded-full flex-shrink-0">
              {domesticTours.length}
            </span>
          </motion.button>

          <motion.button
            onClick={() => selectTab("international")}
            className={`flex items-center justify-center flex-1 cursor-pointer px-3 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "international"
                ? `bg-white ${getActiveTabColor("international")} shadow-sm`
                : `text-gray-600 hover:${getActiveTabBgColor("international")}`
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
          >
            <Globe size={16} className="mr-1 sm:mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">International</span>
            <span className="ml-1 sm:ml-2 bg-gray-100 text-xs py-0.5 px-1.5 rounded-full flex-shrink-0">
              {internationalTours.length}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        key={activeTab}
        initial="initial"
        animate="animate"
        variants={gridVariants}
      >
        {visibleTours.length > 0 ? (
          <div className="grid-container">
            <style jsx>{`
              .grid-container {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 42px 42px;
              }

              @media (min-width: 768px) {
                .grid-container {
                  grid-template-columns: repeat(2, 1fr);
                }
              }

              @media (min-width: 1024px) {
                .grid-container {
                  grid-template-columns: repeat(3, 1fr);
                }
              }

              .card-wrapper {
                width: 100%;
              }
            `}</style>
            {visibleTours.map((tour, index) => {
              const tourProp: DestinationCardTour = {
                id: tour.id,
                title: String(tour.title ?? ""),
                srcSetWebp: String(tour.srcSetWebp ?? ""),
                srcFallback: String(tour.srcFallback ?? ""),
                alt: String(tour.alt ?? ""),
                imageTitle: String(tour.imageTitle ?? ""),
                location: String(tour.location ?? ""),
                caption: String(tour.caption ?? ""),
                price: String(tour.price ?? ""),
                duration: String(tour.duration ?? ""),
              };

              return (
                <motion.div
                  key={`${String(tour.id)}-${activeTab}`}
                  variants={cardVariants}
                  className="card-wrapper"
                >
                  <DestinationCard tour={tourProp} index={index} />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            className="text-center py-16 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No packages available in this category.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default DestinationAllPackages;
