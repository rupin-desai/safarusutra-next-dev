import React from "react";

export default function ToursFromTips({ tips }: { tips: { title: string; text: string }[] }) {
  return (
    <section className="mx-auto max-w-5xl px-4 mt-8">
      <h2 className="text-2xl font-semibold">Local Tips for Travelers</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {tips.map(t => (
          <article key={t.title} className="p-4 border rounded">
            <h3 className="font-medium">{t.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{t.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}