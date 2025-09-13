import React from "react";

export default function ToursFromTestimonials({ items }: { items: { text: string; author: string }[] }) {
  return (
    <section className="mx-auto max-w-4xl px-4 mt-8">
      <h2 className="text-2xl font-semibold">What People Are Saying</h2>
      <div className="mt-3 space-y-3">
        {items.map((t, i) => (
          <blockquote key={i} className="p-4 border-l-4 border-green-600 bg-gray-50 rounded">
            <p className="text-gray-700">“{t.text}”</p>
            <cite className="block mt-2 text-sm text-gray-600">— {t.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}