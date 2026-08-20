import { ArrowRight } from "lucide-react";
import SingleEvent from "../components/PublicSpeaking/SingleEvent";
import speakingEvents from "../events.json";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import AnswerBlock from "../components/content/AnswerBlock";
import FaqSection from "../components/content/FaqSection";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  speakingEventsSchema,
  webPageSchema,
} from "../structuredData";
import { faqGroup } from "../content/faqs";
import { EMAIL } from "../content/profile";
import { getSubscriberCount } from "../../lib/youtube";

const DESCRIPTION =
  "Talks on AI agents, LLM function calling, Laravel and Docker at " +
  "conferences worldwide, from AI consultant and Docker Captain Sarthak " +
  "Shrivastava.";

export const metadata = pageMetadata({
  title: "Conference Talks by Sarthak Shrivastava — AI & Laravel",
  description: DESCRIPTION,
  path: "/public-speaking",
});

function buildStructuredData(faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/public-speaking",
    name: "Conference talks by Sarthak Shrivastava",
    description: DESCRIPTION,
  }),
  speakingEventsSchema(speakingEvents),
  faqSchema(faqs),
  breadcrumbSchema([{ name: "Public Speaking", path: "/public-speaking" }])
  );
}

export default async function SpeakingTimeline() {
  const subscribers = await getSubscriberCount();
  const faqs = faqGroup("speaking", subscribers).faqs;
  const structuredData = buildStructuredData(faqs);

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Public <span className="italic text-accent">Speaking.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Sharing knowledge at tech conferences worldwide — AI agents,
              LLM applications, and Laravel in production.
            </p>
          </Reveal>
        </div>

        {/* The timeline below is six events a reader can scan. It is not an
            answer to "what does he speak about" or "is he available" — those
            are the two things anyone actually asks a speaker page, and neither
            was stated anywhere on it. */}
        <Reveal>
          <AnswerBlock className="mb-20">
            <p>
              Sarthak Shrivastava speaks at conferences, meetups and workshops
              on AI agents and the OpenAI Agents SDK, function calling and
              prompt engineering, content creation with AI, deploying Laravel
              with Docker, and learning technical skills alongside a full-time
              job. He has spoken in London, Kozhikode, Indore and Mauritius, to
              audiences from 20 to over 100 people.
            </p>
            <p>
              He is available for events worldwide, in person or remotely —
              enquiries to{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                {EMAIL}
              </a>
              .
            </p>
          </AnswerBlock>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-transparent" />

          <div className="space-y-16">
            {[...speakingEvents].reverse().map((event, i) => (
              <SingleEvent key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-24">
          <FaqSection faqs={faqs} id="speaking-faq" />
        </div>

        <Reveal className="text-center">
          <h2 className="font-display italic text-3xl sm:text-4xl mb-4">
            Want me to speak at your event?
          </h2>
          <p className="text-ink/70 mb-8">
            I&apos;m available for conferences, meetups, and workshops worldwide.
          </p>
          <MagneticButton
            href="mailto:hello@sarthaksavvy.com"
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
