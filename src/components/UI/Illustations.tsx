"use client";

import React, { useState, useEffect } from "react";

interface IllustrationProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  alt?: string;
  title?: string;
}

/**
 * Component to render SVG illustrations from the public directory
 * with customizable size and color by directly changing fill
 */
const Illustration: React.FC<IllustrationProps> = ({
  name,
  size = 100,
  color = "#000000",
  className = "",
  alt = "Decorative illustration",
  title = "Decorative illustration",
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const svgPath = `/illustrations/${name}.svg`;

  // Convert size to pixels if it's a number
  const sizeInPx = typeof size === "number" ? `${size}px` : size;

  useEffect(() => {
    if (typeof window === "undefined") return; // ensure client-only

    let mounted = true;
    fetch(svgPath)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to load SVG: ${response.status}`);
        return response.text();
      })
      .then((svgText) => {
        if (!mounted) return;
        // Create a parser to convert the SVG text to a document
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Make sure the SVG has the proper viewBox
        if (
          !svgElement.hasAttribute("viewBox") &&
          svgElement.hasAttribute("width") &&
          svgElement.hasAttribute("height")
        ) {
          const width = svgElement.getAttribute("width")!;
          const height = svgElement.getAttribute("height")!;
          svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        // Explicitly set width and height to match the size prop
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");

        // Ensure proper scaling
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Set the color for common shape elements (avoid overriding explicit 'none')
        const elements = svgElement.querySelectorAll<SVGElement>(
          "path, circle, rect, polygon, ellipse"
        );
        elements.forEach((el) => {
          const currentFill = el.getAttribute("fill");
          if (color && currentFill !== "none") {
            el.setAttribute("fill", color);
          }
        });

        // Set default title and alt for accessibility
        if (!svgElement.querySelector("title")) {
          const titleElem = svgDoc.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          titleElem.textContent = title;
          svgElement.insertBefore(titleElem, svgElement.firstChild);
        }

        // Convert back to string
        const serializer = new XMLSerializer();
        const modifiedSvgString = serializer.serializeToString(svgElement);

        setSvgContent(modifiedSvgString);
      })
      .catch((error) => {
        // keep to console.error for dev diagnostics
        console.error("Error loading SVG:", error);
      });

    return () => {
      mounted = false;
    };
  }, [svgPath, color, title]);

  return (
    <div
      className={`illustration ${className}`}
      role="img"
      aria-label={alt}
      style={{
        width: sizeInPx,
        height: sizeInPx,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {svgContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        />
      )}
    </div>
  );
};

export default Illustration;
