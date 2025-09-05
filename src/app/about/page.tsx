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
  title: "About Us | Safari Sutra",
  description:
    "Learn about Safari Sutra, our story, values, and what makes us different. Meet the team behind your memorable travel experiences.",
  openGraph: {
    title: "About Us | Safari Sutra",
    description:
      "Learn about Safari Sutra, our story, values, and what makes us different.",
    url: "https://thesafarisutra.com/about",
  },
};

export default function AboutPage(): React.ReactElement {
  return (
    <div>
      <HeroSection
        title="About Us"
        backgroundImage="https://images.unsplash.com/photo-1416432506697-b1045ba8a3da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
