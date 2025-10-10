import HeroSection from "@/components/UI/HeroSection";

export default function DubaiExperienceHero() {
  return (
    <HeroSection
      title="Dubai Safari Park Experience"
      backgroundImage="/images/ /dubai-safari-hero-1080.webp"
      srcSetWebp="/images/dubai-safari/dubai-safari-hero-480.webp 480w, /images/dubai-safari/dubai-safari-hero-720.webp 720w, /images/dubai-safari/dubai-safari-hero-1080.webp 1080w"
      alt="Dubai Safari Park panoramic view with animals and visitors"
      imageTitle="Dubai Safari Park - Safari Sutra exclusive partner experience"
      overlay={0.4}
      titleSize="text-4xl md:text-6xl"
    />
  );
}
