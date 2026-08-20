import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";
import MagneticButton from "../components/motion/MagneticButton";
import AnswerBlock from "../components/content/AnswerBlock";
import KeyFacts from "../components/content/KeyFacts";
import FaqSection from "../components/content/FaqSection";
import SectionHeading from "../components/content/SectionHeading";
import { getSubscriberCount } from "../../lib/youtube";
import JsonLd from "../components/JsonLd";
import { canonicalUrl, pageMetadata } from "../seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  webPageSchema,
} from "../structuredData";
import { faqGroup } from "../content/faqs";
import {
  COURSES_URL,
  CREDENTIALS,
  DEFINITION,
  EMAIL,
  EXPERTISE,
  LOCATION,
  ROLES,
  STATS,
  STATS_AS_OF,
  SUMMARY,
  YOUTUBE_URL,
} from "../content/profile";

export const metadata = pageMetadata({
  title: "About Sarthak Shrivastava — AI Consultant & Docker Captain",
  description:
    "The path from software engineer to AI consultant: founding Bitfumes, becoming a Docker Captain, earning AWS certifications, and teaching 100K+ developers.",
  path: "/about-me",
});

// The page a crawler should treat as the profile of the person, which is what
// makes the roles, credentials and social links here attributable rather than
// loose text on a page. ProfilePage carries the Person; WebPage carries when
// the page last changed and what it is about; both are needed, and neither
// substitutes for the other.
function buildStructuredData(faqs) {
  return graph(
  {
    "@type": "ProfilePage",
    url: canonicalUrl("/about-me"),
    name: "About Sarthak Shrivastava",
    description: DEFINITION,
    mainEntity: personSchema(),
  },
  organizationSchema(),
  webPageSchema({
    path: "/about-me",
    name: "About Sarthak Shrivastava",
    description: DEFINITION,
    primaryImage: "/images/about-me.jpg",
  }),
  faqSchema(faqs),
  breadcrumbSchema([{ name: "About Me", path: "/about-me" }])
  );
}

function ListCard({ title, items }) {
  return (
    <div className="border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors bg-paper">
      <h3 className="font-display italic text-2xl mb-6">{title}</h3>
      <ul className="space-y-4 text-ink/70">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const AboutPage = async () => {
  const subscribers = await getSubscriberCount();
  const facts = STATS.map((stat) =>
    stat.live ? { ...stat, value: subscribers } : stat
  );
  const faqs = faqGroup("about", subscribers).faqs;
  const structuredData = buildStructuredData(faqs);

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              About <span className="italic text-accent">me.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              My journey, experiences, and what drives me in the world of
              technology and education.
            </p>
          </Reveal>
        </div>

        {/* Third person on purpose, and first on the page on purpose. This is
            the paragraph an assistant quotes when someone asks who Sarthak is,
            and a paragraph that opens "I'm a full-stack developer" has no
            subject once it has been lifted off the page. */}
        <Reveal>
          <AnswerBlock className="mb-16">
            <p>{DEFINITION}</p>
            <p>{SUMMARY}</p>
          </AnswerBlock>
        </Reveal>

        <Reveal>
          <KeyFacts facts={facts} asOf={STATS_AS_OF} className="mb-24" />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-24">
            <div className="md:col-span-5 rounded-3xl overflow-hidden md:-rotate-2">
              <Image
                src="/images/about-me.jpg"
                alt="Sarthak Shrivastava, AI consultant and Docker Captain"
                width={500}
                height={500}
                className="object-cover w-full h-auto"
              />
            </div>
            <div className="md:col-span-7 space-y-6">
              <h2 className="font-display italic text-4xl text-accent">
                Hello, I&apos;m Sarthak
              </h2>
              <p className="text-ink/70 text-lg leading-relaxed">
                Known as &ldquo;sarthaksavvy&rdquo; in the tech community, I&apos;m a
                full-stack developer, Docker Captain, and founder of Bitfumes. My
                journey in technology has been driven by a passion for learning
                and sharing knowledge.
              </p>
              <p className="text-ink/70 text-lg leading-relaxed">
                {LOCATION.statement} If you are looking for help putting a
                language model into a product,{" "}
                <Link
                  href="/ai-consulting"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                >
                  that is what I do as a consultant
                </Link>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mb-24">
          <Reveal>
            <SectionHeading>Professional journey</SectionHeading>
          </Reveal>
          <StaggerGroup className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <ListCard
                title="Current roles"
                items={ROLES.map((role) => `${role.title} — ${role.detail}`)}
              />
            </StaggerItem>
            <StaggerItem>
              <ListCard title="Core expertise" items={EXPERTISE} />
            </StaggerItem>
          </StaggerGroup>
        </div>

        <div className="mb-24">
          <Reveal>
            <SectionHeading>Recognition and certifications</SectionHeading>
          </Reveal>
          {/* A definition list rather than bullets: each award has a name and a
              detail, and saying which is which is the difference between a
              parser reading "Docker Captain" as a credential and reading the
              whole line as one long string. */}
          <Reveal>
            <dl className="grid md:grid-cols-3 gap-8">
              {CREDENTIALS.map((credential) => (
                <div
                  key={credential.name}
                  className="border border-line rounded-3xl p-8 bg-paper"
                >
                  <dt className="font-display italic text-2xl mb-3">
                    {credential.name}
                  </dt>
                  <dd className="text-ink/70 leading-relaxed">
                    {credential.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal>
          <div className="border border-line rounded-3xl p-10 sm:p-14 mb-24">
            <h2 className="font-display italic text-4xl mb-6">Current focus</h2>
            <p className="text-ink/70 mb-8 max-w-2xl leading-relaxed">
              I&apos;m currently working on AI: building products on top of large
              language models, consulting with teams putting LLM features into
              production, and making technology education accessible through
              Bitfumes, YouTube and Udemy.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href={`mailto:${EMAIL}`}
                className="bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex"
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex"
              >
                Watch My Content
              </MagneticButton>
              <MagneticButton
                href={COURSES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex"
              >
                Browse Courses
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <FaqSection faqs={faqs} id="about-faq" />
      </div>
    </div>
  );
};

export default AboutPage;
