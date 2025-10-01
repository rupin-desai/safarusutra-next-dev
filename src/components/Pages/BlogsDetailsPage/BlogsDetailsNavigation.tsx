"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationBlog {
  slug: string;
  title: string;
}

interface BlogsDetailsNavigationProps {
  prevBlog: NavigationBlog | null;
  nextBlog: NavigationBlog | null;
}

export default function BlogsDetailsNavigation({
  prevBlog,
  nextBlog,
}: BlogsDetailsNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
      {prevBlog ? (
        <Link
          href={`/blogs/${prevBlog.slug}`}
          className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-orange)] transition-colors group max-w-[45%]"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform flex-shrink-0"
          />
          <div className="text-left">
            <div className="text-sm text-gray-500 mb-1">Previous Post</div>
            <div className="font-medium line-clamp-1">{prevBlog.title}</div>
          </div>
        </Link>
      ) : (
        <div></div>
      )}

      {nextBlog ? (
        <Link
          href={`/blogs/${nextBlog.slug}`}
          className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-orange)] transition-colors group max-w-[45%]"
        >
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Next Post</div>
            <div className="font-medium line-clamp-1">{nextBlog.title}</div>
          </div>
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1 transition-transform flex-shrink-0"
          />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
