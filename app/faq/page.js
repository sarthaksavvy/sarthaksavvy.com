import Link from "next/link";
import Reveal from "../components/motion/Reveal";
import AnswerBlock from "../components/content/AnswerBlock";
import FaqSection from "../components/content/FaqSection";
import MagneticButton from "../components/motion/MagneticButton";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  webPageSchema,
} from "../structuredData";
import { allFaqs, buildFaqGroups } from "../content/faqs";
import { getSubscriberCount } from "../../lib/youtube";
import { BOOKING_URL, DEFINITION, EMAIL } from "../content/profile";

const DESCRIPTION =
  "Direct answers about Sarthak Shrivastava — his background as an AI " +
  "consultant and Docker Captain, how consulting engagements work, the talks " +
  "he gives, the Laravel India Podcast, and the products he has built.";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/faq",
});

// One page whose entire job is to answer questions in the exact form they get
// asked.
//
// The rest of the site is organised the way a portfolio is organised — by what
// the thing is. People and the assistants answering for them do not ask that
// way; they ask "is he available for events", "does he work with teams outside
// India", "what is Bitfumes". Each of those has an answer somewhere on the
// site, buried three paragraphs into a page about something else, phrased as
// part of a larger argument. Here each one is a heading that matches the
// question and a self-contained paragraph underneath it, which is the shape a
// model can lift whole and attribute.
//
// The same set feeds the FAQPage markup and the /faq.md mirror, so all three
// copies are one copy.
function buildStructuredData(faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/faq",
    name: "Frequently asked questions about Sarthak Shrivastava",
    description: DESCRIPTION,
  }),
  faqSchema(faqs),
  breadcrumbSchema([{ name: "FAQ", path: "/faq" }])
  );
}

export default async function FaqPage() {
  const subscribers = await getSubscriberCount();
  const faqGroups = buildFaqGroups(subscribers);
  const structuredData = buildStructuredData(allFaqs(subscribers));

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accent mb-6">
              FAQ
            </p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Questions, <span className="italic text-accent">answered.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Everything people ask most often — about the work, the background,
              the talks and the products.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <AnswerBlock className="mb-16">
            <p>{DEFINITION}</p>
          </AnswerBlock>
        </Reveal>

        {/* A contents list, so a reader landing from a query can jump to the
            group their question belongs to rather than scrolling past four
            they do not care about. */}
        <Reveal>
          <nav aria-label="Questions by topic" className="mb-20">
            <ul className="flex flex-wrap gap-3">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}-heading`}
                    className="inline-flex border border-ink/20 px-5 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        {faqGroups.map((group) => (
          <FaqSection
            key={group.id}
            id={group.id}
            title={group.title}
            faqs={group.faqs}
          />
        ))}

        <Reveal>
          <div className="border border-line rounded-3xl p-10 sm:p-14">
            <h2 className="font-display italic text-4xl mb-6">
              Still have a question?
            </h2>
            <p className="text-ink/70 mb-8 max-w-2xl leading-relaxed">
              Ask it directly — the{" "}
              <Link
                href="/ask"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                ask box
              </Link>{" "}
              answers from everything on this site. For anything it cannot
              answer, email works better.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href={`mailto:${EMAIL}`}
                className="bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex"
              >
                Email Me
              </MagneticButton>
              <MagneticButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex"
              >
                Book a Call
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
