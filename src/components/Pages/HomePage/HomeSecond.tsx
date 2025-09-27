/* eslint-disable @next/next/no-img-element */
import React from "react";
import HomeIntro from "./HomeIntro";
import HomeStyle from "./HomeStyle";
import HomeHighlight from "./HomeHighlight";

// Background is rendered statically here to avoid motion.* runtime issues.
// Add motion back only after confirming framer-motion is available and compatible with your runtime.
const HomeSecond: React.FC = () => {
  return (
    <section id="destinations" className="relative py-16">
      {/* Background SVG - updated for mobile compatibility */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div>
          <img
            src="/graphics/bigline.svg"
            alt="Big decorative line for background aesthetics"
            title="Background decorative line graphic"
            className={`
              absolute
              pointer-events-none
              select-none
              object-cover
              h-auto
              w-[475%] -right-[1000px] top-[800px]
              md:-right-[750px] md:w-[220%] md:top-[925px]
              lg:-right-[700px] lg:w-[180%] lg:top-[950px]
              xl:-right-[900px] xl:w-[180%] xl:top-[950px]
              2xl:-right-[1200px] 2xl:w-[195%] 2xl:top-[900px]
            `}
            aria-hidden="true"
            draggable={false}
            style={{
              maxWidth: "none",
              transform: "translateX(0)",
            }}
          />
        </div>
      </div>
      <div className="relative z-10">
        <HomeIntro />
        <HomeStyle />
        <HomeHighlight />
      </div>
    </section>
  );
};

export default HomeSecond;
