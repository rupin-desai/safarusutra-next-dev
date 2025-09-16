export default function ToursFromIntro({
  intro,
  subtitle,
  imageSrc,
}: {
  intro?: string;
  subtitle?: string;
  imageSrc?: string;
}) {
  if (!intro && !subtitle && !imageSrc) return null;

  const MARKER = "Explore. Escape. Experience.";
  let head = subtitle ?? "";
  let tail = "";

  if (subtitle) {
    const idx = subtitle.indexOf(MARKER);
    if (idx >= 0) {
      head = subtitle.slice(0, idx + MARKER.length).trim();
      tail = subtitle.slice(idx + MARKER.length).trim();
    }
  }

  function renderMarkerDots() {
    const words = ["Explore", "Escape", "Experience"];
    return (
      <span className="inline">
        {words.map((w, i) => (
          <span key={w} className="inline">
            <span className="text-[var(--color-dark-brown)] font-extrabold">{w}</span>
            <span className="text-[var(--color-yellow-orange)] font-extrabold">.</span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    );
  }

  return (
    <section className="relative py-8" aria-labelledby="toursfrom-intro">
      <div className=" mx-auto px-4 md:px-14">
        <div className="mx-auto">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            {/* left: text (left-aligned) */}
            <div className="text-left">
              {head && (
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-dark-brown)] leading-tight">
                  {head.includes(MARKER) ? (
                    <>
                      {head.replace(MARKER, "").trim() ? (
                        <span>{head.replace(MARKER, "").trim() + " "}</span>
                      ) : null}
                      {renderMarkerDots()}
                    </>
                  ) : (
                    head
                  )}
                </h2>
              )}

              {tail && (
                <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed">
                  {tail}
                </p>
              )}

              {intro && (
                <div className="mt-6 prose max-w-none text-gray-700">
                  <p>{intro}</p>
                </div>
              )}
            </div>

            {/* right: image (hidden on small screens) */}
            <div className="hidden md:block">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt="Departure"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-sm"
                />
              ) : (
                <div className="w-full h-64 md:h-80 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-100" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}