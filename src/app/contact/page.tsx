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
    title: "Contact Us | Safari Sutra",
    description:
      "Get in touch with Safari Sutra for travel inquiries, booking assistance, or general questions. Our team is ready to help plan your perfect trip.",
    url: "https://thesafarisutra.com/contact",
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
        backgroundImage="https://images.unsplash.com/photo-1485424103497-0c883b9b2953?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        overlay={0.4}
        titleSize="text-5xl md:text-6xl"
      />
      <ContactSection />
      <HomeHighlight />
    </div>
  );
};

export default ContactPage;
