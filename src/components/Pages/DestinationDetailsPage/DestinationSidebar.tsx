"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Share2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import SSButton from "@/components/UI/SSButton";

interface Attraction {
  title?: string;
  [key: string]: unknown;
}

interface TourData {
  title?: string;
  attractions?: Attraction[] | null;
  [key: string]: unknown;
}

interface Props {
  tourData: TourData;
  executeScroll: (id: string) => void;
}

// Animation variants (typed with Variants)
const contentFadeIn: Variants = {
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

// small hover/tap targets for reuse (no `any`)
const hoverTransition = { type: "spring", stiffness: 500, damping: 25 } as const;
const hoverMove = { x: 4, transition: hoverTransition };
const tapMove = { y: 1 };

const toastVariants: Variants = {
  hidden: { opacity: 0, y: 50, transform: "translate3d(0px,50px,0px)" },
  visible: { opacity: 1, y: 0, transform: "translate3d(0px,0px,0px)" },
  exit: { opacity: 0, y: 20, transform: "translate3d(0px,20px,0px)" },
};

const DestinationSidebar: React.FC<Props> = ({ tourData, executeScroll }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCustomDestination = () => {
    const subject = encodeURIComponent(`Custom Destination Request: ${tourData?.title ?? ""}`);
    const message = encodeURIComponent(
      `I'm interested in creating a custom travel plan for ${tourData?.title ?? ""}. I would like to discuss my preferences and requirements for this destination.`
    );
    router.push(`/contact?subject=${subject}&message=${message}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // keep a minimal console trace for debugging
      // using the variable avoids the "defined but never used" lint warning
      // and avoids `any` usage
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="w-full sticky" style={{ top: "24px", height: "fit-content" }}>
      <motion.div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm" variants={contentFadeIn} initial="initial" animate="animate">
        <h3 className="text-xl font-bold mb-4">On This Page</h3>
        <nav>
          <ul className="space-y-3">
            <motion.li whileHover={hoverMove} transition={hoverTransition}>
              <button
                onClick={() => executeScroll("overview")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-orange)]" />
                Overview
              </button>
            </motion.li>

            <li>
              <p className="text-gray-800 font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-yellow-orange)]" />
                Attractions
              </p>
              <ul className="space-y-2 pl-4 border-l border-gray-200 ml-1">
                {Array.isArray(tourData?.attractions) &&
                  tourData.attractions.map((attraction: Attraction, idx: number) => (
                    <motion.li key={idx} whileHover={hoverMove} transition={hoverTransition}>
                      <button
                        onClick={() => executeScroll(`attraction-${idx}`)}
                        className="text-gray-600 hover:text-[var(--color-yellow-orange)] text-sm transition-colors cursor-pointer text-left block w-full"
                      >
                        {String(attraction.title ?? "")}
                      </button>
                    </motion.li>
                  ))}
              </ul>
            </li>

            <motion.li whileHover={hoverMove} transition={hoverTransition}>
              <button
                onClick={() => executeScroll("packages")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-dark-teal)]" />
                Packages
              </button>
            </motion.li>

            <motion.li whileHover={hoverMove} transition={hoverTransition}>
              <button
                onClick={() => executeScroll("similar")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-medium-brown)]" />
                Similar Tours
              </button>
            </motion.li>
          </ul>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 mb-8">
          <div className="space-y-3">
            <SSButton
              variant="primary"
              color="var(--color-orange)"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleCustomDestination}
            >
              Custom Booking
            </SSButton>

            <SSButton
              variant="outline"
              color="var(--color-dark-teal)"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => executeScroll("packages")}
            >
              View Packages
            </SSButton>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Share This Tour</h3>

            <motion.button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                copied ? "bg-green-100 text-green-700" : "bg-[var(--color-orange)]/10 text-[var(--color-orange)] hover:bg-[var(--color-orange)]/20"
              }`}
              whileHover={!copied ? { y: -2, transition: hoverTransition } : undefined}
              whileTap={!copied ? tapMove : undefined}
              initial={{ y: 0 }}
              onClick={copyToClipboard}
              type="button"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span className="font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={18} />
                  <span className="font-medium">Copy Link</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {copied && (
          <motion.div variants={toastVariants} initial="hidden" animate="visible" exit="exit" className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <Check size={16} className="text-green-400" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationSidebar;
