
import React from "react";
import DubaiExperienceHero from "@/components/Pages/DubaiExperience/DubaiExperienceHero";
import DubaiExperienceSummary from "@/components/Pages/DubaiExperience/DubaiExperienceSummary";
import DubaiExperienceExperiences from "@/components/Pages/DubaiExperience/DubaiExperienceExperiences";
import DubaiExperienceAttractions from "@/components/Pages/DubaiExperience/DubaiExperienceAttractions";
import DubaiExperienceVideos from "@/components/Pages/DubaiExperience/DubaiExperienceVideos";
import DubaiExperienceTips from "@/components/Pages/DubaiExperience/DubaiExperienceTips";
import DubaiExperiencePartnerBanner from "@/components/Pages/DubaiExperience/DubaiExperiencePartnerBanner";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";
import HomeHighlight from "@/components/Pages/HomePage/HomeHighlight";



export default function Page() {
  return (
    <div>
      <DubaiExperienceHero />
      <DubaiExperienceSummary />
      <DubaiExperienceExperiences />
      <DubaiExperienceAttractions />
      <DubaiExperienceVideos />
      <DubaiExperienceTips />
      <DubaiExperiencePartnerBanner />
      <ContactSection />
      <HomeHighlight />
      {/* JSON-LD structured data ... */}
    </div>
  );
}
