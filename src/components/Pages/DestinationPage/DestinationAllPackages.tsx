import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import packageData from "@/data/Destinations.json";
import SectionTitle from "@/components/UI/SectionTitle";
import DestinationCard from "@/components/UI/DestinationCard";

type PackageItem = any;

interface Props {
  filteredPackages?: PackageItem[];
}

// Animation variants (cast to any to allow translate3d strings)
const titleVariants: any = {
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

const tabsVariants: any = {
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

const gridVariants: any = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const cardVariants: any = {
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

  // Use the filteredPackages prop if provided, otherwise use all packageData
  const allPackages: PackageItem[] = filteredPackages ?? (packageData as PackageItem[]);

  // Define domestic and international packages
  const domesticTours = allPackages.filter((tour) => tour.location === "India");
  const internationalTours = allPackages.filter((tour) => tour.location !== "India");

  // Fisher-Yates shuffle to randomize tours without mutating original array
  const shuffleArray = (arr: PackageItem[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Initialize visible tours whenever activeTab or filteredPackages change
  useEffect(() => {
    const initialTours = activeTab === "domestic" ? domesticTours : internationalTours;
    setVisibleTours(shuffleArray(initialTours));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, filteredPackages]);

  // Handle tab switching
  const selectTab = (tab: "domestic" | "international") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    const toursToShow = tab === "domestic" ? domesticTours : internationalTours;
    setVisibleTours(shuffleArray(toursToShow));
  };

  // Get the active tab color based on tab selection
  const getActiveTabColor = (tab: "domestic" | "international") =>
    tab === "domestic" ? "text-orange-500" : "text-green-600";

  // Get the active tab background color
  const getActiveTabBgColor = (tab: "domestic" | "international") =>
    tab === "domestic" ? "bg-orange-50" : "bg-green-50";

  return (
    <section className="overflow-hidden" ref={sectionRef}>
      {/* Animated Tab Selector - Improved Mobile Responsiveness */}
      <motion.div
        className="flex justify-center mb-12 px-3"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={tabsVariants}
      >
        <div className="inline-flex w-full max-w-md bg-gray-100 rounded-full p-1.5">
          {/* Domestic Tab Button */}
          <motion.button
            onClick={() => selectTab("domestic")}
            className={`flex items-center justify-center flex-1 cursor-pointer px-3 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "domestic"
                ? `bg-white ${getActiveTabColor("domestic")} shadow-sm`
                : `text-gray-600 hover:${getActiveTabBgColor("domestic")}`
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MapPin size={16} className="mr-1 sm:mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Domestic</span>
            <span className="ml-1 sm:ml-2 bg-gray-100 text-xs py-0.5 px-1.5 rounded-full flex-shrink-0">
              {domesticTours.length}
            </span>
          </motion.button>

          {/* International Tab Button */}
          <motion.button
            onClick={() => selectTab("international")}
            className={`flex items-center justify-center flex-1 cursor-pointer px-3 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "international"
                ? `bg-white ${getActiveTabColor("international")} shadow-sm`
                : `text-gray-600 hover:${getActiveTabBgColor("international")}`
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Globe size={16} className="mr-1 sm:mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">International</span>
            <span className="ml-1 sm:ml-2 bg-gray-100 text-xs py-0.5 px-1.5 rounded-full flex-shrink-0">
              {internationalTours.length}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Package Cards with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {visibleTours.length > 0 ? (
            <div className="grid-container">
              <style jsx>{`
                .grid-container {
                  display: grid;
                  grid-template-columns: repeat(1, 1fr);
                  gap: 42px 42px; /* Equal horizontal and vertical gap */
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
              {visibleTours.map((tour, index) => (
                <motion.div
                  key={`${tour.id}-${activeTab}`}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={index}
                  className="card-wrapper"
                >
                  <DestinationCard tour={tour} index={index} />
                </motion.div>
              ))}
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
      </AnimatePresence>
    </section>
  );
};

export default DestinationAllPackages;
