"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { MessageSquare } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";
import ContactCard from "@/components/UI/ContactCard";
import QueryParamHandler from "./QueryParamHandler.client"; // new import

// Animation variants defined outside component
const sectionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const titleVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ContactSection: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  // useInView gives a consistent boolean to drive animations
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="py-16 px-4" ref={ref}>
      <motion.div
        className="container mx-auto"
        initial="initial"
        animate={inView ? "animate" : "initial"}
        variants={sectionVariants}
      >
        {/* Section Title */}
        <motion.div variants={titleVariants} className="mb-12">
          <SectionTitle
            icon={<MessageSquare size={16} />}
            pillText="Contact"
            title="Let's Plan Your Safari Adventure"
            color="#066959"
          />
        </motion.div>

        {/* ensure query params are handled before ContactCard mounts */}
        <QueryParamHandler />

        {/* Contact Card */}
        <div className="max-w-5xl mx-auto">
          <ContactCard />
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
