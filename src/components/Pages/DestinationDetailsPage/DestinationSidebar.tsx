"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
  attractions?: Attraction[] | string | null;
  [key: string]: unknown;
}

interface Props {
  tourData: TourData;
  executeScroll?: (id: string) => void;
}

const contentFadeIn: Variants = {
  initial: { opacity: 0, transform: "translate3d(0px, 30px, 0px)" },
  animate: { opacity: 1, transform: "translate3d(0px, 0px, 0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

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

  const attractionsList: Attraction[] = useMemo(() => {
    if (Array.isArray(tourData?.attractions)) return tourData.attractions as Attraction[];
    if (typeof tourData?.attractions === "string" && tourData.attractions.trim() !== "") {
      return [{ title: tourData.attractions }];
    }
    return [];
  }, [tourData]);

  useEffect(() => {
    if (!attractionsList.length) {
      console.warn("DestinationSidebar: no attractions found for", tourData?.title ?? "(unknown)");
    }
  }, [attractionsList, tourData]);

  // stronger scroll helper: retries for client-mounted content, computes header offset dynamically,
  // focuses target for accessibility and cleans up pending timers on unmount.
  const pendingTimeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      // clear any pending timeouts when component unmounts
      pendingTimeouts.current.forEach((t) => {
        try {
          window.clearTimeout(t);
        } catch {}
      });
      pendingTimeouts.current = [];
    };
  }, []);

  const executeScrollSafe = useCallback(
    (id: string) => {
      // prefer prop executor first
      if (typeof executeScroll === "function") {
        try {
          executeScroll(id);
          return;
        } catch (e) {
          console.warn("executeScroll prop threw, falling back to global/DOM scroll", e);
        }
      }

      // next, prefer a globally-registered helper (ScrollProvider.client.tsx registers window.executeScroll)
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalFn = (window as any).executeScroll ?? (window as any)._executeScrollFallback;
        if (typeof globalFn === "function") {
          try {
            globalFn(id);
            return;
          } catch (err) {
            console.warn("global executeScroll threw, continuing to DOM fallback", err);
          }
        }
      }

      if (typeof document === "undefined" || typeof window === "undefined") return;

      const headerSelectors = ["header", ".site-header", "#site-header", ".topbar", ".navbar", ".site-navbar"];
      const getHeaderOffset = (): number => {
        for (const sel of headerSelectors) {
          const hdr = document.querySelector<HTMLElement>(sel);
          if (hdr && hdr.offsetHeight) return hdr.offsetHeight + 8;
        }
        // fallback to body fixed elements
        const fixed = document.querySelector<HTMLElement>("[data-sticky], .sticky, .fixed");
        if (fixed && fixed.offsetHeight) return fixed.offsetHeight + 8;
        return 96;
      };

      const doScrollToEl = (el: HTMLElement) => {
        const headerOffset = getHeaderOffset();
        const rect = el.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - headerOffset;
        // Use scrollIntoView first for browser-native behavior, then adjust to offset if needed
        try {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {}
        // Ensure precise offset using window.scrollTo after a tick
        const t = window.setTimeout(() => {
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          try {
            // move focus for accessibility (only if focusable)
            (el as HTMLElement).focus?.();
          } catch {}
        }, 60) as unknown as number;
        pendingTimeouts.current.push(t);
      };

      const fallbackMap: Record<string, string | null> = {
        packages: "destination-packages",
        "destination-packages": "destination-packages",
        attraction: "attractions",
        "attractions-list": "attractions",
        attractions: "attractions",
      };

      // attempt repeated lookups with exponential backoff
      let attempt = 0;
      const maxAttempts = 12;
      const tryFind = () => {
        attempt += 1;
        const el = document.getElementById(id);
        if (el) {
          doScrollToEl(el);
          return true;
        }

        // if it's an attraction target, try the parent attractions section
        if (id.startsWith("attraction-")) {
          const attr = document.getElementById("attractions");
          if (attr) {
            doScrollToEl(attr);
            return true;
          }
        }

        const mapped = fallbackMap[id] ?? null;
        if (mapped) {
          const mappedEl = document.getElementById(mapped);
          if (mappedEl) {
            doScrollToEl(mappedEl);
            return true;
          }
        }

        if (attempt >= maxAttempts) {
          console.warn(`executeScrollSafe: could not find "${id}" after ${attempt} attempts. Available ids:`, Array.from(document.querySelectorAll("[id]")).map((n) => n.id).slice(0, 80));
          return false;
        }

        // schedule next attempt (exponential backoff)
        const delay = Math.min(800, 30 * Math.pow(2, attempt)); // 30,60,120...
        const timeoutId = window.setTimeout(() => {
          tryFind();
        }, delay) as unknown as number;
        pendingTimeouts.current.push(timeoutId);
        return false;
      };

      // kick off
      tryFind();
    },
    [executeScroll]
  );

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
      console.error("copy failed", error);
    }
  };

  return (
    <div className="w-full sticky" style={{ top: "24px", height: "fit-content" }}>
      <motion.div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm" variants={contentFadeIn} initial="initial" animate="animate">
        <h3 className="text-xl font-bold mb-4">On This Page</h3>
        <nav>
          <ul className="space-y-3">
            <motion.li whileHover={hoverMove} transition={hoverTransition}>
              <a
                href="#overview"
                onClick={() => executeScrollSafe("overview")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
                role="button"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-orange)]" />
                Overview
              </a>
            </motion.li>

            <li>
              <p className="text-gray-800 font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-yellow-orange)]" />
                Attractions
              </p>
              <ul className="space-y-2 pl-4 border-l border-gray-200 ml-1">
                {attractionsList.length > 0 ? (
                  attractionsList.map((attraction, idx) => (
                    <motion.li key={String(attraction.title ?? idx)} whileHover={hoverMove} transition={hoverTransition}>
                      <a
                        href={`#attraction-${idx}`}
                        onClick={() => executeScrollSafe(`attraction-${idx}`)}
                        className="text-gray-600 hover:text-[var(--color-yellow-orange)] text-sm transition-colors cursor-pointer text-left block w-full"
                        role="button"
                      >
                        {String(attraction.title ?? `Attraction ${idx + 1}`)}
                      </a>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-gray-500 text-sm">No attractions listed.</li>
                )}
              </ul>
            </li>

            <motion.li whileHover={hoverMove} transition={hoverTransition}>
              <a
                href="#destination-packages"
                onClick={() => executeScrollSafe("destination-packages")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
                role="button"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-dark-teal)]" />
                Packages
              </a>
            </motion.li>

            <motion.li whileHover={hoverMove} transition={hoverTransition}>
              <a
                href="#similar"
                onClick={() => executeScrollSafe("similar")}
                className="text-gray-700 hover:text-[var(--color-orange)] font-medium transition-colors flex items-center gap-2 cursor-pointer"
                role="button"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-medium-brown)]" />
                Similar Tours
              </a>
            </motion.li>
          </ul>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 mb-8">
          <div className="space-y-3">
            <SSButton variant="primary" color="var(--color-orange)" className="w-full flex items-center justify-center gap-2" onClick={handleCustomDestination}>
              Custom Booking
            </SSButton>

            <SSButton variant="outline" color="var(--color-dark-teal)" className="w-full flex items-center justify-center gap-2" onClick={() => { /* keep for analytics */ executeScrollSafe("destination-packages"); }}>
              <a href="#destination-packages" className="block w-full">
                View Packages
              </a>
            </SSButton>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Share This Tour</h3>

            <motion.button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${copied ? "bg-green-100 text-green-700" : "bg-[var(--color-orange)]/10 text-[var(--color-orange)] hover:bg-[var(--color-orange)]/20"}`}
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
