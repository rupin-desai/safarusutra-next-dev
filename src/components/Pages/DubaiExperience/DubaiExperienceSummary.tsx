"use client";
import SectionTitle from "@/components/UI/SectionTitle";
import Link from "next/link";
import SSButton from "@/components/UI/SSButton";
import { TreePalm } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Animation variants using translate3d and spring, matching codebase style
const sectionVariants: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 40px, 0px)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function scrollToContactForm() {
  if (typeof window !== "undefined") {
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Optionally, focus the form for accessibility
      setTimeout(() => {
        const firstInput = el.querySelector("input,textarea,select,button");
        if (firstInput) (firstInput as HTMLElement).focus();
      }, 600);
    }
  }
}

export default function DubaiExperienceSummary() {
  return (
    <motion.section
      className="py-10 md:py-16 px-4 md:px-16 bg-white"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Section */}
          <motion.div
            className="w-full mt-8 lg:mt-0 flex flex-col items-center justify-center text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.18 }}
            variants={sectionVariants}
          >
            <SectionTitle
              icon={<TreePalm size={16} />}
              pillText="Our Partner"
              title="Dubai Safari Park Experience"
              color="#066959"
            />

            <div className="prose prose-lg mt-6 text-gray-700 max-w-xl mx-auto lg:mx-0 text-center">
              <p>
                Discover a world where adventure meets nature at Dubai Safari
                Park. Enjoy immersive wildlife encounters, vibrant
                entertainment, unique dining, and lifestyle experiences—all in
                one unforgettable destination. Explore diverse zones, meet
                fascinating animals, and reconnect with nature on every visit.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 flex-wrap justify-center items-center">
              <Link
                href="https://dubaisafari.ae/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SSButton variant="primary" color="var(--color-orange)">
                  Visit Official Website
                </SSButton>
              </Link>
              <SSButton
                variant="outline"
                color="var(--color-dark-teal)"
                onClick={scrollToContactForm}
              >
                Book Now
              </SSButton>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full flex justify-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.18 }}
            variants={sectionVariants}
          >
            <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-full">
              <picture>
                <source
                  srcSet="/images/dubai-safari/dubai-safari-intro-480.webp 480w, /images/dubai-safari/dubai-safari-intro-720.webp 720w, /images/dubai-safari/dubai-safari-intro-1080.webp 1080w"
                  type="image/webp"
                />
                <img
                  src="/images/dubai-safari/dubai-safari-intro-1080.webp"
                  alt="Visitors enjoying Dubai Safari Park experience"
                  className="w-full h-auto object-cover rounded-xl"
                  title="Discover the wonders of Dubai Safari Park with Safari Sutra"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
