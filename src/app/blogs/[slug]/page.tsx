import { notFound } from "next/navigation";
import type { Metadata } from "next";
import blogs from "@/data/BlogsData.json";
import HeroSection from "@/components/UI/HeroSection";
import BlogsDetailsHeader from "@/components/Pages/BlogsDetailsPage/BlogsDetailsHeader";
import BlogsDetailsFeaturedImage from "@/components/Pages/BlogsDetailsPage/BlogsDetailsFeaturedImage";
import BlogsDetailsMeta from "@/components/Pages/BlogsDetailsPage/BlogsDetailsMeta";
import BlogsDetailsContent from "@/components/Pages/BlogsDetailsPage/BlogsDetailsContent";
import BlogsDetailsNavigation from "@/components/Pages/BlogsDetailsPage/BlogsDetailsNavigation";
import BlogsDetailsRelatedPosts from "@/components/Pages/BlogsDetailsPage/BlogsDetailsRelatedPosts";

type BlogSlugPageProps = {
  params: { slug: string };
};

// Category color mapping
const CATEGORY_COLORS: { [key: string]: string } = {
  "Destination Guides": "#10b981",
  Adventure: "#f59e0b",
  "Travel Tips": "#6366f1",
  Itineraries: "#8b5cf6",
  Spiritual: "#ec4899",
  Culture: "#0ea5e9",
  Food: "#ef4444",
  Nature: "#22c55e",
  Heritage: "#a855f7",
  Wildlife: "#14b8a6",
};

// Get category color
const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category] || "#f59e0b";
};

export function generateStaticParams() {
  if (!Array.isArray(blogs)) return [];
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found - Safari Sutra",
      description: "The requested blog post could not be found.",
    };
  }

  const pageUrl = `https://thesafarisutra.com/blogs/${blog.slug}`;

  return {
    title: `${blog.title} - Safari Sutra`,
    description: blog.description || "Read this travel story on Safari Sutra",
    keywords: blog.tags || [],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${blog.title} - Safari Sutra`,
      description: blog.description || "Read this travel story on Safari Sutra",
      url: pageUrl,
      type: "article",
      publishedTime: blog.datePublished,
      authors: [blog.author],
      tags: blog.tags || [],
      images: [
        {
          url:
            blog.image ||
            "https://images.unsplash.com/photo-1533850595620-7b1711221751",
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} - Safari Sutra`,
      description: blog.description || "Read this travel story on Safari Sutra",
      images: [
        blog.image ||
          "https://images.unsplash.com/photo-1533850595620-7b1711221751",
      ],
    },
  };
}

export default function BlogSlugPage({ params }: BlogSlugPageProps) {
  const currentIndex = blogs.findIndex((b) => b.slug === params.slug);
  const blog = currentIndex !== -1 ? blogs[currentIndex] : null;

  if (!blog) return notFound();

  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const categoryColor = blog.category
    ? getCategoryColor(blog.category)
    : "#f59e0b";

  // Get related posts with improved logic
  const getRelatedPosts = () => {
    if (!Array.isArray(blogs)) return [];

    // First, try to get posts from same category
    let related = blogs.filter(
      (b) => b.slug !== blog.slug && b.category === blog.category
    );

    // If we have at least 3, return first 3
    if (related.length >= 3) {
      return related.slice(0, 3);
    }

    // If not enough from same category, add posts with matching tags
    const tagMatches = blogs.filter(
      (b) =>
        b.slug !== blog.slug &&
        b.category !== blog.category &&
        b.tags?.some((tag) => blog.tags?.includes(tag))
    );

    related = [...related, ...tagMatches];

    // If still not enough, add latest posts
    if (related.length < 3) {
      const remaining = blogs.filter(
        (b) => b.slug !== blog.slug && !related.includes(b)
      );
      related = [...related, ...remaining];
    }

    // Return exactly 3 posts (or less if not enough blogs exist)
    return related.slice(0, 3);
  };

  const relatedPosts = getRelatedPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description || "",
    datePublished: blog.datePublished || "",
    dateModified: blog.datePublished || "",
    author: {
      "@type": "Person",
      name: blog.author || "Safari Sutra",
    },
    image: blog.image || "",
    publisher: {
      "@type": "Organization",
      name: "Safari Sutra",
      logo: {
        "@type": "ImageObject",
        url: "https://thesafarisutra.com/logos/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thesafarisutra.com/blogs/${blog.slug}`,
    },
    keywords: blog.tags?.join(", ") || "",
    articleSection: blog.category || "",
  };

  return (
    <main className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        backgroundImage={
          blog.image ||
          "https://images.unsplash.com/photo-1533850595620-7b1711221751"
        }
        overlay={0.5}
        customBreadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blogs", path: "/blogs" },
          { label: blog.title, isLast: true },
        ]}
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <BlogsDetailsHeader
            category={blog.category}
            title={blog.title}
            description={blog.description}
            tags={blog.tags}
            categoryColor={categoryColor}
          />

          {/* Featured Image */}
          <BlogsDetailsFeaturedImage src={blog.image} alt={blog.title} />

          {/* Post Content */}
          <div className="p-8 md:p-12">
            {/* Meta Information */}
            <BlogsDetailsMeta
              datePublished={blog.datePublished}
              author={blog.author}
            />

            {/* Content */}
            <BlogsDetailsContent content={blog.content} />

            {/* Navigation */}
            <BlogsDetailsNavigation prevBlog={prevBlog} nextBlog={nextBlog} />
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <BlogsDetailsRelatedPosts relatedPosts={relatedPosts} />
    </main>
  );
}
