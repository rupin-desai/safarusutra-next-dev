"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import HeroSection from "@/components/UI/HeroSection";
import AboutIntro from "@/components/Pages/AboutPage/AboutIntro";
import AboutExperience from "@/components/Pages/AboutPage/AboutExperience";
import AboutStats from "@/components/Pages/AboutPage/AboutStats";
import AboutDifference from "@/components/Pages/AboutPage/AboutDifference";
import AboutReviews from "@/components/Pages/AboutPage/AboutReviews";
import AboutFAQ from "@/components/Pages/AboutPage/AboutFAQ";
import AboutBanner from "@/components/Pages/AboutPage/AboutBanner";
import HomeHighlight from "@/components/Pages/HomePage/HomeHighlight";

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Head>
        <title>About Us | Safari Sutra</title>
        <meta
          name="description"
          content="Learn about Safari Sutra, our story, values, and what makes us different. Meet the team behind your memorable travel experiences."
        />
        <meta
          name="keywords"
          content="safari sutra, about us, travel agency, tour operator, travel team"
        />
        <link rel="canonical" href="https://thesafarisutra.com/about" />
        <meta property="og:title" content="About Us | Safari Sutra" />
        <meta
          property="og:description"
          content="Learn about Safari Sutra, our story, values, and what makes us different. Meet the team behind your memorable travel experiences."
        />
        <meta property="og:url" content="https://thesafarisutra.com/about" />
        <meta property="og:type" content="website" />
      </Head>

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
};

export default AboutPage;
