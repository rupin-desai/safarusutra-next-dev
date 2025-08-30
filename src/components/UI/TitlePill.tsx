import React from "react";

/**
 * TitlePill component
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon component (e.g. <SomeIcon />)
 * @param {string} props.text - Text to display
 * @param {string} [props.color="#066959"] - Tailwind or hex color for text and border
 * @param {string} [props.className] - Extra classes
 */
const TitlePill = ({ icon, text, color = "#066959", className = "" }) => {
  return (
    <span
      className={`inline-flex items-center px-4 py-1 rounded-full font-semibold text-sm gap-2`}
      style={{
        color,
        background: `${color}15`, // 3% opacity for subtle bg
      }}
    >
      <span className="flex items-center">{icon}</span>
      <span>{text}</span>
    </span>
  );
};

export default TitlePill;
