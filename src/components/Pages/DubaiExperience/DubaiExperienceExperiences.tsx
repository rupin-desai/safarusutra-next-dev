import SectionTitle from "@/components/UI/SectionTitle";
import { PawPrint } from "lucide-react";

// Added attractions (except "Map & Navigation" and "Facilities of the Park") to the experiences array
const experiences = [
  {
    title: "African Village",
    description:
      "Encounter magnificent African wildlife including lions, cheetahs, and giraffes in a recreated savanna landscape.",
    image: "/images/dubai-safari/african-village-1080.webp",
    srcSet:
      "/images/dubai-safari/african-village-480.webp 480w, /images/dubai-safari/african-village-720.webp 720w, /images/dubai-safari/african-village-1080.webp 1080w",
  },
  {
    title: "Arabian Desert Safari",
    description:
      "Discover native Arabian species adapted to desert life, including the majestic Arabian oryx and desert foxes.",
    image: "/images/dubai-safari/arabian-desert-1080.webp",
    srcSet:
      "/images/dubai-safari/arabian-desert-480.webp 480w, /images/dubai-safari/arabian-desert-720.webp 720w, /images/dubai-safari/arabian-desert-1080.webp 1080w",
  },
  {
    title: "Asian Village",
    description:
      "Explore Asia's diverse wildlife from Bengal tigers to Asian elephants in authentically designed habitats.",
    image: "/images/dubai-safari/asian-village-1080.webp",
    srcSet:
      "/images/dubai-safari/asian-village-480.webp 480w, /images/dubai-safari/asian-village-720.webp 720w, /images/dubai-safari/asian-village-1080.webp 1080w",
  },
  {
    title: "Bird Kingdom",
    description:
      "Walk through aviaries featuring colorful exotic birds from around the world in a lush tropical setting.",
    image: "/images/dubai-safari/bird-kingdom-1080.webp",
    srcSet:
      "/images/dubai-safari/bird-kingdom-480.webp 480w, /images/dubai-safari/bird-kingdom-720.webp 720w, /images/dubai-safari/bird-kingdom-1080.webp 1080w",
  },
  {
    title: "Explorer Village",
    description:
      "Interactive educational zone perfect for families and children to learn about wildlife conservation.",
    image: "/images/dubai-safari/explorer-village-1080.webp",
    srcSet:
      "/images/dubai-safari/explorer-village-480.webp 480w, /images/dubai-safari/explorer-village-720.webp 720w, /images/dubai-safari/explorer-village-1080.webp 1080w",
  },
  {
    title: "Animal Feeding",
    description:
      "Participate in scheduled feeding sessions and get closer to your favorite animals under expert guidance.",
    image: "/images/dubai-safari/animal-feeding-1080.webp",
    srcSet:
      "/images/dubai-safari/animal-feeding-480.webp 480w, /images/dubai-safari/animal-feeding-720.webp 720w, /images/dubai-safari/animal-feeding-1080.webp 1080w",
  },
  // Attractions added below
  {
    title: "Birds of Prey",
    description:
      "Marvel at the agility and power of raptors in dynamic flight demonstrations and educational shows.",
    image: "/images/dubai-safari/birds-of-prey-1080.webp",
    srcSet:
      "/images/dubai-safari/birds-of-prey-480.webp 480w, /images/dubai-safari/birds-of-prey-720.webp 720w, /images/dubai-safari/birds-of-prey-1080.webp 1080w",
  },
  {
    title: "Echoes of the Wild",
    description:
      "Enjoy immersive audio-visual shows that celebrate the diversity and beauty of wildlife from around the globe.",
    image: "/images/dubai-safari/echoes-of-the-wild-1080.webp",
    srcSet:
      "/images/dubai-safari/echoes-of-the-wild-480.webp 480w, /images/dubai-safari/echoes-of-the-wild-720.webp 720w, /images/dubai-safari/echoes-of-the-wild-1080.webp 1080w",
  },
  {
    title: "Glass Building",
    description:
      "Discover unique flora and fauna in a climate-controlled environment designed for education and exploration.",
    image: "/images/dubai-safari/glass-building-1080.webp",
    srcSet:
      "/images/dubai-safari/glass-building-480.webp 480w, /images/dubai-safari/glass-building-720.webp 720w, /images/dubai-safari/glass-building-1080.webp 1080w",
  },
  {
    title: "Kids Farm",
    description:
      "A fun and interactive area where children can meet and learn about farm animals in a safe setting.",
    image: "/images/dubai-safari/kids-farm-1080.webp",
    srcSet:
      "/images/dubai-safari/kids-farm-480.webp 480w, /images/dubai-safari/kids-farm-720.webp 720w, /images/dubai-safari/kids-farm-1080.webp 1080w",
  },
  {
    title: "POD Experience",
    description:
      "Relax and observe wildlife from comfortable, eco-friendly pods located throughout the park.",
    image: "/images/dubai-safari/pod-experience-1080.webp",
    srcSet:
      "/images/dubai-safari/pod-experience-480.webp 480w, /images/dubai-safari/pod-experience-720.webp 720w, /images/dubai-safari/pod-experience-1080.webp 1080w",
  },
  {
    title: "Solar Panel Initiative",
    description:
      "Learn about Dubai Safari Park’s commitment to sustainability through its innovative solar energy installations.",
    image: "/images/dubai-safari/solar-panel-1080.webp",
    srcSet:
      "/images/dubai-safari/solar-panel-480.webp 480w, /images/dubai-safari/solar-panel-720.webp 720w, /images/dubai-safari/solar-panel-1080.webp 1080w",
  },
  {
    title: "Walking Trails",
    description:
      "Stroll along scenic walking trails that connect the park’s diverse habitats and attractions.",
    image: "/images/dubai-safari/walking-trails-1080.webp",
    srcSet:
      "/images/dubai-safari/walking-trails-480.webp 480w, /images/dubai-safari/walking-trails-720.webp 720w, /images/dubai-safari/walking-trails-1080.webp 1080w",
  },
];

export default function DubaiExperienceExperiences() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <SectionTitle
          icon={<PawPrint size={16} />}
          pillText="Discover"
          title="Safari Experiences"
          color="#f3ad3c"
          centered
        />

        <p className="text-center text-gray-700 max-w-3xl mx-auto mt-4 mb-12">
          Explore the diverse zones and attractions at Dubai Safari Park, each
          offering unique wildlife encounters and educational experiences. Our
          partnership ensures you get the most comprehensive visit possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-56 overflow-hidden">
                <picture>
                  <source srcSet={experience.srcSet} type="image/webp" />
                  <img
                    src={experience.image}
                    alt={`${experience.title} at Dubai Safari Park`}
                    title={`Experience ${experience.title} at Dubai Safari Park`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </picture>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-dark-brown)] mb-3">
                  {experience.title}
                </h3>
                <p className="text-gray-700">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
