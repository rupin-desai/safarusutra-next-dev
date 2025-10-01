"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Search,
  X,
  Filter,
  ChevronUp,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import SSButton from "@/components/UI/SSButton";

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

interface BlogsSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  categories: string[];
  tags: string[];
  totalResults: number;
}

// Category color mapping
const CATEGORY_COLORS: { [key: string]: string } = {
  "Destination Guides": "#10b981", // Emerald green
  Adventure: "#f59e0b", // Amber orange
  "Travel Tips": "#6366f1", // Indigo blue
  Itineraries: "#8b5cf6", // Purple
  Spiritual: "#ec4899", // Pink
  Culture: "#0ea5e9", // Sky blue
  Food: "#ef4444", // Red
  Nature: "#22c55e", // Green
  Heritage: "#a855f7", // Purple variant
  Wildlife: "#14b8a6", // Teal
};

export default function BlogsSearchFilter({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  categories,
  tags,
  totalResults,
}: BlogsSearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  // Effect to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to handle clickaway from filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node)
      ) {
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

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  // Toggle tag filter
  const toggleTagFilter = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  // Remove a specific filter
  const removeFilter = (type: "category" | "tag", value: string) => {
    if (type === "category") {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== value));
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  // Get total count of active filters
  const activeFilterCount = selectedCategories.length + selectedTags.length;

  // Check if any filters are active
  const hasActiveFilters = activeFilterCount > 0 || searchQuery.trim() !== "";

  // Get category color
  const getCategoryColor = (category: string): string => {
    return CATEGORY_COLORS[category] || "#6b7280"; // Default gray if not found
  };

  // Get tag color
  const getTagColor = (tag: string): string => {
    const tagLower = tag.toLowerCase();
    const natureRelated = [
      "kerala",
      "nature",
      "wildlife",
      "mountain",
      "beach",
      "island",
    ];
    const activityRelated = [
      "adventure",
      "trekking",
      "sport",
      "water",
      "climbing",
      "hiking",
    ];
    const experienceRelated = [
      "luxury",
      "budget",
      "spiritual",
      "heritage",
      "culture",
      "food",
    ];
    const travelerRelated = ["honeymoon", "family", "solo", "couple"];
    const locationRelated = ["rajasthan", "ladakh", "goa", "india"];

    if (natureRelated.some((keyword) => tagLower.includes(keyword)))
      return "#10b981";
    if (activityRelated.some((keyword) => tagLower.includes(keyword)))
      return "#f59e0b";
    if (experienceRelated.some((keyword) => tagLower.includes(keyword)))
      return "#8b5cf6";
    if (travelerRelated.some((keyword) => tagLower.includes(keyword)))
      return "#ef4444";
    if (locationRelated.some((keyword) => tagLower.includes(keyword)))
      return "#0ea5e9";

    const hash = tag
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = ["#6366f1", "#14b8a6", "#f43f5e", "#ec4899", "#d946ef"];
    return colors[hash % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white cursor-text"
            placeholder="Search blogs by title, description, or author..."
            aria-label="Search blogs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
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
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center px-5 py-3 rounded-lg border ${
              hasActiveFilters
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            } transition-colors cursor-pointer`}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            type="button"
          >
            <Filter
              size={18}
              className={`mr-2 ${
                hasActiveFilters ? "text-white" : "text-gray-500"
              }`}
            />
            <span className="mr-1">Filters</span>
            {activeFilterCount > 0 && (
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  hasActiveFilters
                    ? "bg-white text-orange-500"
                    : "bg-orange-500 text-white"
                }`}
              >
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
            <motion.span
              variants={tagBubbleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 cursor-pointer"
            >
              <span className="mr-2">Search: {searchQuery}</span>
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1.5 focus:outline-none"
                aria-label="Clear search term"
                type="button"
              >
                <X size={14} />
              </button>
            </motion.span>
          )}

          {/* Category Filters */}
          {selectedCategories.map((category) => {
            const tagColor = getCategoryColor(category);
            return (
              <motion.span
                key={`category-${category}`}
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
                {category}
                <button
                  onClick={() => removeFilter("category", category)}
                  className="ml-1.5 focus:outline-none"
                  aria-label={`Remove ${category} filter`}
                  type="button"
                >
                  <X size={14} />
                </button>
              </motion.span>
            );
          })}

          {/* Tag Filters */}
          {selectedTags.map((tag) => {
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
                  onClick={() => removeFilter("tag", tag)}
                  className="ml-1.5 focus:outline-none"
                  aria-label={`Remove ${tag} filter`}
                  type="button"
                >
                  <X size={14} />
                </button>
              </motion.span>
            );
          })}

          {/* Clear All Button */}
          <button
            onClick={resetFilters}
            className="ml-2 text-sm text-orange-500 hover:underline focus:outline-none cursor-pointer flex items-center"
            type="button"
          >
            <RefreshCw size={14} className="mr-1" />
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
              <h3 className="text-lg font-medium text-gray-800">
                Filter Options
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                aria-label="Close filters"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={`grid ${
                isMobile ? "grid-cols-1 gap-6" : "sm:grid-cols-2 gap-8"
              }`}
            >
              {/* Categories Filter Section */}
              <BlogsFilterSection title="Categories">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <BlogsTagBubble
                      key={`category-${category}`}
                      tag={category}
                      active={selectedCategories.includes(category)}
                      onClick={() => toggleCategoryFilter(category)}
                      color={getCategoryColor(category)}
                    />
                  ))}
                </div>
              </BlogsFilterSection>

              {/* Tags Filter Section */}
              <BlogsFilterSection title="Tags">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <BlogsTagBubble
                      key={`tag-${tag}`}
                      tag={tag}
                      active={selectedTags.includes(tag)}
                      onClick={() => toggleTagFilter(tag)}
                      color={getTagColor(tag)}
                    />
                  ))}
                </div>
              </BlogsFilterSection>
            </div>

            {/* Filter Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 mr-2 hover:text-gray-800 focus:outline-none cursor-pointer"
                type="button"
              >
                Clear All
              </button>
              <SSButton
                onClick={() => setShowFilters(false)}
                color="var(--color-orange)"
              >
                Apply Filters
              </SSButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <p className="text-center text-gray-600 mt-4">
        Showing {totalResults} {totalResults === 1 ? "blog" : "blogs"}
      </p>
    </div>
  );
}

// Helper component for filter sections
const BlogsFilterSection: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`filter-section ${className}`}>
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setIsExpanded((v) => !v)}
        role="button"
        tabIndex={0}
      >
        <h4 className="text-sm uppercase tracking-wide font-medium text-gray-500">
          {title}
        </h4>
        <button
          className="text-gray-400 focus:outline-none"
          type="button"
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title}`}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
              transform: "translate3d(0, -10px, 0)",
            }}
            animate={{
              height: "auto",
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
            }}
            exit={{
              height: 0,
              opacity: 0,
              transform: "translate3d(0, -10px, 0)",
            }}
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

// Helper component for tag bubbles
const BlogsTagBubble: React.FC<{
  tag: string;
  active: boolean;
  onClick: () => void;
  color: string;
}> = ({ tag, active, onClick, color }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${
        active ? "bg-opacity-100" : "bg-opacity-10 hover:bg-opacity-20"
      }`}
      style={{
        backgroundColor: active ? `${color}20` : `${color}10`,
        color: color,
        border: active ? `1px solid ${color}` : "1px solid transparent",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      {tag}
    </motion.button>
  );
};
