"use client";
import SectionTitle from "@/components/UI/SectionTitle";
import { Video } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Animation variants
const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function DubaiExperienceVideos() {
  // VideoObject JSON-LD
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Dubai Safari Park - Wildlife Innovator Competition Highlights",
    description:
      "Watch a glimpse of the Wildlife Innovator Competition at Dubai Safari Park, brought to you by Safari Sutra.",
    thumbnailUrl: ["https://safarusutra.com/images/video-poster.jpg"],
    uploadDate: "2025-09-16",
    contentUrl:
      "https://safarusutra.com/videos/dubai-safari/dubai_video_safari_1.webm",
    embedUrl:
      "https://safarusutra.com/videos/dubai-safari/dubai_video_safari_1.webm",
    publisher: {
      "@type": "Organization",
      name: "Safari Sutra",
      logo: {
        "@type": "ImageObject",
        url: "https://safarusutra.com/images/logo.png",
      },
    },
  };

  return (
    <motion.section
      className="py-16 px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      {/* VideoObject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <div className="container mx-auto">
        <SectionTitle
          icon={<Video size={16} />}
          pillText="Park Highlights"
          title="Watch a Glimpse of the Park"
          color="#EC4899" // Pink shade
          centered
        />

        <motion.div
          className="max-w-6xl mx-auto mt-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <video
              controls
              width="100%"
              className="rounded-xl w-full h-full min-h-[500px] object-cover bg-black"
              // poster removed
            >
              <source
                src="/videos/dubai-safari/dubai_video_safari_1.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
