import React from "react";
import Link from "next/link";

export default function ToursFromContact({ contact }: { contact: { office?: string; email?: string; cta?: string } }) {
  return (
    <section className="mx-auto max-w-4xl px-4 mt-8 p-6 bg-green-50 rounded">
      <h2 className="text-2xl font-semibold">Plan Your Trip</h2>
      {contact.cta && <p className="mt-2 text-gray-700">{contact.cta}</p>}
      <p className="mt-3 text-sm text-gray-600">Office: {contact.office} • Email: <a href={`mailto:${contact.email}`} className="text-green-700 underline">{contact.email}</a></p>
      <div className="mt-4">
        <Link href="/contact/" className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:opacity-95">Contact Us</Link>
      </div>
    </section>
  );
}