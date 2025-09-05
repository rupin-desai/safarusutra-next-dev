"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Calendar, MapPin, Globe, Star, X } from "lucide-react";

type Section = { id: string; label: string };
interface Props {
  sections?: Section[];
  currentSection?: string | null;
  sectionCounts?: Record<string, number>;
}

/* New: strongly-typed pill style object to avoid `any` */
interface PillStyles {
  bg: string;
  text: string;
  border: string;
  activeText: string;
  solidBgColor: string;
  solidAccent: string;
}

/* Create a properly typed getPillClasses -> returns PillStyles instead of `any` */
const getPillClasses = (key?: string | null): PillStyles => {
  const k = String(key ?? "").toLowerCase();
  const map: Record<string, PillStyles> = {
    short: {
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-700",
      activeText: "text-amber-600",
      solidBgColor: "#b45309",
      solidAccent: "text-amber-600",
    },
    domestic: {
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-700",
      activeText: "text-emerald-600",
      solidBgColor: "#047857",
      solidAccent: "text-emerald-600",
    },
    international: {
      bg: "bg-indigo-50",
      text: "text-indigo-800",
      border: "border-indigo-700",
      activeText: "text-indigo-600",
      solidBgColor: "#4f46e5",
      solidAccent: "text-indigo-600",
    },
    other: {
      bg: "bg-slate-50",
      text: "text-slate-800",
      border: "border-slate-700",
      activeText: "text-slate-600",
      solidBgColor: "#0f172a",
      solidAccent: "text-slate-600",
    },
    default: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      border: "border-gray-700",
      activeText: "text-gray-600",
      solidBgColor: "#1f2937",
      solidAccent: "text-gray-600",
    },
  };

  return map[Object.keys(map).find((m) => k.includes(m)) || "default"];
};

interface TourOverlayProps {
  sections?: Section[];
  currentSection?: string | null;
  sectionCounts?: Record<string, number>;
}

/**
 * TourOverlay
 * minimal, typed, and robust to SSR; closes on outside click; hover + tap friendly.
 */
export default function TourOverlay({
  sections = [],
  currentSection = null,
  sectionCounts = {},
}: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // optimistic local selection so pill updates immediately on mobile when user taps a menu item.
  const [selectedSection, setSelectedSection] = useState<string | null>(currentSection ?? null);
  useEffect(() => {
    setSelectedSection(currentSection ?? null);
  }, [currentSection]);

  // responsive helper: detect small screens and adjust menu horizontal anchor
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    try {
      return typeof window !== "undefined" && window.innerWidth <= 480;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close menu when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      if (!elRef.current) return;
      if (!e.composedPath) {
        if (!(e.target instanceof Node) || elRef.current.contains(e.target)) return;
      } else {
        if (e.composedPath().includes(elRef.current)) return;
      }
      setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [menuOpen]);

  const iconFor = (id?: string | null) => {
    const k = String(id ?? "").toLowerCase();
    const props = { className: "w-4 h-4 md:w-4 md:h-4 text-current" };
    if (k.includes("short")) return <Calendar {...props} />;
    if (k.includes("domestic")) return <MapPin {...props} />;
    if (k.includes("international")) return <Globe {...props} />;
    if (k.includes("other")) return <Star {...props} />;
    return <Star {...props} />;
  };

  const pill = getPillClasses(currentSection);
  const activeCount = sectionCounts[currentSection ?? selectedSection ?? ""] ?? 0;

  const hexToRgba = (hex: string, alpha = 1) => {
    try {
      const h = hex.replace("#", "");
      const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
      const bigint = parseInt(full, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch {
      return `rgba(0,0,0,${alpha})`;
    }
  };

  // menu animation variants (staggered child entry)
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.06,
        duration: 0.32,
      },
    },
    exit: { opacity: 0, y: 8, transition: { when: "afterChildren" } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 6 },
  };

  const orderedSections = useMemo(() => {
    const current = currentSection ?? sections[0]?.id;
    const cur = sections.find((s) => s.id === current);
    if (!cur) return sections;
    return [cur, ...sections.filter((s) => s.id !== current)];
  }, [sections, currentSection]);

  const scrollTo = (id: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!el) return;
    setSelectedSection(id);
    setMenuOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      el.animate(
        [
          { boxShadow: "0 0 0 0 rgba(248,154,33,0)" },
          { boxShadow: "0 0 0 8px rgba(248,154,33,0.12)" },
          { boxShadow: "0 0 0 0 rgba(248,154,33,0)" },
        ],
        { duration: 900 }
      );
    } catch {
      // animation may not be supported in some environments
    }
  };

  const activeSection = selectedSection ?? currentSection ?? sections[0]?.id ?? null;

  return (
    <div
      ref={elRef}
      className="fixed z-50 touch-none"
      style={{ left: "50%", bottom: 24, transform: "translate3d(-50%,0,0)" }}
    >
      <motion.button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
        layout
        initial={{ opacity: 0, transform: "translate3d(-50%,20px,0) scale(.98)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        exit={{ opacity: 0, transform: "translate3d(-50%,8px,0) scale(.98)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring" as const, stiffness: 120, damping: 18, mass: 0.9 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative overflow-hidden flex items-center gap-3 px-3 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer ${pill.bg} ${pill.text} ${pill.border} border`}
        style={{
          display: "inline-flex",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* fill overlay: fills left→right on hover (solid color of border) */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1.4, 0.34, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: pill.solidBgColor || "#000",
            transformOrigin: hovered ? "left" : "right",
          }}
        />

        <span className="relative z-10 flex items-center gap-2">
          <span className={`inline-flex items-center ${hovered ? "text-white" : pill.text}`} aria-hidden="true">
            {iconFor(activeSection)}
          </span>

          <motion.span layout className={`text-sm font-semibold ${hovered ? "text-white" : ""}`}>
            {sections.find((s) => s.id === activeSection)?.label || "Tours"}
          </motion.span>
        </span>

        <motion.span
          layout
          className={`relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-sm font-semibold shadow-sm ${hovered ? pill.solidAccent : pill.text}`}
          aria-hidden="true"
        >
          {activeCount}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring" as const, stiffness: 360, damping: 28 }}
            style={{
              position: "fixed",
              left: isMobile ? "-25%" : "50%",
              bottom: "calc(80px + env(safe-area-inset-bottom))",
              transform: isMobile ? "none" : "translateX(-50%)",
              zIndex: 60,
              width: isMobile ? "80vw" : "min(92vw, 320px)",
              maxWidth: "92vw",
              boxSizing: "border-box",
              margin: "0 auto",
              padding: 0,
            }}
            className="origin-bottom"
          >
            <div
              className="bg-white rounded-lg shadow-xl py-2"
              style={{
                boxSizing: "border-box",
                maxHeight: "60vh",
                overflowY: "auto",
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <div className="px-2">
                {orderedSections.map((s) => {
                  const isActive = s.id === currentSection;
                  const bgHover = hexToRgba(pill.solidBgColor || "#000", 0.06);
                  const c = getPillClasses(s.id);
                  return (
                    <motion.button
                      key={s.id}
                      variants={itemVariants}
                      onClick={() => scrollTo(s.id)}
                      className="w-full text-left px-3 py-2 rounded-md"
                      style={{
                        background: "transparent",
                        cursor: "pointer",
                        color: isActive ? c.solidAccent || "#000" : "#374151",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = bgHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {s.label}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-1 pt-1 flex items-center justify-between px-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 w-full text-left text-xs text-gray-500 hover:bg-gray-50"
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    borderRadius: 6,
                  }}
                >
                  <X size={14} /> <span>Close</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
