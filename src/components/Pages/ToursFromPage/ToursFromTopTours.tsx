import React from "react";
import Link from "next/link";

export default function ToursFromTopTours({ tours }: { tours: { id: string; slug: string; title: string; duration?: string; price?: string; excerpt?: string }[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 mt-8">
      <h2 className="text-2xl font-semibold">Top Tours</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map(t => (
          <article key={t.id} className="border rounded p-4">
            <h3 className="font-semibold mb-1">
              <Link href={`/tour/${t.slug}/`} className="text-green-700 hover:underline">{t.title}</Link>
            </h3>
            {t.excerpt && <p className="text-sm text-gray-600 mb-2">{t.excerpt}</p>}
            <div className="text-sm">Duration: {t.duration} • Price from {t.price}</div>
          </article>
        ))}
      </div>
    </section>
  );
}