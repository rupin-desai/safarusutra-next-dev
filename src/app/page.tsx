import React from "react";
import HomeHero from "../components/Pages/HomePage/HomeHero";
import HomeSecond from "../components/Pages/HomePage/HomeSecond";
import HomeThird from "../components/Pages/HomePage/HomeThird";

export const metadata = {
  title: "Safari Sutra | Tour & Travel Agency in India",
  description:
    "Safari Sutra offers unforgettable travel experiences across India and beyond. Explore our domestic and international tour packages for your next adventure.",
  keywords: [
    "safari sutra",
    "travel",
    "tours",
    "india travel",
    "tour packages",
    "international tours",
  ],
  metadataBase: new URL("https://thesafarisutra.com"),
  openGraph: {
    title: "Safari Sutra | Tour & Travel Agency in India",
    description:
      "Safari Sutra offers unforgettable travel experiences across India and beyond. Explore our domestic and international tour packages for your next adventure.",
    url: "https://thesafarisutra.com/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeSecond />
      <HomeThird />
    </>
  );
}