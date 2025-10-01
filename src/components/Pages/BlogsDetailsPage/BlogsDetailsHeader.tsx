"use client";

import { Folder, Tag } from "lucide-react";

interface BlogsDetailsHeaderProps {
  category?: string;
  title: string;
  description: string;
  tags?: string[];
  categoryColor: string;
}

// Get tag color based on tag name
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

  const hash = tag.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const colors = ["#6366f1", "#14b8a6", "#f43f5e", "#ec4899", "#d946ef"];
  return colors[hash % colors.length];
};

export default function BlogsDetailsHeader({
  category,
  title,
  description,
  tags = [],
  categoryColor,
}: BlogsDetailsHeaderProps) {
  return (
    <div className="p-8 md:p-12">
      {/* Category */}
      {category && (
        <div
          className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ backgroundColor: categoryColor }}
        >
          <Folder size={16} />
          {category}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {title}
      </h1>
      <div className="h-1 w-16 bg-[var(--color-orange)] mb-6"></div>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Tag size={18} className="text-gray-400 flex-shrink-0" />
          {tags.map((tag) => {
            const color = getTagColor(tag);
            return (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${color}15`,
                  color: color,
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
