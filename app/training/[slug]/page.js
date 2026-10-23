import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Quote, Users } from "lucide-react";
import Reveal from "../../components/motion/Reveal";
import MagneticButton from "../../components/motion/MagneticButton";
import SectionHeading from "../../components/content/SectionHeading";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import PhotoStack from "../../components/Training/PhotoStack";
import EventLinks from "../../components/Training/EventLinks";
import ShareBar from "../../components/Training/ShareBar";
import trainingEvents from "../../trainings.json";
import { canonicalUrl, pageMetadata } from "../../seo";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  personSchema,
  trainingEventSchema,
  webPageSchema,
} from "../../structuredData";
import { eventBySlug, eventPath, neighbours } from "../../content/trainingEvents";
import { EMAIL } from "../../content/profile";

// An unknown slug is a 404 rather than a render-on-demand page: the set of
// events is the contents of trainings.json and nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return trainingEvents.map((event) => ({ slug: event.slug }));
}

function ogImageFor(event) {
  return {
    url: `${eventPath(event)}/og`,
    width: 1200,
    height: 630,
    alt: `${event.title.trim()} — ${event.conference}, ${event.date}`,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return {};

  return pageMetadata({
    title: `${event.title.trim()} | Sarthak Shrivastava`,
    description: event.description,
    path: eventPath(event),
    image: ogImageFor(event),
  });
}

function NeighbourLink({ event, direction }) {
  const older = direction === "older";
  return (
    <Link
      href={eventPath(event)}
      className={`group flex-1 border border-line rounded-2xl p-5 hover:border-ink/40 transition-colors ${
        older ? "" : "sm:text-right"
      }`}
    >
      <span
        className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted mb-2 ${
          older ? "" : "sm:justify-end"
        }`}
      >
        {older && <ArrowLeft size={14} aria-hidden="true" />}
        {older ? "Earlier talk" : "Later talk"}
        {!older && <ArrowRight size={14} aria-hidden="true" />}
      </span>
      <span className="block font-display italic text-xl group-hover:text-accentText transition-colors">
        {event.title.trim()}
      </span>
      <span className="block text-sm text-ink/70 mt-1">
        {event.conference} · {event.date}
      </span>
    </Link>
  );
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();

  const title = event.title.trim();
  const path = eventPath(event);
  const { newer, older } = neighbours(event);
  const trail = [
    { name: "Corporate Training & Workshops", path: "/training" },
    { name: title, path },
  ];

  const structuredData = graph(
    personSchema(),
    organizationSchema(),
    webPageSchema({
      path,
      name: `${title} — ${event.conference}`,
      description: event.description,
      primaryImage: ogImageFor(event).url,
      speakable: ["h1"],
    }),
    trainingEventSchema(event),
    breadcrumbSchema(trail)
  );

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1100px] mx-auto">
        <Breadcrumbs trail={trail} />

        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accentText mb-4">
            {event.year} · Talk
          </p>
          <h1 className="font-display italic text-4xl sm:text-6xl md:text-7xl leading-[1] mb-4">{title}</h1>
          <p className="text-xl text-accentText font-medium mb-6">{event.conference}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted mb-8 font-mono">
            <span className="flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} aria-hidden="true" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} aria-hidden="true" />
              {event.audience}
            </span>
          </div>
          <ShareBar url={canonicalUrl(path)} title={`${title} by Sarthak Shrivastava`} />
        </Reveal>

        <Reveal className="mt-12">
          <PhotoStack event={event} />
        </Reveal>

        <Reveal className="mt-12 max-w-3xl">
          <SectionHeading>About the session</SectionHeading>
          <p className="text-lg text-ink/80">{event.description}</p>

          {event.testimonial && (
            <blockquote className="mt-8 flex gap-3 border-l-2 border-accent pl-4">
              <Quote size={18} className="shrink-0 text-accentText mt-1" aria-hidden="true" />
              <div>
                <p className="italic text-ink/80">{event.testimonial.quote}</p>
                <footer className="mt-2 text-sm text-muted font-mono not-italic">
                  — {event.testimonial.author}
                  {event.testimonial.role ? `, ${event.testimonial.role}` : ""}
                </footer>
              </div>
            </blockquote>
          )}

          <EventLinks event={event} />
        </Reveal>

        {(newer || older) && (
          <nav aria-label="Other talks" className="mt-16 flex flex-col sm:flex-row gap-4">
            {older ? <NeighbourLink event={older} direction="older" /> : <span className="flex-1" />}
            {newer ? <NeighbourLink event={newer} direction="newer" /> : <span className="flex-1" />}
          </nav>
        )}

        <Reveal className="mt-20 text-center">
          <h2 className="font-display italic text-3xl sm:text-4xl mb-4">Want a session like this for your team or event?</h2>
          <p className="text-ink/70 mb-8">
            Talks, workshops and corporate training on AI agents, Laravel and Docker — in person or remote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Training enquiry (saw: ${title})`)}`}
              className="bg-ink text-paper px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-ink transition-colors inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight size={16} aria-hidden="true" />
            </MagneticButton>
            <Link
              href="/training"
              className="border border-line px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink/40 transition-colors inline-flex items-center gap-2"
            >
              All training
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
