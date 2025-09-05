import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import TourCard from "@/components/UI/TourCard";
import TourSectionTitle from "./TourSectionTitle";
// keep relative import as in workspace
import tourData from "@/data/TourDetails.json";

const TourGrid = ({
  tours = null,
  onSectionChange = null,
  showOthers = true,
}: {
  tours?: any[] | null;
  onSectionChange?: ((id: string) => void) | null;
  showOthers?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const animatedCards = useRef<Set<string>>(new Set());
  const [packagesData, setPackagesData] = useState<any[]>([]);

  // Initialize packagesData when `tours` prop changes. Avoid depending on packagesData to prevent loops.
  useEffect(() => {
    if (tours && Array.isArray(tours) && tours.length > 0) {
      // quick shallow equality checks before updating
      const needUpdate =
        tours.length !== packagesData.length ||
        (packagesData.length > 0 &&
          (tours[0]?.id !== packagesData[0]?.id ||
            tours[tours.length - 1]?.id !== packagesData[packagesData.length - 1]?.id));
      if (needUpdate) {
        setPackagesData(tours);
      }
    } else if (tourData && tourData.length > 0 && packagesData.length === 0) {
      setPackagesData(tourData as any[]);
    }
    // only re-run when `tours` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tours]);

  // Debug logging when packagesData changes (kept minimal)
  useEffect(() => {
    // noop in production — useful while developing
    // console.debug("TourGrid: packagesData length =", packagesData.length);
  }, [packagesData]);

  // Card intersection observer -> animate on enter (staggered, once)
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!packagesData || packagesData.length === 0) return;

    animatedCards.current = new Set();

    // Set initial hidden state for all card nodes rendered with class "tour-card-item"
    if (typeof document !== "undefined") {
      const cardsInit = Array.from(document.querySelectorAll<HTMLElement>(".tour-card-item"));
      cardsInit.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translate3d(0px, 30px, 0px)";
        c.style.willChange = "transform, opacity";
      });
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const id = el.dataset.id;
          if (!id) return;

          if (animatedCards.current.has(id)) {
            try {
              observerRef.current?.unobserve(el);
            } catch {}
            return;
          }

          const visible = entry.isIntersecting || entry.intersectionRatio > 0.05;
          if (visible) {
            const index = parseInt(el.dataset.index || "0", 10);
            animatedCards.current.add(id);

            const delay = Math.min(0.06 * index, 0.6);
            requestAnimationFrame(() => {
              animate(
                el,
                { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
                { delay, type: "spring", stiffness: 300, damping: 22 }
              );
            });

            try {
              observerRef.current?.unobserve(el);
            } catch {}
          }
        });
      },
      { threshold: [0, 0.02, 0.1, 0.5], rootMargin: "0px 0px -120px 0px" }
    );

    // observe existing nodes and trigger immediate animation for already-visible cards
    const timer = setTimeout(() => {
      if (typeof document === "undefined") return;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".tour-card-item"));
      nodes.forEach((card) => {
        try {
          observerRef.current?.observe(card);
          const rect = card.getBoundingClientRect();
          const viewportH = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top < viewportH && rect.bottom > 0 && !animatedCards.current.has(card.dataset.id || "")) {
            const idx = parseInt(card.dataset.index || "0", 10);
            animatedCards.current.add(card.dataset.id || "");
            requestAnimationFrame(() =>
              animate(
                card,
                { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
                { delay: Math.min(0.06 * idx, 0.6), type: "spring", stiffness: 300, damping: 22 }
              )
            );
            observerRef.current?.unobserve(card);
          }
        } catch {}
      });
    }, 50);

    // fallback stagger if IntersectionObserver misses (runs once)
    const fallback = setTimeout(() => {
      if (typeof document === "undefined") return;
      const remaining = Array.from(document.querySelectorAll<HTMLElement>(".tour-card-item")).filter(
        (c) => !animatedCards.current.has(c.dataset.id || "")
      );
      remaining.forEach((el, i) => {
        const idx = parseInt(el.dataset.index || String(i), 10);
        animatedCards.current.add(el.dataset.id || "");
        requestAnimationFrame(() =>
          animate(
            el,
            { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
            { delay: 0.05 * i, type: "spring", stiffness: 300, damping: 22 }
          )
        );
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
    // animate is stable from useAnimate; packagesData triggers re-run
  }, [animate, packagesData]);

  // Section visibility observer — reports center-most visible section via onSectionChange
  useEffect(() => {
    if (typeof onSectionChange !== "function") return;

    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
      sectionObserverRef.current = null;
    }

    if (!packagesData || packagesData.length === 0) return;

    const sectionIds = ["short", "domestic", "international"];
    if (showOthers) sectionIds.push("other");

    const nodes = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (nodes.length === 0) return;

    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.isIntersecting) {
          const id = best.target.id || best.target.getAttribute("data-section-id");
          if (id) onSectionChange(id);
        }
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: [0.01, 0.2, 0.5] }
    );

    nodes.forEach((n) => sectionObserverRef.current?.observe(n));

    return () => {
      if (sectionObserverRef.current) sectionObserverRef.current.disconnect();
      sectionObserverRef.current = null;
    };
  }, [packagesData, onSectionChange, showOthers]);

  if (!packagesData || packagesData.length === 0) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h3 className="text-xl font-medium text-gray-600">No tours available</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later</p>
      </motion.div>
    );
  }

  // helpers
  const parseDaysFromDuration = (tour: any): number => {
    try {
      const d = String(tour.duration || "");
      const mDays = d.match(/(\d{1,3})\s*D\b/i);
      if (mDays) return parseInt(mDays[1], 10);
      const mNights = d.match(/(\d{1,3})\s*N\b/i);
      if (mNights) return parseInt(mNights[1], 10) + 1;
    } catch {}
    return Infinity;
  };

  const hasAvailableDates = (tour: any): boolean => {
    try {
      if (!Array.isArray(tour?.availableDates)) return false;
      return tour.availableDates.some((month: any) => Array.isArray(month.dates) && month.dates.some((d: any) => d.enabled !== false));
    } catch {
      return false;
    }
  };

  const locationTypeOf = (tour: any) => String(tour?.locationType || "").trim().toLowerCase();

  const shortDepartures = packagesData.filter((t) => parseDaysFromDuration(t) <= 4 && hasAvailableDates(t));
  const domesticDepartures = packagesData.filter((t) => parseDaysFromDuration(t) > 4 && locationTypeOf(t) === "domestic" && hasAvailableDates(t));
  const internationalDepartures = packagesData.filter((t) => locationTypeOf(t) === "international" && hasAvailableDates(t));

  const groupedSet = new Set([
    ...shortDepartures.map((t) => t.id),
    ...domesticDepartures.map((t) => t.id),
    ...internationalDepartures.map((t) => t.id),
  ]);

  const others = packagesData.filter((t) => !groupedSet.has(t.id));

  const renderSection = (title: string, items: any[], sectionKey: string) => {
    if (!items || items.length === 0) return null;

    const pillMap: Record<string, string> = {
      Short: "Short",
      Domestic: "Domestic",
      International: "International",
      Other: "Other",
    };
    const shortKey = Object.keys(pillMap).find((k) => title.toLowerCase().includes(k.toLowerCase()));
    const pillText = shortKey ? pillMap[shortKey] : "Tours";

    return (
      <section id={sectionKey} data-section-id={sectionKey} className="mt-20">
        <TourSectionTitle pillText={pillText} title={title} count={items.length} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((tour, index) => {
            const compositeKey = `${tour.id}-${sectionKey}-${index}`;
            return (
              <div
                key={compositeKey}
                className="tour-card-item opacity-0"
                data-id={compositeKey}
                data-index={index}
                style={{ transform: "translate3d(0px, 30px, 0px)", willChange: "transform, opacity" }}
              >
                <TourCard tour={tour} />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return <div ref={scope}>{renderSection("Short Departures (≤ 4 days)", shortDepartures, "short")}{renderSection("Domestic Departures", domesticDepartures, "domestic")}{renderSection("International Departures", internationalDepartures, "international")}{showOthers && renderSection("More Adventures", others, "other")}</div>;
};

export default TourGrid;
