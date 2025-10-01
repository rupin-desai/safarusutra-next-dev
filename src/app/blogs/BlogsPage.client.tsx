"use client";

import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { PenLine } from "lucide-react";
import blogs from "@/data/BlogsData.json";
import HeroSection from "@/components/UI/HeroSection";
import SectionTitleWithIllustrations from "@/components/UI/SectionTitleWithIllustrations";
import BlogsSearchFilter from "@/components/Pages/BlogsPage/BlogsSearchFilter";
import BlogsGrid from "@/components/Pages/BlogsPage/BlogsGrid";
import BlogsPagination from "@/components/Pages/BlogsPage/BlogsPagination";
import BlogsEmptyState from "@/components/Pages/BlogsPage/BlogsEmptyState";

const BLOGS_PER_PAGE = 6;

const containerVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function BlogsPageClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique categories and tags
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogs.map((blog) => blog.category)));
    return cats.sort();
  }, []);

  const tags = useMemo(() => {
    const allTags = blogs.flatMap((blog) => blog.tags || []);
    const uniqueTags = Array.from(new Set(allTags));
    return uniqueTags.sort();
  }, []);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(blog.category);

      const matchesTag =
        selectedTags.length === 0 ||
        (blog.tags && blog.tags.some((tag) => selectedTags.includes(tag)));

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategories, selectedTags]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Safari Sutra Travel Blog",
    description:
      "Explore inspiring travel stories, destination guides, and expert tips for your next adventure across India and beyond.",
    url: "https://thesafarisutra.com/blogs",
    publisher: {
      "@type": "Organization",
      name: "Safari Sutra",
      logo: {
        "@type": "ImageObject",
        url: "https://thesafarisutra.com/logos/logo.png",
      },
    },
    blogPost: Array.isArray(blogs)
      ? blogs.map((blog) => ({
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.description,
          datePublished: blog.datePublished,
          author: {
            "@type": "Person",
            name: blog.author,
          },
          image: blog.image,
          url: `https://thesafarisutra.com/blogs/${blog.slug}`,
        }))
      : [],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        title="Blogs"
        backgroundImage="https://images.unsplash.com/photo-1533850595620-7b1711221751"
        overlay={0.5}
      />
      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionTitleWithIllustrations
          icon={<PenLine size={18} />}
          pillText="Travel Stories & Tips"
          title="Latest Blogs From SafariSutra"
          centered
          showIllustrations
          titleSize="large"
          as="h1"
        />

        {/* Search and Filter Section */}
        <motion.div
          className="max-w-6xl mx-auto mt-8"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <BlogsSearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            categories={categories}
            tags={tags}
            totalResults={filteredBlogs.length}
          />
        </motion.div>

        {/* Blog Grid or Empty State */}
        {currentBlogs.length > 0 ? (
          <>
            <BlogsGrid blogs={currentBlogs} />
            <BlogsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <BlogsEmptyState onClearFilters={resetFilters} />
        )}
      </section>
    </main>
  );
}
