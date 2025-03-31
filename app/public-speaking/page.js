import { ArrowRight } from "lucide-react";
import SingleEvent from "../components/PublicSpeaking/SingleEvent";
import speakingEvents from "../events.json";

export const metadata = {
  title: "Sarthak Shrivastava - Public Speaking",
  description: "Public Speaking by Sarthak Shrivastava",
  alternates: {
    canonical: "https://sarthaksavvy.com/public-speaking",
  },
  openGraph: {
    title: "Sarthak Shrivastava - Public Speaking",
    description: "Public Speaking by Sarthak Shrivastava",
    url: "https://sarthaksavvy.com/public-speaking",
    siteName: "Sarthak Shrivastava - Public Speaking",
    images: "/sarthak.jpg",
  },
};

export default function SpeakingTimeline() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-6">PUBLIC SPEAKING</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Sharing knowledge and experiences at tech conferences worldwide.
            Focused on frontend development, accessibility, and modern web
            technologies.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#D1F366] to-transparent" />

          <div className="space-y-16">
            {[...speakingEvents].reverse().map((event) => (
              <SingleEvent key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Want me to speak at your event?
          </h3>
          <p className="text-gray-300 mb-6">
            I'm available for conferences, meetups, and workshops worldwide.
          </p>
          <a
            href="mailto:sarthak@bitfumes.com"
            className="bg-[#D1F366] text-black px-8 py-3 rounded-full font-medium hover:bg-[#bde052] transition-colors inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
