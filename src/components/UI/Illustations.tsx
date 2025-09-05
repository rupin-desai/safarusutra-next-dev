import React, { useState, useEffect } from "react";

/**
 * Component to render SVG illustrations from the public directory
 * with customizable size and color by directly changing fill
 */
const Illustration = ({
  name,
  size = 100,
  color = "#000000",
  className = "",
  alt = "Illustration",
}) => {
  const [svgContent, setSvgContent] = useState(null);
  const svgPath = `/illustrations/${name}.svg`;

  // Convert size to pixels if it's a number
  const sizeInPx = typeof size === "number" ? `${size}px` : size;

  useEffect(() => {
    // Fetch the SVG file
    fetch(svgPath)
      .then((response) => response.text())
      .then((svgText) => {
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
          const width = svgElement.getAttribute("width");
          const height = svgElement.getAttribute("height");
          svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }

        // Explicitly set width and height to match the size prop
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");

        // Ensure proper scaling
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Set the color for all paths, shapes, etc.
        const elements = svgElement.querySelectorAll(
          "path, circle, rect, polygon, ellipse"
        );
        elements.forEach((el) => {
          if (color !== "#000000" && el.getAttribute("fill") !== "none") {
            el.setAttribute("fill", color);
          }
        });

        // Convert back to string
        const serializer = new XMLSerializer();
        const modifiedSvgString = serializer.serializeToString(svgElement);

        setSvgContent(modifiedSvgString);
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
      });
  }, [svgPath, color]);

  return (
    <div
      className={`illustration ${className}`}
      style={{
        width: sizeInPx,
        height: sizeInPx, // Make height match width for consistent sizing
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
