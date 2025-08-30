import Link from "next/link";

export const metadata = {
  title: "B2B — Safari Sutra",
  description: "B2B page to verify routing",
};

export default function B2BPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">B2B</h1>
      <p className="mb-6">Basic B2B page — used to verify routing under src/app.</p>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link href="/about" className="text-blue-600 hover:underline">
          About
        </Link>
      </nav>
    </main>
  );
}
