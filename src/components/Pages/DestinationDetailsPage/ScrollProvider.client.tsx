"use client";

import React, { useEffect } from "react";

/* expose a typed global on window */
declare global {
  interface Window {
    executeScroll?: (id: string) => void;
  }
}

/* small robust scroll helper used by sidebar and other client bits */
const createExecuteScroll = () => {
  const headerSelectors = ["header", ".site-header", "#site-header", ".topbar", ".navbar", ".site-navbar"];
  const getHeaderOffset = (): number => {
    try {
      for (const sel of headerSelectors) {
        const hdr = document.querySelector<HTMLElement>(sel);
        if (hdr && hdr.offsetHeight) return hdr.offsetHeight + 8;
      }
      const fixed = document.querySelector<HTMLElement>("[data-sticky], .sticky, .fixed");
      if (fixed && fixed.offsetHeight) return fixed.offsetHeight + 8;
    } catch {}
    return 80;
  };

  const doScroll = (el: HTMLElement) => {
    const headerOffset = getHeaderOffset();
    const rect = el.getBoundingClientRect();
    const targetY = rect.top + window.scrollY - headerOffset;
    try { el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch {}
    window.setTimeout(() => {
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      try { (el as HTMLElement).focus?.(); } catch {}
    }, 60);
  };

  const fallbackMap: Record<string, string> = {
    packages: "destination-packages",
    "destination-packages": "destination-packages",
    attractions: "attractions",
    overview: "overview",
    similar: "similar",
  };

  return (elementId: string) => {
    if (typeof document === "undefined") return;
    const mapped = fallbackMap[elementId] ?? elementId;
    // try immediate find
    const el = document.getElementById(elementId) || document.getElementById(mapped);
    if (el) {
      doScroll(el);
      return;
    }
    // if attraction-N, fallback to attractions parent
    if (elementId.startsWith("attraction-")) {
      const parent = document.getElementById("attractions");
      if (parent) { doScroll(parent); return; }
    }

    // retry window for short time (client fragments)
    let attempts = 0;
    const maxAttempts = 8;
    const retry = () => {
      attempts += 1;
      const found = document.getElementById(elementId) || document.getElementById(mapped);
      if (found) {
        doScroll(found);
        return;
      }
      if (attempts >= maxAttempts) {
        console.warn("executeScroll: element not found:", elementId, "available ids:", Array.from(document.querySelectorAll("[id]")).map(n => n.id).slice(0,80));
        return;
      }
      window.setTimeout(retry, 60 * attempts);
    };
    retry();
  };
};

export default function ScrollProvider(): React.ReactElement | null {
  useEffect(() => {
    const fn = createExecuteScroll();
    // do not overwrite if host already set
    if (!window.executeScroll) {
      window.executeScroll = fn;
    } else {
      // keep host's but provide fallback on window._executeScrollFallback
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)._executeScrollFallback = fn;
    }

    return () => {
      // cleanup only our fallback (do not remove host-provided)
      if (window.executeScroll === fn) delete window.executeScroll;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any)._executeScrollFallback === fn) delete (window as any)._executeScrollFallback;
    };
  }, []);

  return null;
}