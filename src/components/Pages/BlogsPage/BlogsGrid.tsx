"use client";

import BlogCard from "@/components/UI/BlogCard";

interface Blog {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
}

interface BlogsGridProps {
  blogs: Blog[];
}

export default function BlogsGrid({ blogs }: BlogsGridProps) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-12">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.slug}
          slug={blog.slug}
          title={blog.title}
          description={blog.description}
          datePublished={blog.datePublished}
          author={blog.author}
          image={blog.image}
          category={blog.category}
          tags={blog.tags}
          index={index}
        />
      ))}
    </div>
  );
}
