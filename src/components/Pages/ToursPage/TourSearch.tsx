import React, { ChangeEvent, memo } from "react";
import { Search, X } from "lucide-react";

type HandleSearch = (e: ChangeEvent<HTMLInputElement> | string) => void;

interface Props {
  searchQuery?: string;
  handleSearch: HandleSearch;
}

function TourSearch({ searchQuery = "", handleSearch }: Props): React.ReactElement {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e);
  };

  // Clear search input by sending empty string (caller should handle string case)
  const clearSearch = () => {
    handleSearch("");
  };

  return (
    <div className="flex-1 relative">
      <label htmlFor="tour-search-input" className="sr-only">
        Search tours
      </label>
      <input
        id="tour-search-input"
        type="text"
        placeholder="Search tours, destinations, or experiences..."
        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={searchQuery}
        onChange={handleChange}
        aria-label="Search tours"
      />
      <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />

      {/* Show clear button only when there's text */}
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default memo(TourSearch);
