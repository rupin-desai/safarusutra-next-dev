import React from "react";

export default function ToursFromWhyChoose({ items }: { items: string[] }) {
  return (
    <section className="mx-auto max-w-4xl px-4 mt-8">
      <h2 className="text-2xl font-semibold">Why Choose Safari Sutra?</h2>
      <ul className="list-disc ml-6 mt-3">
        {items.map((it, i) => (<li key={i}>{it}</li>))}
      </ul>
    </section>
  );
}