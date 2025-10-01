"use client";

interface BlogsEmptyStateProps {
  onClearFilters: () => void;
}

export default function BlogsEmptyState({
  onClearFilters,
}: BlogsEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-600 mb-4">
        No blogs found matching your criteria.
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-[var(--color-orange)] text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
