"use client";

import { Calendar, User } from "lucide-react";

interface BlogsDetailsMetaProps {
  datePublished: string;
  author: string;
}

export default function BlogsDetailsMeta({
  datePublished,
  author,
}: BlogsDetailsMetaProps) {
  const formattedDate = new Date(datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Post Details
      </h2>
      <div className="flex flex-wrap items-center gap-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="flex-shrink-0" />
          <span className="text-sm">Posted on:</span>
          <time dateTime={datePublished} className="font-medium">
            {formattedDate}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <User size={18} className="flex-shrink-0" />
          <span className="font-medium">{author}</span>
        </div>
      </div>
    </div>
  );
}
