"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";

type InstagramEmbedProps = {
  postId: string;
};

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

export default function InstagramEmbed({
  postId,
}: InstagramEmbedProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Attempt to process embeds when script is loaded / available
  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 12; // ~3.6s with 300ms interval

    const tryProcess = () => {
      if (!mounted) return;
      if (
        window.instgrm &&
        window.instgrm.Embeds &&
        typeof window.instgrm.Embeds.process === "function"
      ) {
        try {
          window.instgrm.Embeds.process();
        } catch {
          // ignore processing errors
        }

        // Small timeout to allow instagram to insert nodes, then clean up unwanted parts
        setTimeout(() => {
          if (!mounted || !containerRef.current) return;
          const embeds = containerRef.current.querySelectorAll(
            ".instagram-embed-container, .instagram-media, blockquote.instagram-media"
          );
          embeds.forEach((embed) => {
            // hide header / caption like elements if present
            const header = embed.querySelector("header") as HTMLElement | null;
            const caption = embed.querySelector(
              ".Caption, .caption"
            ) as HTMLElement | null;
            if (header) header.style.display = "none";
            if (caption) caption.style.display = "none";
          });
        }, 700);

        return true;
      }
      return false;
    };

    // First try immediately
    if (!tryProcess()) {
      const interval = window.setInterval(() => {
        attempts += 1;
        if (tryProcess() || attempts >= maxAttempts) {
          window.clearInterval(interval);
        }
      }, 300);

      return () => {
        mounted = false;
        window.clearInterval(interval);
      };
    }

    return () => {
      mounted = false;
    };
  }, [postId]);

  return (
    <div ref={containerRef} className="instagram-embed-container h-full">
      <Script
        id="instagram-embed-script"
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          try {
            if (
              window.instgrm &&
              window.instgrm.Embeds &&
              typeof window.instgrm.Embeds.process === "function"
            ) {
              window.instgrm.Embeds.process();
            }
          } catch {
            // ignore
          }
        }}
      />
      <style>{`
          /* Hide elements we don't want inside the embed */
          .instagram-embed-container .Caption,
          .instagram-embed-container .caption,
          .instagram-embed-container header,
          .instagram-embed-container ._5wCQW {
            display: none !important;
          }
          .instagram-embed-container .EtaWk { margin-top: 0 !important; }
          .instagram-embed-container .X7jCj { display: block !important; }
          .instagram-embed-container .eo2As { padding-top: 4px !important; }
        `}</style>

      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "8px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "0",
          maxWidth: "540px",
          minWidth: "326px",
          padding: "0",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
