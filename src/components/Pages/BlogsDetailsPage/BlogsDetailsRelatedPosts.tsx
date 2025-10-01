"use client";

import BlogCard from "@/components/UI/BlogCard";
import SectionTitleWithIllustrations from "@/components/UI/SectionTitleWithIllustrations";
import { BookOpen } from "lucide-react";

interface RelatedBlog {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
}

interface BlogsDetailsRelatedPostsProps {
  relatedPosts: RelatedBlog[];
}

export default function BlogsDetailsRelatedPosts({
  relatedPosts,
}: BlogsDetailsRelatedPostsProps) {
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <SectionTitleWithIllustrations
        icon={<BookOpen size={18} />}
        pillText="More to Explore"
        title="Related Posts"
        centered
        showIllustrations={false}
        titleSize="medium"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 px-4 md:px-12">
        {relatedPosts.map((relatedBlog, index) => (
          <BlogCard
            key={relatedBlog.slug}
            slug={relatedBlog.slug}
            title={relatedBlog.title}
            description={relatedBlog.description}
            datePublished={relatedBlog.datePublished}
            author={relatedBlog.author}
            image={relatedBlog.image}
            category={relatedBlog.category}
            tags={relatedBlog.tags}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
