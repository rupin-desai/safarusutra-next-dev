import React from "react";
import TitlePill from "./TitlePill";

interface SectionTitleProps {
  icon: React.ReactNode;
  pillText: string;
  title: string;
  color?: string;
  titleClassName?: string;
  containerClassName?: string;
  titleSize?: "small" | "medium" | "large" | "default";
  centered?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Section Title component with title pill
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  icon,
  pillText,
  title,
  color = "#066959",
  titleClassName = "",
  containerClassName = "",
  titleSize = "default",
  centered = true,
  as = "h2",
}) => {
  // Get the appropriate classes based on the titleSize prop
  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case "small":
        return "text-2xl md:text-3xl";
      case "medium":
        return "text-2xl md:text-4xl";
      case "large":
        return "text-3xl md:text-5xl lg:text-6xl";
      default:
        return "text-3xl md:text-5xl"; // Keep the original size as default
    }
  };

  const alignmentClass = centered
    ? "items-center text-center"
    : "items-start text-left";

  const TitleTag = as;

  return (
    <div className={`flex flex-col ${alignmentClass} ${containerClassName}`}>
      <div className="mb-3">
        <TitlePill icon={icon} text={pillText} color={color} />
      </div>
      <TitleTag
        className={`${getTitleSizeClasses()} font-family-oswald font-medium mb-8 ${titleClassName}`}
        style={{ fontFamily: "var(--font-family-oswald)" }}
      >
        {title}
      </TitleTag>
    </div>
  );
};

export default SectionTitle;
