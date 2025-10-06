import React from "react";
import Link from "next/link";
import SSButton from "@/components/UI/SSButton";

type ToursFromImage = {
  srcSetWebp?: string;
  srcFallback: string;
  alt?: string;
  imageTitle?: string;
};

type Contact = {
  office?: string;
  title?: string;
  text?: string;
  backgroundImage?: string | ToursFromImage;
};

export default function ToursFromContact({ contact }: { contact: Contact }) {
  if (!contact) return null;

  const heading = contact.title ?? "Plan Your Trip";
  const bodyText =
    contact.text ??
    "Ready to escape Mumbai’s hustle? Contact Safari Sutra at our Powai office or email us to craft your 2025 journey. From Gujarat’s heritage to Andaman’s islands, your adventure starts here. Book now and let’s make travel unforgettable!";

  // Support new srcSetWebp/fallback format for background image
  function renderBgImage(img: string | ToursFromImage | undefined) {
    if (!img) return undefined;
    if (typeof img === "string") {
      return {
        backgroundImage: `url('${img}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }
    return {
      backgroundImage: `url('${img.srcFallback}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  const bgStyle = renderBgImage(contact.backgroundImage);

  // email extractor - prefer email found inside contact.office (per request)
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailFromOffice = contact.office
    ? contact.office.match(emailRegex)?.[0]
    : undefined;

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const renderTextWithEmail = (text: string) => {
    const email = emailFromOffice;
    if (!email) return <>{text}</>;
    const parts = text.split(new RegExp(`(${escapeRegExp(email)})`, "g"));
    return parts.map((part, idx) =>
      part === email ? (
        <a
          key={idx}
          href={`mailto:${email}`}
          className="underline text-white"
          rel="noopener noreferrer"
        >
          {email}
        </a>
      ) : (
        <span key={idx} className="text-white">
          {part}
        </span>
      )
    );
  };

  const renderOfficeWithEmail = (office?: string) => {
    if (!office) return null;
    if (!emailFromOffice) return <span className="text-white">{office}</span>;
    const parts = office.split(
      new RegExp(`(${escapeRegExp(emailFromOffice)})`, "g")
    );
    return parts.map((part, idx) =>
      part === emailFromOffice ? (
        <a
          key={`email-${idx}`}
          href={`mailto:${emailFromOffice}`}
          className="underline text-white"
          rel="noopener noreferrer"
        >
          {emailFromOffice}
        </a>
      ) : (
        <span key={`part-${idx}`} className="text-white">
          {part}
        </span>
      )
    );
  };

  return (
    <section className="relative w-full py-16 mb-16 overflow-hidden">
      {/* background image (if provided) + stronger black overlays for better contrast */}
      <div className="absolute inset-0 z-0">
        {bgStyle ? (
          <div className="absolute inset-0" style={bgStyle} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700" />
        )}
        {/* stronger black filter */}
        <div className="absolute inset-0 bg-black/65" />
        {/* soft top gradient to add depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* center texts */}
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-1 items-start text-center">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-family-baloo)" }}
            >
              {heading}
            </h2>

            <p className="mt-4 text-lg md:text-xl text-white">
              {renderTextWithEmail(bodyText)}
            </p>

            <div className="mt-6 flex flex-col md:flex-row md:justify-center md:items-center gap-6 text-white">
              {contact.office && (
                <div className="flex items-center gap-3">
                  <div className="text-base md:text-lg">
                    {renderOfficeWithEmail(contact.office)}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <SSButton
                variant="primary"
                color="var(--color-orange)"
                to="/contact/"
              >
                Contact Us
              </SSButton>

              <Link
                href="/contact/?subject=Custom%20Tour"
                className="inline-block"
              >
                <SSButton variant="outline" color="white">
                  Book Custom Tour
                </SSButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
