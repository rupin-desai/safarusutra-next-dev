"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "@/components/UI/SectionTitle";

const PAGE_SIZE = 12;

interface FAQ {
  question: string;
  answer: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  idx: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, idx }) => (
  <div
    className="border-b border-white/10 py-5"
    itemScope
    itemType="https://schema.org/Question"
    aria-labelledby={`faq-q-${idx}`}
  >
    <button
      id={`faq-q-${idx}`}
      className="w-full flex justify-between items-start text-left focus:outline-none cursor-pointer"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`faq-a-${idx}`}
    >
      <h3 className="text-lg font-medium text-white" itemProp="name">
        {question}
      </h3>
      <span className="ml-4 flex-shrink-0 cursor-pointer">
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-white" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white/90" />
        )}
      </span>
    </button>

    <motion.div
      id={`faq-a-${idx}`}
      role="region"
      aria-hidden={!isOpen}
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0.85 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="overflow-hidden"
      itemProp="acceptedAnswer"
      itemScope
      itemType="https://schema.org/Answer"
    >
      <div className="pt-3 pb-1" itemProp="text">
        <p className="text-base text-white/90">{answer}</p>
      </div>
    </motion.div>
  </div>
);

// cast variants to any to allow translate3d strings
const containerAnim: any = {
  initial: { opacity: 0, transform: "translate3d(0px, 20px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
};

const listItemVariants: any = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

interface DestinationFAQsProps {
  faq?: { items?: FAQ[] } | null;
  destinationTitle: string;
}

const DestinationFAQs: React.FC<DestinationFAQsProps> = ({ faq, destinationTitle }) => {
  const items = faq?.items || [];
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(Math.min(PAGE_SIZE, items.length));

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  const loadMore = () => setVisibleCount((v) => Math.min(items.length, v + PAGE_SIZE));

  const showLess = () => setVisibleCount(Math.min(PAGE_SIZE, items.length));

  const jsonLd = useMemo(() => {
    if (!items.length) return null;
    const mainEntity = items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
      name: `${destinationTitle} FAQ - Safari Sutra`,
    };
  }, [items, destinationTitle]);

  if (!items.length) return null;

  const visibleItems = items.slice(0, visibleCount);

  return (
    <section
      id="destination-faq"
      aria-labelledby="destination-faq-title"
      className="py-12 px-4"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* JSON-LD for SEO */}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <motion.div
        className="mx-auto max-w-6xl"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerAnim}
        transition={{ duration: 0.45 }}
      >
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <HelpCircle size={16} /> FAQ
          </div>
          <h2 id="destination-faq-title" className="mt-4 text-2xl font-semibold text-gray-900">
            Frequently Asked Questions about {destinationTitle}
          </h2>
          <p className="mt-3 text-gray-600">
            Common questions travelers ask about {destinationTitle} — if you need more help,{" "}
            <a href="/contact" className="text-orange-500 font-medium hover:underline">
              contact us
            </a>
            .
          </p>
        </div>

        <div
          className="max-w-6xl mx-auto rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden"
          style={{ backgroundColor: "#066959" }}
        >
          <div className="relative z-10 grid gap-4 md:gap-6 lg:grid-cols-2">
            <AnimatePresence>
              {visibleItems.map((it, idx) => {
                const globalIndex = idx;
                return (
                  <motion.div
                    key={`faq-item-${globalIndex}`}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={listItemVariants}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="min-w-0"
                  >
                    <FAQItem
                      question={it.question}
                      answer={it.answer}
                      isOpen={openIndex === globalIndex}
                      onClick={() => toggle(globalIndex)}
                      idx={globalIndex}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {items.length > PAGE_SIZE && (
            <div className="mt-6 flex justify-center gap-3">
              {visibleCount < items.length ? (
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green-800 rounded-md shadow hover:brightness-95 focus:outline-none cursor-pointer"
                >
                  Load more
                </button>
              ) : (
                <button
                  onClick={showLess}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green-800 rounded-md shadow hover:brightness-95 focus:outline-none cursor-pointer"
                >
                  Show less
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default DestinationFAQs;
