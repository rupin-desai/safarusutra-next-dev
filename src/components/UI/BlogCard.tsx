"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag, Folder } from "lucide-react";
import type { Variants } from "framer-motion";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  author: string;
  image: string;
  category?: string;
  tags?: string[];
  index?: number;
}

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 40px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
    },
  },
};

// Category color mapping (matching BlogsSearchFilter)
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

export default function BlogCard({
  slug,
  title,
  description,
  datePublished,
  author,
  image,
  category,
  tags = [],
  index = 0,
}: BlogCardProps) {
  const formattedDate = new Date(datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get category color
  const getCategoryColor = (cat: string): string => {
    return CATEGORY_COLORS[cat] || "#f59e0b"; // Default to orange
  };

  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
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

    // Default colors for other tags
    const otherColors = ["#6366f1", "#14b8a6", "#f43f5e", "#ec4899", "#d946ef"];
    const hash = tag
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return otherColors[hash % otherColors.length];
  };

  const categoryColor = category ? getCategoryColor(category) : "#f59e0b";

  return (
    <motion.article
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/blogs/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-200">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading={index < 3 ? "eager" : "lazy"}
            priority={index < 3}
          />
          {/* Category Badge */}
          {category && (
            <div
              className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: categoryColor }}
            >
              <Folder size={12} />
              {category}
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <time dateTime={datePublished}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{author}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[var(--color-orange)] transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-sm md:text-base line-clamp-3 mb-4">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Tag size={14} className="text-gray-400 flex-shrink-0" />
              {tags.slice(0, 3).map((tag) => {
                const color = getTagColor(tag);
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
              {tags.length > 3 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-[var(--color-orange)] font-medium group-hover:gap-3 transition-all duration-300">
            <span>Read More</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
