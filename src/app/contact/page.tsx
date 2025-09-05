import React from "react";
import Head from "next/head";
import HeroSection from "@/components/UI/HeroSection";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";
import HomeHighlight from "@/components/Pages/HomePage/HomeHighlight";

const ContactPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Contact Us | Safari Sutra</title>
        <meta
          name="description"
          content="Get in touch with Safari Sutra for travel inquiries, booking assistance, or general questions. Our team is ready to help plan your perfect trip."
        />
        <meta
          name="keywords"
          content="safari sutra contact, travel agency contact, travel inquiry, tour booking"
        />
        <link rel="canonical" href="https://thesafarisutra.com/contact" />
        <meta property="og:title" content="Contact Us | Safari Sutra" />
        <meta
          property="og:description"
          content="Get in touch with Safari Sutra for travel inquiries, booking assistance, or general questions. Our team is ready to help plan your perfect trip."
        />
        <meta property="og:url" content="https://thesafarisutra.com/contact" />
        <meta property="og:type" content="website" />
      </Head>

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
