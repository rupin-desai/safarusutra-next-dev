"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as mp from "@/lib/mixpanel";

export default function MixpanelProvider(): null {
  // init once (uses embedded default token)
  useEffect(() => {
    mp.initMixpanel();
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // auto page view on route change
  useEffect(() => {
    if (!pathname) return;
    mp.track("Page View", {
      path: pathname,
      title: typeof document !== "undefined" ? document.title : undefined,
      search: searchParams?.toString?.(),
    });
  }, [pathname, searchParams]);

  // simple outbound link click tracking
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null);
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? anchor.href ?? "";
      if (!href) return;
      try {
        const isExternal = href.startsWith("http") && !href.includes(location.host);
        if (isExternal) mp.track("Outbound Link Click", { href });
      } catch {}
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}