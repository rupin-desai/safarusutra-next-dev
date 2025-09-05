import React, { useMemo } from "react";
import { Filter, ChevronDown } from "lucide-react";
import tourDetailsRaw from "@/data/TourDetails.json";

type PackageItem = { category?: string | string[] };

/**
 * Safely extract unique category keys from package data.
 */
const getUniqueCategories = (data: PackageItem[]): string[] => {
  const set = new Set<string>();
  data.forEach((pkg) => {
    if (!pkg || !pkg.category) return;

    if (Array.isArray(pkg.category)) {
      pkg.category.forEach((c) => {
        const clean = String(c).trim().toLowerCase();
        if (clean) set.add(clean);
      });
    } else {
      // split on common separators (comma / pipe / semicolon)
      String(pkg.category)
        .split(/[,|;]+/)
        .forEach((cat) => {
          const clean = cat.trim().toLowerCase();
          if (clean) set.add(clean);
        });
    }
  });
  return Array.from(set);
};

const capitalize = (str?: string) => {
  const s = String(str ?? "");
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

interface Props {
  activeFilter: string;
  handleFilterChange: (value: string) => void;
}

const packageDetails = (tourDetailsRaw as unknown) as PackageItem[];

const TourFilter: React.FC<Props> = ({ activeFilter, handleFilterChange }) => {
  const filters = useMemo(() => ["all", ...getUniqueCategories(packageDetails)], []);

  return (
    <div className="relative flex items-center w-full md:w-auto" aria-hidden={filters.length === 0}>
      <Filter size={18} className="text-gray-400 mr-2 hidden md:block" aria-hidden="true" />
      <div className="relative w-full">
        <label htmlFor="tour-filter-select" className="sr-only">
          Filter tours
        </label>
        <select
          id="tour-filter-select"
          aria-label="Filter tours"
          className="w-full md:w-auto appearance-none px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-8 transition-all duration-150"
          value={activeFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {capitalize(filter)}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default TourFilter;
