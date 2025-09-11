"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import SectionTitle from "../../UI/SectionTitle";

type FAQ = {
  question: string;
  answer: string;
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/20 py-5">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <span className="ml-6 flex-shrink-0 cursor-pointer">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-white" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white/70" />
          )}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={faqTransition}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1">
              <p className="text-base text-white/85">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// keep translate3d strings — cast to any to satisfy TS
const sectionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
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

const containerVariants: Variants = {
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
      damping: 30,
    },
  },
};

// typed transition used by FAQ expand/collapse
const faqTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  // property-specific timing
  opacity: { duration: 0.2 },
};

const faqData: FAQ[] = [
  {
    question: "What exactly does Safari Sutra do?",
    answer:
      "We're your travel BFFs! From booking flights and hotels to planning killer itineraries, we handle everything so you can just show up and enjoy. Think of us as your personal travel genie—minus the lamp.",
  },
  {
    question: "Do you only offer international trips?",
    answer:
      "Nope! Whether you want to road-trip through Rajasthan or island-hop in the Maldives, we've got you covered. India or abroad, we curate trips that fit your vibe (and your budget).",
  },
  {
    question: "Can I get a customised itinerary?",
    answer:
      "Oh, 100%! Cookie-cutter trips? Not our thing. We craft personalised itineraries based on what you like—beaches, mountains, adventure, luxury, all of it.",
  },
  {
    question: "Do you offer last-minute deals?",
    answer:
      "Heck yes! We love spontaneous travellers. Keep an eye out for our last-minute steals and flash deals—you might just snag your dream vacay at a dreamy price.",
  },
  {
    question: "Is it really all-inclusive?",
    answer:
      "Yep! Our packages cover flights, stays, meals —you name it. No surprise costs popping up mid-trip (we're allergic to hidden charges).",
  },
  {
    question: "What if I need help during my trip?",
    answer:
      "We've got your back 24/7! Lost luggage? Flight delayed? Need a dinner recommendation? Hit us up anytime—our support team doesn't do 'out of office'.",
  },
];

const AboutFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0); // first item open by default

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="pb-16 pt-8 px-4">
      <motion.div
        className="container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <motion.div className="mb-12 text-center" variants={titleVariants}>
          <SectionTitle
            icon={<HelpCircle size={16} />}
            pillText="FAQ"
            title="Frequently Asked Questions"
            color="#70A653"
            centered={true}
          />
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Everything you need to know about our safari experiences. Can&#39;t find
            what you&#39;re looking for?{' '}
            <Link
              href="/contact/"
              className="text-[var(--color-orange)] font-medium hover:underline"
            >
              Contact our team
            </Link>
            .
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto rounded-xl p-6 md:p-8 shadow-lg text-white relative overflow-hidden"
          style={{ backgroundColor: "#066959" }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Decorative suitcase image (no window usage) */}
          <div className="absolute right-10 bottom-5 opacity-10 pointer-events-none w-44 md:w-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/suitcase.svg" alt="" aria-hidden="true" className="w-full h-auto" />
          </div>

          <div className="relative z-10">
            {faqData.map((faq, index) => (
              <FAQItem
                key={`faq-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleQuestion(index)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutFAQ;
