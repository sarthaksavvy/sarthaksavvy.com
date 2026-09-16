import { ArrowRight } from "lucide-react";
import SingleEvent from "../components/Training/SingleEvent";
import EventsScroller from "../components/Training/EventsScroller";
import trainingEvents from "../trainings.json";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import SectionHeading from "../components/content/SectionHeading";
import BigCount from "../components/content/BigCount";
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
  title: "Corporate Training & Workshops by Sarthak Shrivastava — AI, Laravel & Docker",
  description: DESCRIPTION,
  path: "/training",
});

// Newest first, once, for every list on the page. The Highlights strip was
// handed the raw oldest-first JSON while the timeline under it reversed its
// own copy, so the page opened on 2018 directly above a timeline opening on
// 2026. A module constant also gives the strip a stable array identity.
const EVENTS_NEWEST_FIRST = [...trainingEvents].reverse();

// The same trail feeds the BreadcrumbList markup and the visible
// breadcrumb nav below, so the two cannot drift apart.
const BREADCRUMB_TRAIL = [{ name: "Corporate Training & Workshops", path: "/training" }];

function buildStructuredData(faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/training",
    name: "Corporate Training & Workshops by Sarthak Shrivastava",
    description: DESCRIPTION,
    speakable: ["h1"],
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
        <div className="mb-6 md:mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Corporate <span className="italic text-accentText">Training</span> & Workshops.
            </h1>
            <BigCount value={trainingEvents.length} label="Training events" className="md:hidden" />
          </Reveal>
          <Reveal delay={0.1} className="hidden md:flex md:col-span-4 flex-col items-end justify-end gap-6">
            <BigCount value={trainingEvents.length} label="Training events" className="justify-end" />
            <p className="text-lg text-ink/70">
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
          </Reveal>
        </div>

        <div className="mb-16">
          <Reveal>
            <SectionHeading>Highlights</SectionHeading>
          </Reveal>
          <Reveal>
            <p className="text-sm text-muted font-mono uppercase tracking-widest mb-6">
              Tap a photo to see the gallery
            </p>
          </Reveal>
          <Reveal>
            <EventsScroller events={EVENTS_NEWEST_FIRST} />
          </Reveal>
          {/* Same copy as the desktop intro column, shown here instead on
              mobile so the scroller isn't pushed below the fold by it. */}
          <p className="md:hidden text-lg text-ink/70 mt-8">
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
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-transparent" />

          <div className="space-y-16">
            {EVENTS_NEWEST_FIRST.map((event, i) => (
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
