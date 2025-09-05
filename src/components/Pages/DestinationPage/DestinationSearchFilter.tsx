"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import SSButton from "../../UI/SSButton";

type Filters = {
  price: string[];
  tags: string[];
};

type AvailableFilters = {
  priceRanges: string[];
  tags: string[];
};

interface DestinationSearchFilterProps {
  onSearch: (term: string, filters: Filters) => void;
  initialSearchTerm?: string;
  initialFilters?: Filters;
  availableFilters?: AvailableFilters;
}

// Animation variants with translate3d for better performance (cast to any)
const filterVariants: any = {
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

const tagBubbleVariants: any = {
  initial: {
    opacity: 0,
    transform: "translate3d(0, 0, 0) scale(0.8)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
    transition: {
      type: "spring",
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
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const DEFAULT_AVAILABLE: AvailableFilters = {
  priceRanges: [
    "₹0-₹10,000",
    "₹10,000-₹20,000",
    "₹20,000-₹30,000",
    "₹30,000+",
  ],
  tags: [
    "beaches",
    "mountains",
    "wildlife",
    "adventure",
    "heritage",
    "spiritual",
    "nature",
    "islands",
    "honeymoon",
    "luxury",
    "budget",
    "family",
    "culture",
    "food",
    "trekking",
    "offbeat",
    "water sports",
  ],
};

const DestinationSearchFilter: React.FC<DestinationSearchFilterProps> = ({
  onSearch,
  initialSearchTerm = "",
  initialFilters = { price: [], tags: [] },
  availableFilters = DEFAULT_AVAILABLE,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [activeFilters, setActiveFilters] = useState<Filters>(initialFilters);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Use pointerdown for unified pointer handling (mouse, touch, pen).
    // Accept Event so both PointerEvent and MouseEvent work without TS errors.
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node | null;
      if (filterContainerRef.current && target && !filterContainerRef.current.contains(target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [showFilters]);

  useEffect(() => {
    onSearch(searchTerm, activeFilters);
  }, [searchTerm, activeFilters, onSearch]);

  const toggleFilters = () => setShowFilters((s) => !s);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const togglePriceFilter = (priceRange: string) =>
    setActiveFilters((prev) => {
      const newPrices = prev.price.includes(priceRange)
        ? prev.price.filter((p) => p !== priceRange)
        : [...prev.price, priceRange];
      return { ...prev, price: newPrices };
    });

  const toggleTagFilter = (tag: string) =>
    setActiveFilters((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });

  const clearAllFilters = () => {
    setActiveFilters({ price: [], tags: [] });
    setSearchTerm("");
  };

  const removeFilter = (type: keyof Filters, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  const activeFilterCount =
    (activeFilters.price?.length || 0) + (activeFilters.tags?.length || 0);
  const hasActiveFilters = activeFilterCount > 0;

  const getTagColor = (tag: string) => {
    const natureRelated = [
      "beaches",
      "mountains",
      "islands",
      "nature",
      "wildlife",
      "waterfalls",
    ];
    const activityRelated = [
      "adventure",
      "trekking",
      "water sports",
      "surfing",
      "snorkeling",
      "yoga",
      "shopping",
      "party",
    ];
    const experienceRelated = [
      "luxury",
      "budget",
      "spiritual",
      "peaceful",
      "romantic",
      "nightlife",
      "food",
      "heritage",
      "culture",
    ];
    const travelerRelated = ["honeymoon", "family", "offbeat"];

    if (natureRelated.includes(tag)) return "#10b981";
    if (activityRelated.includes(tag)) return "#f59e0b";
    if (experienceRelated.includes(tag)) return "#8b5cf6";
    if (travelerRelated.includes(tag)) return "#ef4444";

    const otherColors = ["#0ea5e9", "#ec4899", "#6366f1", "#14b8a6", "#f43f5e"];
    const hash = tag
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return otherColors[hash % otherColors.length];
  };

  return (
    <div className="mb-12 w-full">
      {/* Main Search and Filter Bar */}
      <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent bg-white cursor-text"
            placeholder="Search destinations, activities, or experiences..."
          />
        </div>

        {/* Filter Button */}
        <div className="flex-shrink-0">
          <button
            onClick={toggleFilters}
            className={`flex items-center justify-center px-5 py-3 rounded-lg border ${
              hasActiveFilters
                ? "bg-[var(--color-orange)] border-[var(--color-orange)] text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            } transition-colors cursor-pointer`}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <Filter
              size={18}
              className={`mr-2 ${hasActiveFilters ? "text-white" : "text-gray-500"}`}
            />
            <span className="mr-1">Filters</span>
            {activeFilterCount > 0 && (
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  hasActiveFilters ? "bg-white text-[var(--color-orange)]" : "bg-[var(--color-orange)] text-white"
                }`}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>

          {/* Price Filters */}
          {activeFilters.price.map((price) => (
            <motion.span
              key={`price-${price}`}
              variants={tagBubbleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 cursor-pointer"
            >
              {price}
              <button
                onClick={() => removeFilter("price", price)}
                className="ml-1.5 focus:outline-none cursor-pointer"
                aria-label={`Remove ${price} filter`}
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}

          {/* Tag Filters */}
          {activeFilters.tags.map((tag) => {
            const tagColor = getTagColor(tag);
            return (
              <motion.span
                key={`tag-${tag}`}
                variants={tagBubbleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                className="inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer"
                style={{
                  backgroundColor: `${tagColor}20`,
                  color: tagColor,
                }}
              >
                {tag}
                <button
                  onClick={() => removeFilter("tags", tag)}
                  className="ml-1.5 focus:outline-none cursor-pointer"
                  aria-label={`Remove ${tag} filter`}
                >
                  <X size={14} />
                </button>
              </motion.span>
            );
          })}

          {/* Clear All Button */}
          <button
            onClick={clearAllFilters}
            className="ml-2 text-sm text-[var(--color-orange)] hover:underline focus:outline-none cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            ref={filterContainerRef}
            id="filter-panel"
            className="mt-4 p-5 bg-white border border-gray-200 rounded-lg shadow-lg"
            variants={filterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Filter Options</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-8"}`}>
              {/* Price Range Filter Section */}
              <FilterSection title="Price Range">
                <div className="space-y-2">
                  {availableFilters.priceRanges.map((range) => (
                    <FilterCheckbox
                      key={`price-${range}`}
                      id={`price-${range}`}
                      label={range}
                      checked={activeFilters.price.includes(range)}
                      onChange={() => togglePriceFilter(range)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Travel Tags Filter Section */}
              <FilterSection title="Experience Tags">
                <div className="flex flex-wrap gap-2">
                  {availableFilters.tags.map((tag) => (
                    <TagBubble
                      key={`tag-${tag}`}
                      tag={tag}
                      active={activeFilters.tags.includes(tag)}
                      onClick={() => toggleTagFilter(tag)}
                      color={getTagColor(tag)}
                    />
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Filter Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-gray-600 mr-2 hover:text-gray-800 focus:outline-none cursor-pointer"
              >
                Clear All
              </button>
              <SSButton onClick={() => setShowFilters(false)} color="var(--color-orange)">
                Apply Filters
              </SSButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="filter-section">
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setIsExpanded((s) => !s)}
        role="button"
        tabIndex={0}
        onKeyDown={() => setIsExpanded((s) => !s)}
      >
        <h4 className="text-sm uppercase tracking-wide font-medium text-gray-500">{title}</h4>
        <button className="text-gray-400 focus:outline-none cursor-pointer" aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title}`}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, transform: "translate3d(0, -10px, 0)" } as any}
            animate={{ height: "auto", opacity: 1, transform: "translate3d(0, 0, 0)" } as any}
            exit={{ height: 0, opacity: 0, transform: "translate3d(0, -10px, 0)" } as any}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterCheckbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ id, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-[var(--color-orange)] border-gray-300 rounded focus:ring-[var(--color-orange)] cursor-pointer"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
      {label}
    </label>
  </div>
);

const TagBubble: React.FC<{
  tag: string;
  active: boolean;
  onClick: () => void;
  color: string;
}> = ({ tag, active, onClick, color }) => (
  <motion.button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${active ? "bg-opacity-100" : "bg-opacity-10"}`}
    style={{
      backgroundColor: active ? `${color}20` : `${color}10`,
      color: color,
      border: active ? `1px solid ${color}` : "1px solid transparent",
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    variants={tagBubbleVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {tag}
  </motion.button>
);

export default DestinationSearchFilter;
