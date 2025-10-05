import type { Metadata } from "next";
import HeroSection from "@/components/UI/HeroSection";
import AboutIntro from "@/components/Pages/AboutPage/AboutIntro";
import AboutExperience from "@/components/Pages/AboutPage/AboutExperience";
import AboutStats from "@/components/Pages/AboutPage/AboutStats";
import AboutDifference from "@/components/Pages/AboutPage/AboutDifference";
import AboutReviews from "@/components/Pages/AboutPage/AboutReviews";
import AboutFAQ from "@/components/Pages/AboutPage/AboutFAQ";
import AboutBanner from "@/components/Pages/AboutPage/AboutBanner";
import HomeHighlight from "@/components/Pages/HomePage/HomeHighlight";

export const metadata: Metadata = {
  title: "About Us | Safari Sutra Tours & Travels in India",
  description:
    "Learn about Safari Sutra, our story, values, and what makes us different. Meet the team behind your memorable travel experiences.",
  keywords: [
    "safari sutra about",
    "travel company values",
    "safari sutra team",
    "travel agency india",
    "safari sutra mission",
    "travel experience india",
    "travel company background",
    "travel company history",
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
  openGraph: {
    title: "About Us | Safari Sutra",
    type: "website",
    url: "https://thesafarisutra.com/about",
    description:
      "Learn about Safari Sutra, our story, values, and what makes us different.",
    siteName: "Safari Sutra",
    images: [
      {
        url: "https://thesafarisutra.com/logos/logo.png",
        alt: "Safari Sutra Team - About Us",
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/about",
  },
};

// runtime sanity checks to surface which import is undefined during prerender
const assertComponent = (name: string, comp: unknown) => {
  const ok = comp && (typeof comp === "function" || typeof comp === "object");
  if (!ok) {
    throw new Error(
      `AboutPage import "${name}" is undefined or not a React component. ` +
        `Check that the file at the import path exports a default React component (default export), and verify the import path.`
    );
  }
};

assertComponent("HeroSection", HeroSection);
assertComponent("AboutIntro", AboutIntro);
assertComponent("AboutExperience", AboutExperience);
assertComponent("AboutStats", AboutStats);
assertComponent("AboutDifference", AboutDifference);
assertComponent("AboutReviews", AboutReviews);
assertComponent("AboutFAQ", AboutFAQ);
assertComponent("AboutBanner", AboutBanner);
assertComponent("HomeHighlight", HomeHighlight);

export default function AboutPage(): React.ReactElement {
  return (
    <div>
      <HeroSection
        title="About Us"
        backgroundImage="/images/Hero/about-hero-1080.webp"
        srcSetWebp="/images/Hero/about-hero-480.webp 480w, /images/Hero/about-hero-720.webp 720w, /images/Hero/about-hero-1080.webp 1080w"
        alt="Safari Sutra team on an adventure – About Us page hero image"
        imageTitle="Meet the Safari Sutra team – passionate travel experts"
        overlay={0.6}
      />

      <AboutIntro />
      <AboutExperience />
      <AboutStats />
      <AboutDifference />
      <AboutReviews />
      <AboutBanner />

      <div className="py-12">
        <HomeHighlight />
      </div>

      <AboutFAQ />
    </div>
  );
}
