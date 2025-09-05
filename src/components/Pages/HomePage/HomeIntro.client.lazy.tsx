"use client";

import React, { useState, useEffect, Suspense } from "react";
import type { Tour } from "../../UI/TourCard";
import type { HomeIntroProps } from "./HomeIntro.client";

const LazyHomeIntro = React.lazy(() =>
  import("./HomeIntro.client") as Promise<{ default: React.ComponentType<HomeIntroProps> }>
);

export interface HomeIntroLazyProps {
  featuredTours?: Tour[];
  featuredIds?: string[] | number[];
}

export default function HomeIntroLazy(props: HomeIntroLazyProps) {
  const [mounted, setMounted] = useState(false);

  // ensure we render nothing on the server (useEffect runs only in the browser)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const childProps: HomeIntroProps = {
    featuredTours: props.featuredTours,
    featuredIds: props.featuredIds as HomeIntroProps["featuredIds"],
  };

  return (
    <Suspense fallback={null}>
      {/* render the actual client carousel only on the browser */}
      <LazyHomeIntro {...childProps} />
    </Suspense>
  );
}