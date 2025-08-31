import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTours, getTourBySlug } from "@/lib/tours";

export async function generateStaticParams() {
  const tours = (await getAllTours()) ?? [];
  // use a narrow inline type instead of `any`
  return tours.map((t: { slug: string }) => ({ slug: t.slug }));
}

export default async function TourPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return notFound();
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
      {tour.subtitle && <p className="text-slate-600 mb-4">{tour.subtitle}</p>}
      <div className="prose" dangerouslySetInnerHTML={{ __html: tour.html ?? tour.content ?? "" }} />
      <nav className="mt-8 flex gap-4">
        <Link href="/tour" className="text-blue-600 hover:underline">Back to tours</Link>
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      </nav>
    </article>
  );
}