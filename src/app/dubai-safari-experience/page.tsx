import React from "react";
import type { Metadata } from "next";
import DubaiExperienceHero from "@/components/Pages/DubaiExperience/DubaiExperienceHero";
import DubaiExperienceSummary from "@/components/Pages/DubaiExperience/DubaiExperienceSummary";
import DubaiExperienceExperiences from "@/components/Pages/DubaiExperience/DubaiExperienceExperiences";
import DubaiExperienceAttractions from "@/components/Pages/DubaiExperience/DubaiExperienceAttractions";
import DubaiExperienceVideos from "@/components/Pages/DubaiExperience/DubaiExperienceVideos";
import DubaiExperiencePartnerBanner from "@/components/Pages/DubaiExperience/DubaiExperiencePartnerBanner";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";

// --- SEO/OG/Robots/Canonical/Keywords ---
export const metadata: Metadata = {
  title: "Dubai Safari Park Experience | Safari Sutra Tours & Travels",
  description:
    "Discover Dubai Safari Park with Safari Sutra: exclusive wildlife experiences, attractions, facilities, and official partnership.",
  keywords: [
    "dubai safari park",
    "Dubai Safari Park Experience",
    "safari sutra dubai",
    "wildlife park dubai",
    "dubai attractions",
    "dubai zoo",
    "dubai animal park",
    "family activities dubai",
    "dubai travel",
    "safari park tickets",
    "safari sutra tours",
    "exclusive dubai safari",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://thesafarisutra.com/dubai-safari-experience",
  },
  openGraph: {
    title: "Dubai Safari Park Experience | Safari Sutra Tours & Travels",
    description:
      "Discover Dubai Safari Park with Safari Sutra: exclusive wildlife experiences, attractions, facilities, and official partnership.",
    url: "https://thesafarisutra.com/dubai-safari-experience",
    type: "website",
    siteName: "Safari Sutra",
    images: [
      {
        url: "https://thesafarisutra.com/images/dubai-safari/dubai-safari-hero-1080.webp",
        alt: "Dubai Safari Park - Safari Sutra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Safari Park Experience | Safari Sutra Tours & Travels",
    description:
      "Discover Dubai Safari Park with Safari Sutra: exclusive wildlife experiences, attractions, facilities, and official partnership.",
    images: [
      "https://thesafarisutra.com/images/dubai-safari/dubai-safari-hero-1080.webp",
    ],
  },
};

export default function Page() {
  // JSON-LD for Organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Safari Sutra",
    url: "https://thesafarisutra.com/",
    logo: "https://thesafarisutra.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/safarusutra",
      "https://www.instagram.com/safarusutra",
    ],
  };

  // JSON-LD for WebPage/Breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thesafarisutra.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dubai Safari Park Experience",
        item: "https://thesafarisutra.com/dubai-safari-experience",
      },
    ],
  };

  // JSON-LD for VideoObject
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Dubai Safari Park - Wildlife Innovator Competition Highlights",
    description:
      "Watch a glimpse of the Wildlife Innovator Competition at Dubai Safari Park, brought to you by Safari Sutra.",
    thumbnailUrl: ["https://thesafarisutra.com/images/video-poster.jpg"],
    uploadDate: "2025-09-16",
    contentUrl:
      "https://thesafarisutra.com/videos/dubai-safari/dubai_video_safari_1.webm",
    embedUrl:
      "https://thesafarisutra.com/videos/dubai-safari/dubai_video_safari_1.webm",
    publisher: {
      "@type": "Organization",
      name: "Safari Sutra",
      logo: {
        "@type": "ImageObject",
        url: "https://thesafarisutra.com/images/logo.png",
      },
    },
  };

  // JSON-LD for Place (Dubai Safari Park)
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Dubai Safari Park",
    image: [
      "https://thesafarisutra.com/images/dubai-safari/dubai-safari-hero-1080.webp",
    ],
    description:
      "Dubai Safari Park is a world-class wildlife park in the UAE, home to over 3,000 animals across 78 species.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Warqa 5",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    url: "https://dubaisafari.ae/",
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />

      <div>
        <DubaiExperienceHero />
        <DubaiExperienceSummary />
        <DubaiExperienceExperiences />
        <DubaiExperienceAttractions />
        <DubaiExperienceVideos />
        <DubaiExperiencePartnerBanner />
        <ContactSection />
      </div>
    </>
  );
}
