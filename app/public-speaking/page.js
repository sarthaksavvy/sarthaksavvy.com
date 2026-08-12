import { ArrowRight } from "lucide-react";
import SingleEvent from "../components/PublicSpeaking/SingleEvent";
import speakingEvents from "../events.json";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Sarthak Shrivastava - Public Speaking",
  description: "Public Speaking by Sarthak Shrivastava",
  path: "/public-speaking",
});

export default function SpeakingTimeline() {
  return (
    <div className="py-10 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Public <span className="italic text-accent">Speaking.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Sharing knowledge at tech conferences worldwide — frontend
              development, accessibility, and modern web technologies.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-transparent" />

          <div className="space-y-16">
            {[...speakingEvents].reverse().map((event, i) => (
              <SingleEvent key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>

        <Reveal className="mt-24 text-center">
          <h3 className="font-display italic text-3xl sm:text-4xl mb-4">
            Want me to speak at your event?
          </h3>
          <p className="text-ink/70 mb-8">
            I&apos;m available for conferences, meetups, and workshops worldwide.
          </p>
          <MagneticButton
            href="mailto:sarthak@bitfumes.com"
            className="bg-ink text-paper px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={16} />
          </MagneticButton>
        </Reveal>
      </div>
    </div>
  );
}
