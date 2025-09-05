"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import SSButton from "@/components/UI/SSButton";

interface Props {
  tourData: any;
  executeScroll: (id: string) => void;
}

// Animation variants (cast to any when needed)
const contentFadeIn: any = {
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
    } catch (err) {
      // silent fail
    }
  };

  return (
    <div className="w-full sticky" style={{ top: "24px", height: "fit-content" }}>
      <motion.div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm" variants={contentFadeIn}>
        <h3 className="text-xl font-bold mb-4">On This Page</h3>
        <nav>
          <ul className="space-y-3">
            <motion.li
              initial={{ transform: "translate3d(0px, 0px, 0px)" }}
              whileHover={{ transform: "translate3d(4px, 0px, 0px)" }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
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
                  tourData.attractions.map((attraction: any, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ transform: "translate3d(0px, 0px, 0px)" }}
                      whileHover={{ transform: "translate3d(4px, 0px, 0px)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <button
                        onClick={() => executeScroll(`attraction-${idx}`)}
                        className="text-gray-600 hover:text-[var(--color-yellow-orange)] text-sm transition-colors cursor-pointer text-left block w-full"
                      >
                        {attraction.title}
                      </button>
                    </motion.li>
                  ))}
              </ul>
            </li>

            <motion.li
              initial={{ transform: "translate3d(0px, 0px, 0px)" }}
              whileHover={{ transform: "translate3d(4px, 0px, 0px)" }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <button
                onClick={() => executeScroll("packages")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-dark-teal)]" />
                Packages
              </button>
            </motion.li>

            <motion.li
              initial={{ transform: "translate3d(0px, 0px, 0px)" }}
              whileHover={{ transform: "translate3d(4px, 0px, 0px)" }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
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
              whileHover={!copied ? ({ transform: "translate3d(0px, -2px, 0px)", transition: { type: "spring", stiffness: 500, damping: 15 } } as any) : undefined}
              whileTap={!copied ? ({ transform: "translate3d(0px, 1px, 0px)" } as any) : undefined}
              initial={{ transform: "translate3d(0px, 0px, 0px)" }}
              onClick={copyToClipboard}
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Check size={16} className="text-green-400" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationSidebar;
