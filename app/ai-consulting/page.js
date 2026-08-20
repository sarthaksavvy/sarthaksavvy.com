import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";
import MagneticButton from "../components/motion/MagneticButton";
import AnswerBlock from "../components/content/AnswerBlock";
import FaqSection from "../components/content/FaqSection";
import SectionHeading from "../components/content/SectionHeading";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  professionalServiceSchema,
  webPageSchema,
} from "../structuredData";
import {
  BOOKING_URL,
  CONSULTING_DESCRIPTION as DESCRIPTION,
  EMAIL,
  buildServices,
  caseStudies,
  credentials,
  engagementFormats,
} from "../content/consulting";
import { faqGroup } from "../content/faqs";
import { getSubscriberCount } from "../../lib/youtube";

export const metadata = pageMetadata({
  title: "AI Consultant — LLM Features & Automation | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/ai-consulting",
});

// The services, credentials and questions all live in app/content/consulting.js
// and app/content/faqs.js now rather than in this file. They were only ever
// data, and three other surfaces need the same data: the ProfessionalService
// markup below, the /ai-consulting.md mirror, and the sitewide /faq page. Once
// two of those existed, keeping the arrays inside the component meant the copy
// on this page and the copy an assistant reads could disagree — which is the
// one failure mode structured data has no way to survive.
function buildStructuredData(services, faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  professionalServiceSchema({
    path: "/ai-consulting",
    name: "AI Consulting by Sarthak Shrivastava",
    description: DESCRIPTION,
    services,
  }),
  webPageSchema({
    path: "/ai-consulting",
    name: "AI Consulting by Sarthak Shrivastava",
    description: DESCRIPTION,
    primaryImage: "/images/sarthak.jpg",
  }),
  faqSchema(faqs),
  breadcrumbSchema([{ name: "AI Consulting", path: "/ai-consulting" }])
  );
}

export default async function AiConsulting() {
  // The evidence line under "Bringing your team along" quotes the live
  // subscriber count, so the page and its markdown mirror have to read it from
  // the same place rather than each carrying a copy.
  const subscribers = await getSubscriberCount();
  const services = buildServices(subscribers);
  const faqs = faqGroup("consulting", subscribers).faqs;
  const structuredData = buildStructuredData(services, faqs);

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-accent mb-6">
              AI Consulting
            </p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Ship the AI feature, <span className="italic text-accent">not the demo.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Most teams do not need a research lab. They need someone who has
              already put a language model in front of real users and knows
              where it breaks.
            </p>
          </Reveal>
        </div>

        {/* The headline is a good headline and a bad answer: it says nothing
            about who is offering what, to whom, from where. This paragraph is
            the one an assistant can quote when asked what Sarthak's consulting
            practice actually is. */}
        <Reveal>
          <AnswerBlock className="mb-24">
            <p>
              Sarthak Shrivastava is an AI consultant who works with teams on
              LLM features, AI automation and the path to production — from
              picking a model to shipping something people use. He is based in
              India and works remotely with teams worldwide, in English or
              Hindi.
            </p>
            <p>
              He is a Docker Captain, an AWS Certified Solutions Architect and
              Developer, and the founder of Bitfumes. Unusually for a
              consultant, the AI products he points at are his own: AudioBolo
              and Backstage Cut were both built and shipped end to end, so the
              advice comes from having already made the mistakes.
            </p>
          </AnswerBlock>
        </Reveal>

        <div className="mb-24">
          <Reveal>
            <SectionHeading>Where I can help</SectionHeading>
          </Reveal>
          <StaggerGroup className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="h-full border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors bg-paper">
                  <h3 className="font-display italic text-2xl mb-4">
                    {service.title}
                  </h3>
                  <p className="text-ink/70 leading-relaxed mb-6">
                    {service.summary}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted">
                    {service.evidence}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="mb-24">
          <Reveal>
            <SectionHeading>What you are hiring</SectionHeading>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((item) => (
              <StaggerItem key={item.label}>
                <div className="h-full border border-line rounded-3xl p-8 bg-paper">
                  <div className="font-display text-3xl sm:text-4xl text-accent mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-ink/70">{item.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal>
            <p className="text-ink/70 mt-8 max-w-2xl leading-relaxed">
              The longer version — the roles, the certifications and how I got
              here — is on the{" "}
              <Link
                href="/about-me"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                about page
              </Link>
              , and the AI products I have shipped are in{" "}
              <Link
                href="/side-projects"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                side projects
              </Link>
              .
            </p>
          </Reveal>
        </div>

        {engagementFormats.length > 0 && (
          <div className="mb-24">
            <Reveal>
              <SectionHeading>How engagements work</SectionHeading>
            </Reveal>
            <StaggerGroup className="grid md:grid-cols-3 gap-8">
              {engagementFormats.map((format) => (
                <StaggerItem key={format.name}>
                  <div className="h-full border border-line rounded-3xl p-8 bg-paper">
                    <div className="flex items-baseline justify-between mb-4 gap-4">
                      <h3 className="font-display italic text-2xl">
                        {format.name}
                      </h3>
                      <span className="font-mono text-xs tracking-widest text-accent shrink-0">
                        {format.price}
                      </span>
                    </div>
                    <p className="text-ink/70 leading-relaxed">
                      {format.detail}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {caseStudies.length > 0 && (
          <div className="mb-24">
            <Reveal>
              <SectionHeading>Selected work</SectionHeading>
            </Reveal>
            <StaggerGroup className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <StaggerItem key={study.client}>
                  <div className="h-full border border-line rounded-3xl p-8 bg-paper">
                    <h3 className="font-display italic text-2xl mb-4">
                      {study.client}
                    </h3>
                    <p className="text-ink/70 leading-relaxed mb-4">
                      {study.problem}
                    </p>
                    <p className="text-ink/70 leading-relaxed">
                      {study.outcome}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        <FaqSection faqs={faqs} id="consulting-faq" />

        <Reveal>
          <div className="border border-line rounded-3xl p-10 sm:p-14">
            <h2 className="font-display italic text-4xl mb-6">
              Start a conversation
            </h2>
            <p className="text-ink/70 mb-8 max-w-2xl leading-relaxed">
              Bring the problem rather than a spec. Half an hour is usually
              enough to work out whether a language model is the right tool for
              it — and I will say so if it is not.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex items-center gap-3"
              >
                Book a Call
                <ArrowRight size={16} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton
                href={`mailto:${EMAIL}`}
                className="border border-ink/20 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex"
              >
                Email Me
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
