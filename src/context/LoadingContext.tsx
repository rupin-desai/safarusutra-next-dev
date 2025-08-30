"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import FontFaceObserver from "fontfaceobserver";

export interface LoadingContextValue {
  isLoading: boolean;
  progress: number;
  preloadedImages: Record<string, string>;
  fontsLoaded: boolean;
}

const defaultValue: LoadingContextValue = {
  isLoading: true,
  progress: 0,
  preloadedImages: {},
  fontsLoaded: false,
};

export const LoadingContext = createContext<LoadingContextValue>(defaultValue);

// Create a list of hero images to preload
const heroImages: string[] = [
  "https://images.unsplash.com/photo-1554629947-334ff61d85dc?fm=jpg&q=70&w=1000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW58ZW58MHx8MHx8fDA=",
  "/logos/logo.svg",
  "/graphics/cloud.min.svg",
];

// Fonts to preload
const fontFamilies = ["Baloo", "Oswald", "Poppins"];

type LoadingProviderProps = { children: ReactNode };

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [preloadedImages, setPreloadedImages] = useState<Record<string, string>>({});
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  // Preload images
  useEffect(() => {
    let mounted = true;
    const preloadImages = async () => {
      const totalItems = heroImages.length + fontFamilies.length;
      let loadedItems = 0;

      const updateProgress = () => {
        if (!mounted) return;
        setProgress(Math.round((loadedItems / totalItems) * 100));
      };

      await Promise.all(
        heroImages.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => {
                if (!mounted) return resolve();
                loadedItems++;
                setPreloadedImages((prev) => ({ ...prev, [src]: img.src }));
                updateProgress();
                resolve();
              };
              img.onerror = () => {
                // count failed loads so progress still completes
                loadedItems++;
                updateProgress();
                resolve();
              };
              img.src = src;
            })
        )
      );
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, []);

  // Preload fonts
  useEffect(() => {
    let mounted = true;
    const loadFonts = async () => {
      await Promise.all(
        fontFamilies.map(async (family) => {
          try {
            const f = new FontFaceObserver(family);
            await f.load(null, 3000).catch(() => {});
          } catch {
            // ignore
          } finally {
            if (mounted) {
              setFontsLoaded(true);
            }
          }
        })
      );
    };

    loadFonts();

    return () => {
      mounted = false;
    };
  }, []);

  // Finish loading when images + fonts are ready (simple heuristic)
  useEffect(() => {
    const totalImages = Object.keys(preloadedImages).length;
    if (totalImages === heroImages.length && fontsLoaded) {
      const timer = window.setTimeout(() => {
        setIsLoading(false);
        setProgress(100);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [preloadedImages, fontsLoaded]);

  return (
    <LoadingContext.Provider value={{ isLoading, progress, preloadedImages, fontsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextValue => useContext(LoadingContext);
