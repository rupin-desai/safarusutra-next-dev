import Link from "next/link";

export const metadata = {
  title: "404 — Page not found",
  description: "The page you requested could not be found.",
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-6">Sorry — the page you requested was not found.</p>
      <div className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
        <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
      </div>
    </main>
  );
}