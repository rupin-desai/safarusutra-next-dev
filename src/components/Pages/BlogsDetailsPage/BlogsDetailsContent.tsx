"use client";

interface BlogsDetailsContentProps {
  content: string;
}

export default function BlogsDetailsContent({
  content,
}: BlogsDetailsContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-semibold prose-headings:text-gray-900
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
        prose-li:text-gray-700 prose-li:mb-2
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-a:text-[var(--color-orange)] prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
