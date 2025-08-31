import React from "react";

type TitlePillProps = {
  icon?: React.ReactNode;
  text: string;
  color?: string;
  className?: string;
};

const TitlePill: React.FC<TitlePillProps> = ({ icon, text, color = "#066959", className = "" }) => {
  // Only build an 8-digit hex (with alpha) when a 3/6 hex is passed.
  // For rgb(...) we'll convert to rgba(..., 0.08). For CSS vars or other strings, skip background.
  let background: string | undefined;

  const hex6 = /^#([A-Fa-f0-9]{6})$/;
  const hex3 = /^#([A-Fa-f0-9]{3})$/;
  const rgb = /^rgb\(\s*([0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+)\s*\)$/;

  if (hex6.test(color)) {
    background = `${color}15`; // append alpha in hex (approx 8% opacity)
  } else if (hex3.test(color)) {
    const short = color.slice(1).split("").map((c) => c + c).join("");
    background = `#${short}15`;
  } else if (rgb.test(color)) {
    background = color.replace(rgb, "rgba($1, 0.08)");
  } else {
    background = undefined;
  }

  const style: React.CSSProperties = {
    color,
    ...(background ? { background } : {}),
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-1 rounded-full font-semibold text-sm gap-2 ${className}`}
      style={style}
      role="status"
      aria-label={text}
    >
      {icon ? <span className="flex items-center" aria-hidden="true">{icon}</span> : null}
      <span>{text}</span>
    </span>
  );
};

export default TitlePill;
