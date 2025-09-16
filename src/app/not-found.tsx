import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {Home } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Safari Sutra",
  description:
    "Oops — the page you tried to reach wandered off. Return home or browse our curated tours and get inspired.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "404 — Page Not Found | Safari Sutra",
    description:
      "Oops — the page you tried to reach wandered off. Return home or browse our curated tours and get inspired.",
    images: [{ url: "/logos/logo.svg", alt: "Safari Sutra" }],
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="mx-auto mb-6 w-28 h-28 rounded-full bg-white/80 flex items-center justify-center shadow-md">
          <Image
            src="/logos/logo.svg"
            alt="Safari Sutra"
            width={88}
            height={88}
            unoptimized
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          404 Not found<br/> Well this is awkward — page gone on safari
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Looks like the page packed its bags and left the map behind. Don’t worry
          — our tours haven’t gone anywhere.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow"
            aria-label="Go to homepage"
          >
            <Home size={16} />
            Take me home
          </Link>

          <Link
            href="/tour"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:shadow"
            aria-label="Browse tours"
          >
            Browse Tours
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/90 text-slate-700 border border-slate-100 hover:shadow"
            aria-label="Contact us"
          >
            Tell the team (Contact)
          </Link>
        </div>

        <div className="mt-10 text-sm text-slate-500">
          Pro tip: check the URL for typos — sometimes an extra dash goes on
          vacation.
        </div>
      </div>
    </main>
  );
}