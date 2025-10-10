
import React from "react";
import DubaiExperienceHero from "@/components/Pages/DubaiExperience/DubaiExperienceHero";
import DubaiExperienceSummary from "@/components/Pages/DubaiExperience/DubaiExperienceSummary";
import DubaiExperienceExperiences from "@/components/Pages/DubaiExperience/DubaiExperienceExperiences";
import DubaiExperienceAttractions from "@/components/Pages/DubaiExperience/DubaiExperienceAttractions";
import DubaiExperienceVideos from "@/components/Pages/DubaiExperience/DubaiExperienceVideos";
import DubaiExperiencePartnerBanner from "@/components/Pages/DubaiExperience/DubaiExperiencePartnerBanner";
import ContactSection from "@/components/Pages/ContactPage/ContactSection";



export default function Page() {
  return (
    <div>
      <DubaiExperienceHero />
      <DubaiExperienceSummary />
      <DubaiExperienceExperiences />
      <DubaiExperienceAttractions />
      <DubaiExperienceVideos />
      <DubaiExperiencePartnerBanner />
      <ContactSection />
      {/* JSON-LD structured data ... */}
    </div>
  );
}
