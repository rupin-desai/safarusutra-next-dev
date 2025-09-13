import React from "react";

export default function ToursFromHero({ title, subtitle, intro }: { title: string; subtitle?: string; intro?: string; }) {
  return (
    <header className="prose lg:prose-lg mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && <p className="text-xl text-gray-700 mt-2">{subtitle}</p>}
      {intro && <p className="mt-4 text-gray-600">{intro}</p>}
    </header>
  );
}