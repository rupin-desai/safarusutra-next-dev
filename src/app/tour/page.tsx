import Link from "next/link";
import { getAllTours } from "@/lib/tours"; // see: src/lib/tours.ts

export const metadata = {
  title: "Tours — Safari Sutra",
  description: "Listing of fixed departures and tours",
};

export default async function TourIndexPage() {
  const tours = (await getAllTours?.()) ?? [];

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tours</h1>

      {tours.length === 0 ? (
        <p>No tours found.</p>
      ) : (
        <ul className="space-y-4">
          {tours.map((t: any) => (
            <li key={t.slug} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">
                <Link href={`/tour/${t.slug}`} className="text-blue-600 hover:underline">
                  {t.title}
                </Link>
              </h2>
              {t.excerpt && <p className="text-sm text-slate-700 mt-2">{t.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}