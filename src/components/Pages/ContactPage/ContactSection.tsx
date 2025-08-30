"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MessageSquare } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";
import ContactCard from "@/components/UI/ContactCard";

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
      staggerChildren: 0.1,
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
  return (
    <section className="py-16 px-4">
      <motion.div
        className="container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
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

        {/* Contact Card */}
        <div className="max-w-5xl mx-auto">
          <ContactCard />
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
