import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/UI/HeroSection";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";
import HomeHighlight from "@/components/Pages/HomePage/HomeHighlight";

export const metadata: Metadata = {
  title: "Contact Us | Safari Sutra Tours & Travels in India",
  description:
    "Get in touch with Safari Sutra for travel inquiries, booking assistance, or general questions. Our team is ready to help plan your perfect trip.",
  keywords: [
    "safari sutra contact",
    "travel agency contact",
    "travel inquiry",
    "tour booking",
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
    title: "Contact Us | Safari Sutra", // og:title
    type: "website", // og:type
    url: "https://thesafarisutra.com/contact", // og:url
    description:
      "Get in touch with Safari Sutra for travel inquiries, booking assistance, or general questions. Our team is ready to help plan your perfect trip.", // og:description
    siteName: "Safari Sutra", // og:site_name
    images: [
      {
        url: "https://thesafarisutra.com/logos/logo.png", // og:image
        alt: "Contact Safari Sutra Team", // og:image:alt
      },
    ],
  },
  alternates: {
    canonical: "https://thesafarisutra.com/contact",
  },
};

const ContactPage: React.FC = () => {
  return (
    <div>
      {/* metadata exported via `export const metadata` */}

      <HeroSection
      title="Contact Us"
      backgroundImage="/images/Hero/contact-hero-1080.webp"
      srcSetWebp="/images/Hero/contact-hero-480.webp 480w, /images/Hero/contact-hero-720.webp 720w, /images/Hero/contact-hero-1080.webp 1080w"
      alt="Get in touch with Safari Sutra – Contact Us page hero image"
      imageTitle="Reach out to Safari Sutra for your travel plans"
      overlay={0.4}
      titleSize="text-5xl md:text-6xl"
    />
      <ContactSection />
      <HomeHighlight />
    </div>
  );
};

export default ContactPage;
