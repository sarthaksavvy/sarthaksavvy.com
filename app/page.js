import Link from "next/link";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import AnswerBlock from "./components/content/AnswerBlock";
import KeyFacts from "./components/content/KeyFacts";
import FaqSection from "./components/content/FaqSection";
import SectionHeading from "./components/content/SectionHeading";
import Reveal from "./components/motion/Reveal";
import { getSubscriberCount } from "../lib/youtube";
import JsonLd from "./components/JsonLd";
import { pageMetadata } from "./seo";
import {
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "./structuredData";
import { faqGroup } from "./content/faqs";
import {
  CREDENTIALS,
  DEFINITION,
  LOCATION,
  STATS,
  STATS_AS_OF,
} from "./content/profile";

export const metadata = pageMetadata({
  title: "Sarthak Shrivastava — AI Consultant & Founder of Bitfumes",
  description:
    "AI consultant helping teams ship LLM features and AI automation. Founder of Bitfumes, Docker Captain, AWS certified, and teacher of 100K+ students.",
  path: "/",
});

// The home page used to be a hero and a marquee: about sixty words, most of
// them a greeting. That is fine for a visitor who already knows who they are
// looking at and useless to anything that arrived from a query. An assistant
// asked "who is Sarthak Shrivastava" landed on the most authoritative page
// about him and found "Hi, I am Sarthak." — so it answered from LinkedIn
// scrapes and stale directory listings instead.
//
// What follows is the same information the rest of the site already carries,
// stated once at the front in the form an answer engine can actually use: a
// definition, dated numbers, and the questions people ask before anything else.
const HOME_FAQ_COUNT = 5;

const directions = [
  {
    href: "/ai-consulting",
    label: "AI consulting",
    description:
      "How Sarthak works with teams on LLM features, AI automation and getting both into production.",
  },
  {
    href: "/side-projects",
    label: "Products he has shipped",
    description:
      "AudioBolo, Backstage Cut, Ginger, Expensorr and Mezohub — built end to end, all live.",
  },
  {
    href: "/public-speaking",
    label: "Conference talks",
    description:
      "Talks on AI agents, LLM function calling, Laravel and Docker, in India, the UK and Mauritius.",
  },
  {
    href: "/podcasts",
    label: "Laravel India Podcast",
    description:
      "Conversations with the Laravel community, including Taylor Otwell, James Brooks and Freek Van der Herten.",
  },
  {
    href: "/about-me",
    label: "Background and credentials",
    description:
      "Docker Captain, two AWS certifications, ten years of shipping software and a decade of teaching it.",
  },
  {
    href: "/faq",
    label: "Frequently asked questions",
    description:
      "Direct answers to the questions people ask most often about Sarthak, his work and how to hire him.",
  },
];

export default async function Home() {
  const subscribers = await getSubscriberCount();
  const homeFaqs = faqGroup("about", subscribers).faqs.slice(0, HOME_FAQ_COUNT);

  // The live count replaces the stored fallback wherever it appears, so the
  // page, the schema and the markdown mirror all quote the same number.
  const facts = STATS.map((stat) =>
    stat.live ? { ...stat, value: subscribers } : stat
  );

  const structuredData = graph(
    personSchema(),
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      path: "/",
      name: "Sarthak Shrivastava — AI Consultant & Founder of Bitfumes",
      description: DEFINITION,
      primaryImage: "/images/sarthak.jpg",
      breadcrumb: false,
    }),
    faqSchema(homeFaqs)
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero subscribers={subscribers} />
      <Marquee />

      <div className="px-6 sm:px-10 py-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeading>Who is Sarthak Shrivastava?</SectionHeading>
          </Reveal>

          <Reveal>
            <AnswerBlock className="mb-10">
              <p>{DEFINITION}</p>
              <p>
                He founded{" "}
                <a
                  href="https://bitfumes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                >
                  Bitfumes
                </a>
                , works as a software engineer at Pfizer, and was named a Docker
                Captain in December 2023. He has taught more than 100,000
                students on Udemy, hosts the{" "}
                <Link
                  href="/podcasts"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                >
                  Laravel India Podcast
                </Link>
                , and{" "}
                <Link
                  href="/public-speaking"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                >
                  speaks at conferences
                </Link>{" "}
                on AI agents, LLM function calling, Laravel and Docker.{" "}
                {LOCATION.statement}
              </p>
            </AnswerBlock>
          </Reveal>

          <Reveal>
            <KeyFacts facts={facts} asOf={STATS_AS_OF} className="mb-24" />
          </Reveal>

          <Reveal>
            <SectionHeading>Recognition and certifications</SectionHeading>
          </Reveal>
          <Reveal>
            <ul className="grid md:grid-cols-3 gap-8 mb-24">
              {CREDENTIALS.map((credential) => (
                <li
                  key={credential.name}
                  className="border border-line rounded-3xl p-8 bg-paper"
                >
                  <h3 className="font-display italic text-2xl mb-3">
                    {credential.name}
                  </h3>
                  <p className="text-ink/70 leading-relaxed">
                    {credential.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <SectionHeading>Where to go next</SectionHeading>
          </Reveal>
          {/* Descriptive link text, not "read more". An internal link is the
              main way a crawler learns what the page at the other end is about
              before it gets there, and six links all reading "learn more"
              teach it nothing. */}
          <Reveal>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {directions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group block h-full border border-line rounded-3xl p-8 bg-paper hover:border-ink/40 transition-colors"
                  >
                    <h3 className="font-display italic text-2xl mb-3 group-hover:text-accent transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-ink/70 leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <FaqSection faqs={homeFaqs} id="home-faq" />

          <Reveal>
            <p className="text-ink/70">
              More answers are on the{" "}
              <Link
                href="/faq"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                frequently asked questions page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}
