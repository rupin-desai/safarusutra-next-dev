import Link from "next/link";
import SSButton from "@/components/UI/SSButton";

export default function DubaiExperiencePartnerBanner() {
  return (
    <section className="py-16 mb-16 px-4 relative">
      {/* Responsive background image with srcSet */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <picture>
          <source
            srcSet="
              /images/dubai-safari/dubai-safari-banner-480.webp 480w,
              /images/dubai-safari/dubai-safari-banner-720.webp 720w,
              /images/dubai-safari/dubai-safari-banner-1080.webp 1080w
            "
            type="image/webp"
          />
          <img
            src="/images/dubai-safari/dubai-safari-banner-1080.webp"
            alt="Dubai Safari Banner"
            className="w-full h-full object-cover object-center absolute inset-0"
            loading="lazy"
            draggable={false}
          />
        </picture>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Official Partners with Dubai Safari
        </h2>
        <p className="text-xl text-white max-w-2xl mx-auto mb-8">
          Safari Sutra is proud to be an official partner with Dubai Safari
          Park, offering our clients exclusive experiences and privileged
          access.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact">
            <SSButton variant="primary" color="var(--color-orange)">
              Book Dubai Safari Experience
            </SSButton>
          </Link>
          <Link
            href="https://dubaisafari.ae/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SSButton variant="outline" color="white">
              Visit Partner Website
            </SSButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
