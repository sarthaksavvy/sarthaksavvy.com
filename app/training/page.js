import { ArrowRight } from "lucide-react";
import SingleEvent from "../components/Training/SingleEvent";
import trainingEvents from "../trainings.json";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import AnswerBlock from "../components/content/AnswerBlock";
import FaqSection from "../components/content/FaqSection";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  trainingEventsSchema,
  webPageSchema,
} from "../structuredData";
import { faqGroup } from "../content/faqs";
import { EMAIL } from "../content/profile";
import { getSubscriberCount } from "../../lib/youtube";

const DESCRIPTION =
  "Training sessions, workshops and talks on AI agents, LLM function calling, " +
  "Laravel and Docker, delivered at companies, meetups and conferences " +
  "worldwide by AI consultant and Docker Captain Sarthak Shrivastava.";

export const metadata = pageMetadata({
  title: "Training by Sarthak Shrivastava — AI, Laravel & Docker",
  description: DESCRIPTION,
  path: "/training",
});

// The same trail feeds the BreadcrumbList markup and the visible
// breadcrumb nav below, so the two cannot drift apart.
const BREADCRUMB_TRAIL = [{ name: "Training", path: "/training" }];

function buildStructuredData(faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/training",
    name: "Training by Sarthak Shrivastava",
    description: DESCRIPTION,
  }),
  trainingEventsSchema(trainingEvents),
  faqSchema(faqs),
  breadcrumbSchema(BREADCRUMB_TRAIL)
  );
}

export default async function TrainingTimeline() {
  const subscribers = await getSubscriberCount();
  const faqs = faqGroup("training", subscribers).faqs;
  const structuredData = buildStructuredData(faqs);

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <Breadcrumbs trail={BREADCRUMB_TRAIL} />
        <div className="mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              <span className="italic text-accentText">Training.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Training teams and speaking at conferences worldwide — AI
              agents, LLM applications, and Laravel in production.
            </p>
          </Reveal>
        </div>

        {/* The timeline below is a reader-scannable list of past sessions. It
            is not an answer to "what does he train on" or "is he available"
            — those are the two things anyone actually asks a trainer's page,
            and neither was stated anywhere on it. */}
        <Reveal>
          <AnswerBlock className="mb-20">
            <p>
              Sarthak Shrivastava delivers training sessions, workshops and
              talks at companies, conferences and meetups on AI agents and
              the OpenAI Agents SDK, function calling and prompt engineering,
              content creation with AI, deploying Laravel with Docker, and
              learning technical skills alongside a full-time job. He has
              trained and spoken in London, Kozhikode, Indore and Mauritius,
              to audiences from 20 to over 100 people.
            </p>
            <p>
              He is available for training and events worldwide, in person or
              remotely — enquiries to{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accentText underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
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
            {[...trainingEvents].reverse().map((event, i) => (
              <SingleEvent key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-24">
          <FaqSection faqs={faqs} id="training-faq" />
        </div>

        <Reveal className="text-center">
          <h2 className="font-display italic text-3xl sm:text-4xl mb-4">
            Want training for your team or event?
          </h2>
          <p className="text-ink/70 mb-8">
            I&apos;m available for corporate training, conferences, meetups, and
            workshops worldwide.
          </p>
          <MagneticButton
            href={`mailto:${EMAIL}`}
            className="bg-ink text-paper px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-ink transition-colors inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={16} />
          </MagneticButton>
        </Reveal>
      </div>
    </div>
  );
}
