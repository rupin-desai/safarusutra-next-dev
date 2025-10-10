"use client";
import SSButton from "@/components/UI/SSButton";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { scrollToContactForm } from "@/utils/contact.utils";

// Animation variants
const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function handleBookNowClick() {
  scrollToContactForm("contact-form", "smooth", {
    subject: "Dubai Safari Park Booking Inquiry",
    message:
      "I'm interested in booking the Dubai Safari Park experience. Please share more details.",
  });
}

export default function DubaiExperiencePartnerBanner() {
  return (
    <motion.section
      className="py-16 mb-16 px-4 relative"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      {/* Responsive background image with srcSet */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <picture>
          <source
            srcSet="
              /images/dubai-safari/dubai-safari-banner-480.webp 480w,
              /images/dubai-safari/dubai-safari-banner-720.webp 720w,
              /images/dubai-safari/dubai-safari-banner-1080.webp 1080w
            "
            type="image/webp"
          />
          <img
            src="/images/dubai-safari/dubai-safari-banner-1080.webp"
            alt="Dubai Safari Banner"
            className="w-full h-full object-cover object-center absolute inset-0"
            loading="lazy"
            draggable={false}
          />
        </picture>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Official Partners with Dubai Safari
        </h2>
        <p className="text-xl text-white max-w-2xl mx-auto mb-8">
          Safari Sutra is proud to be an official partner with Dubai Safari
          Park, offering our clients exclusive experiences and privileged
          access.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <SSButton
            variant="primary"
            color="var(--color-orange)"
            onClick={handleBookNowClick}
          >
            Book Dubai Safari Park Experience
          </SSButton>
          <a
            href="https://dubaisafari.ae/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SSButton variant="outline" color="white">
              Visit Partner Website
            </SSButton>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
