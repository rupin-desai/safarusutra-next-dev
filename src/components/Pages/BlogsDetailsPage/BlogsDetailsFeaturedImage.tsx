"use client";

import Image from "next/image";

interface BlogsDetailsFeaturedImageProps {
  src: string;
  alt: string;
}

export default function BlogsDetailsFeaturedImage({
  src,
  alt,
}: BlogsDetailsFeaturedImageProps) {
  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    </div>
  );
}
