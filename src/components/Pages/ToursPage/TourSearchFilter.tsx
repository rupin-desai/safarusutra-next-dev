import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, Filter, X, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import SSButton from "@/components/UI/SSButton";
import tourDetails from "@/data/TourDetails.json";

type RawTour = {
  category?: string | string[];
  title?: string;
  [key: string]: unknown;
};

type CompositeFilter = {
  type: "composite";
  categories?: string[]; // optional to match other modules
  price?: string[];     // optional to match other modules
};

type ActiveFilter = "all" | string | CompositeFilter;

interface Props {
  searchQuery: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement> | string) => void;
  activeFilter: ActiveFilter;
  handleFilterChange: (filter: ActiveFilter) => void;
}

// Animation variants with translate3d for better performance
const containerVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const filterVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0, -10px, 0)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(0, -10px, 0)",
    transition: {
      duration: 0.2,
    },
  },
};

const tagBubbleVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0, 0, 0) scale(0.8)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    transform: "translate3d(0, 0, 0) scale(0.8)",
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    transform: "translate3d(0, 0, 0) scale(1.05)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

// Dynamically extract unique categories from JSON
const getUniqueCategories = (data: RawTour[]): string[] => {
  const set = new Set<string>();
  data.forEach((pkg) => {
    if (!pkg || !pkg.category) return;
    const cats = Array.isArray(pkg.category) ? pkg.category : String(pkg.category);
    String(cats)
      .split(/[,|;]+/)
      .forEach((cat) => {
        const clean = String(cat || "").trim().toLowerCase();
        if (clean) set.add(clean);
      });
  });
  return Array.from(set).sort();
};

// Extract price ranges
const getPriceRanges = (): string[] => [
  "₹0-₹10,000",
  "₹10,000-₹20,000",
  "₹20,000-₹30,000",
  "₹30,000+",
];

const TourSearchFilter: React.FC<Props> = ({ searchQuery, handleSearch, activeFilter, handleFilterChange }) => {
  // State for expanded filter panel
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Create more detailed filters state
  const [activeFilters, setActiveFilters] = useState<{ categories: string[]; price: string[] }>({
    categories: [],
    price: [],
  });

  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  // Track if this is the first render
  const isInitialMount = useRef(true);

  // Track if we should sync from activeFilter to activeFilters
  const shouldSyncFromParent = useRef(true);

  // Available filter options
  const availableFilters = {
    categories: getUniqueCategories((tourDetails as unknown) as RawTour[]),
    priceRanges: getPriceRanges(),
  };

  // Effect to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Small mobile
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to handle clickaway from filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  // Sync from parent activeFilter to local activeFilters state (one way)
  useEffect(() => {
    if (!shouldSyncFromParent.current) return;

    if (activeFilter === "all") {
      setActiveFilters({ categories: [], price: [] });
    } else if (typeof activeFilter === "string") {
      setActiveFilters({ categories: [activeFilter], price: [] });
    } else if (activeFilter && typeof activeFilter === "object" && (activeFilter as CompositeFilter).type === "composite") {
      const af = activeFilter as CompositeFilter;
      setActiveFilters({
        categories: af.categories || [],
        price: af.price || [],
      });
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      shouldSyncFromParent.current = false;
    }
  }, [activeFilter]);

  // Apply filters when activeFilters changes (local to parent)
  useEffect(() => {
    if (isInitialMount.current) return;
    if (shouldSyncFromParent.current) return;

    const determineActiveFilter = (): ActiveFilter => {
      if (activeFilters.categories.length === 0 && activeFilters.price.length === 0) {
        return "all";
      }
      return {
        type: "composite",
        categories: activeFilters.categories,
        price: activeFilters.price,
      };
    };

    handleFilterChange(determineActiveFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters((v) => !v);
  };

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    shouldSyncFromParent.current = false;
    setActiveFilters((prev) => {
      const newCategories = prev.categories.includes(category) ? prev.categories.filter((c) => c !== category) : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  // Toggle price filter
  const togglePriceFilter = (priceRange: string) => {
    shouldSyncFromParent.current = false;
    setActiveFilters((prev) => {
      const newPrices = prev.price.includes(priceRange) ? prev.price.filter((p) => p !== priceRange) : [...prev.price, priceRange];
      return { ...prev, price: newPrices };
    });
  };

  // Remove a specific filter
  const removeFilter = (type: "categories" | "price", value: string) => {
    shouldSyncFromParent.current = false;
    setActiveFilters((prev) => ({ ...prev, [type]: prev[type].filter((item) => item !== value) }));
  };

  // Reset all filters
  const resetFilters = () => {
    shouldSyncFromParent.current = true;
    handleSearch(""); // clear search properly
    setActiveFilters({ categories: [], price: [] });
    handleFilterChange("all");
  };

  // Custom search handler that disables parent sync
  const handleLocalSearch = (e: ChangeEvent<HTMLInputElement> | string) => {
    shouldSyncFromParent.current = false;
    if (typeof e === "string") {
      handleSearch(e);
    } else {
      handleSearch(e);
    }
  };

  // Get total count of active filters
  const activeFilterCount = activeFilters.categories.length + activeFilters.price.length;

  // Check if any filters are active
  const hasActiveFilters = activeFilterCount > 0 || searchQuery.trim() !== "";

  // Get tag color based on category type
  const getTagColor = (tag: string, type: "categories" | "price") => {
    if (type === "price") return "#10b981"; // Green for price

    const natureRelated = ["nature", "wildlife", "mountain", "beach", "island"];
    const activityRelated = ["adventure", "trekking", "sport", "water", "climbing", "hiking"];
    const experienceRelated = ["luxury", "budget", "spiritual", "heritage", "culture", "food"];
    const travelerRelated = ["honeymoon", "family", "solo", "couple"];

    const tagLower = tag.toLowerCase();

    if (natureRelated.some((keyword) => tagLower.includes(keyword))) return "#10b981";
    if (activityRelated.some((keyword) => tagLower.includes(keyword))) return "#f59e0b";
    if (experienceRelated.some((keyword) => tagLower.includes(keyword))) return "#8b5cf6";
    if (travelerRelated.some((keyword) => tagLower.includes(keyword))) return "#ef4444";

    const otherColors = ["#6366f1", "#14b8a6", "#f43f5e", "#ec4899", "#d946ef"];
    const hash = tag.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return otherColors[hash % otherColors.length];
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 mb-12"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Main Search and Filter Bar */}
      <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleLocalSearch(e)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white cursor-text"
            placeholder="Search tours, activities, or destinations..."
            aria-label="Search tours"
          />
          {searchQuery && (
            <button
              onClick={() => handleLocalSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
              type="button"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <div className="flex-shrink-0">
          <button
            onClick={toggleFilters}
            className={`flex items-center justify-center px-5 py-3 rounded-lg border ${
              hasActiveFilters ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            } transition-colors cursor-pointer`}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            type="button"
          >
            <Filter size={18} className={`mr-2 ${hasActiveFilters ? "text-white" : "text-gray-500"}`} />
            <span className="mr-1">Filters</span>
            {activeFilterCount > 0 && (
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${hasActiveFilters ? "bg-white text-orange-500" : "bg-orange-500 text-white"}`}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>

          {/* Display search term as a filter if present */}
          {searchQuery.trim() !== "" && (
            <motion.span variants={tagBubbleVariants} initial="initial" animate="animate" exit="exit" whileHover="hover" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 cursor-pointer">
              <span className="mr-2">Search: {searchQuery}</span>
              <button onClick={() => handleLocalSearch("")} className="ml-1.5 focus:outline-none" aria-label={`Clear search term`} type="button">
                <X size={14} />
              </button>
            </motion.span>
          )}

          {/* Category Filters */}
          {activeFilters.categories.map((category) => {
            const tagColor = getTagColor(category, "categories");
            return (
              <motion.span key={`category-${category}`} variants={tagBubbleVariants} initial="initial" animate="animate" exit="exit" whileHover="hover" className="inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer" style={{ backgroundColor: `${tagColor}20`, color: tagColor }}>
                {category}
                <button onClick={() => removeFilter("categories", category)} className="ml-1.5 focus:outline-none" aria-label={`Remove ${category} filter`} type="button">
                  <X size={14} />
                </button>
              </motion.span>
            );
          })}

          {/* Price Filters */}
          {activeFilters.price.map((price) => {
            const tagColor = getTagColor(price, "price");
            return (
              <motion.span key={`price-${price}`} variants={tagBubbleVariants} initial="initial" animate="animate" exit="exit" whileHover="hover" className="inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer" style={{ backgroundColor: `${tagColor}20`, color: tagColor }}>
                {price}
                <button onClick={() => removeFilter("price", price)} className="ml-1.5 focus:outline-none" aria-label={`Remove ${price} filter`} type="button">
                  <X size={14} />
                </button>
              </motion.span>
            );
          })}

          {/* Clear All Button */}
          <button onClick={resetFilters} className="ml-2 text-sm text-orange-500 hover:underline focus:outline-none cursor-pointer flex items-center" type="button">
            <RefreshCw size={14} className="mr-1" />
            Clear all
          </button>
        </div>
      )}

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div ref={filterContainerRef} id="filter-panel" className="mt-4 p-5 bg-white border border-gray-200 rounded-lg shadow-lg" variants={filterVariants} initial="initial" animate="animate" exit="exit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Filter Options</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer" aria-label="Close filters" type="button">
                <X size={20} />
              </button>
            </div>

            {/* Updated grid layout to be responsive - side by side on larger screens */}
            <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "sm:grid-cols-2 gap-8"}`}>
              {/* Price Range Filter Section */}
              <FilterSection title="Price Range">
                <div className="space-y-2">
                  {availableFilters.priceRanges.map((range) => (
                    <FilterCheckbox key={`price-${range}`} id={`price-${range}`} label={range} checked={activeFilters.price.includes(range)} onChange={() => togglePriceFilter(range)} />
                  ))}
                </div>
              </FilterSection>

              {/* Categories Filter Section */}
              <FilterSection title="Categories">
                <div className="flex flex-wrap gap-2">
                  {availableFilters.categories.map((category) => (
                    <TagBubble key={`category-${category}`} tag={category} active={activeFilters.categories.includes(category)} onClick={() => toggleCategoryFilter(category)} color={getTagColor(category, "categories")} />
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Filter Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button onClick={resetFilters} className="px-4 py-2 text-gray-600 mr-2 hover:text-gray-800 focus:outline-none cursor-pointer" type="button">
                Clear All
              </button>
              <SSButton onClick={() => setShowFilters(false)} color="var(--color-orange)">
                Apply Filters
              </SSButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper component for filter sections
const FilterSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`filter-section ${className}`}>
      <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setIsExpanded((v) => !v)} role="button" tabIndex={0}>
        <h4 className="text-sm uppercase tracking-wide font-medium text-gray-500">{title}</h4>
        <button className="text-gray-400 focus:outline-none" type="button" aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title}`}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0, transform: "translate3d(0, -10px, 0)" }} animate={{ height: "auto", opacity: 1, transform: "translate3d(0, 0, 0)" }} exit={{ height: 0, opacity: 0, transform: "translate3d(0, -10px, 0)" }} transition={{ duration: 0.2 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper component for filter checkboxes
const FilterCheckbox: React.FC<{ id: string; label: string; checked: boolean; onChange: () => void }> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

// Helper component for tag bubbles
const TagBubble: React.FC<{ tag: string; active: boolean; onClick: () => void; color: string }> = ({ tag, active, onClick, color }) => {
  return (
    <motion.button onClick={onClick} className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${active ? "bg-opacity-100" : "bg-opacity-10 hover:bg-opacity-20"}`} style={{ backgroundColor: active ? `${color}20` : `${color}10`, color: color, border: active ? `1px solid ${color}` : "1px solid transparent" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button">
      {tag}
    </motion.button>
  );
};

export default TourSearchFilter;
