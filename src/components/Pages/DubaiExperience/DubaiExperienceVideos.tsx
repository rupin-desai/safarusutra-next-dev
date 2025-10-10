import SectionTitle from "@/components/UI/SectionTitle";
import { Video } from "lucide-react";

export default function DubaiExperienceVideos() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <SectionTitle
          icon={<Video size={16} />}
          pillText="Park Highlights"
          title="Watch a Glimpse of the Park"
          color="#EC4899" // Pink shade
          centered
        />

        <div className="max-w-6xl mx-auto mt-10">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <video
              controls
              width="100%"
              className="rounded-xl w-full h-full min-h-[500px] object-cover bg-black"
              poster="/images/video-poster.jpg"
            >
              <source
                src="/videos/dubai-safari/dubai_video_safari_1.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
