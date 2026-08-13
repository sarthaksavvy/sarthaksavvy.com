import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";
import MagneticButton from "../components/motion/MagneticButton";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  professionalServiceSchema,
} from "../structuredData";

const BOOKING_URL = "https://cal.com/sarthaksavvy";
const EMAIL = "hello@sarthaksavvy.com";

const DESCRIPTION =
  "AI consultant working with teams on LLM features, AI automation and the " +
  "path to production — from picking a model to shipping something people use.";

export const metadata = pageMetadata({
  title: "AI Consultant — LLM Features & Automation | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/ai-consulting",
});

// Each area is one thing I have actually built, described in terms of the work
// rather than the technology. `summary` is reused verbatim in the
// ProfessionalService markup, so editing the copy here updates both.
const services = [
  {
    title: "LLM features in your product",
    summary:
      "Taking a language model from a demo that impresses to a feature that survives real users: model choice, prompt design, timeouts, rate limits, and what the product does when the answer comes back wrong.",
    evidence: "Built end to end in AudioBolo, Backstage Cut and the ask box on this site.",
  },
  {
    title: "AI automation for everyday work",
    summary:
      "The repetitive middle of a workflow — transcribing, summarising, tagging, drafting, reformatting — is usually where the first hours come back. The useful part is deciding what to automate before anything gets built.",
    evidence: "Backstage Cut does this for video editing; Ginger does it for LinkedIn.",
  },
  {
    title: "Getting it into production, and keeping it there",
    summary:
      "Containers, deployment, cost and latency budgets, and the monitoring that tells you a model has quietly started answering badly.",
    evidence: "Docker Captain, AWS Certified Solutions Architect and Developer.",
  },
  {
    title: "Bringing your team along",
    summary:
      "Hands-on sessions so your engineers can extend the work afterwards, instead of owning a system only one person understands.",
    evidence: "134K+ subscribers on YouTube and 100K+ students on Udemy.",
  },
];

// Everything here is already stated elsewhere on the site — the about page and
// the hero. Nothing on this page claims a credential that is not.
const credentials = [
  { value: "10+ yrs", label: "Building and shipping software" },
  { value: "Docker", label: "Docker Captain since 2023" },
  { value: "AWS ×2", label: "Solutions Architect and Developer" },
  { value: "Bitfumes", label: "Founder and educator" },
];

// The answers are plain strings because they are rendered as-is *and* handed to
// the FAQPage markup. Rich text here would mean the two copies could differ,
// and structured data that does not match the visible page is worse than none.
const faqs = [
  {
    question: "What does the work actually look like?",
    answer:
      "Three things, usually in this order: work out which part of your problem a language model genuinely solves, build that part, and leave your team able to maintain it. The first step is the one most projects skip, and it decides whether the rest is worth doing.",
  },
  {
    question: "Do you build the feature, or only advise on it?",
    answer:
      "Both. I write the code — Laravel, JavaScript and Python — and I have shipped my own AI products end to end, so an engagement can be a design review, a working feature, or the whole path from idea to production.",
  },
  {
    question: "We have not picked a model or a provider yet. Is that a problem?",
    answer:
      "No. That is usually the first decision rather than a prerequisite, and it depends on what you are optimising for: cost per call, latency, privacy, or how you plan to judge the output. Choosing before those are clear is how teams end up rebuilding.",
  },
  {
    question: "Can you help a team that is new to LLMs?",
    answer:
      "That is most of the work. Teaching is what I have done longest, with 134K+ subscribers on YouTube and over 100K students on Udemy, and the same approach works inside a company: build something real, then hand over how it works.",
  },
  {
    question: "Where are you based, and how do we start?",
    answer:
      "I am based in India and work with teams remotely. The quickest start is to book a call and bring the problem rather than a spec, or email hello@sarthaksavvy.com.",
  },
];

// TODO(sarthak): engagement formats and what each one costs. Left empty rather
// than filled with plausible-sounding numbers — the section renders only once
// there is something real to put in it. Shape:
// { name: "Advisory call", detail: "...", price: "..." }
const engagementFormats = [];

// TODO(sarthak): real client work, with permission to name it. Same reasoning:
// an invented case study is worse for trust than no case study at all.
// Shape: { client: "...", problem: "...", outcome: "...", href: "..." }
const caseStudies = [];

const structuredData = graph(
  professionalServiceSchema({
    path: "/ai-consulting",
    name: "AI Consulting by Sarthak Shrivastava",
    description: DESCRIPTION,
    services,
  }),
  faqSchema(faqs),
  breadcrumbSchema([{ name: "AI Consulting", path: "/ai-consulting" }])
);

export default function AiConsulting() {
  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 grid md:grid-cols-12 gap-6">
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

        <div className="mb-24">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
              {"// Where I can help"}
            </h2>
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
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
              {"// What you are hiring"}
            </h2>
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
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
                {"// How engagements work"}
              </h2>
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
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
                {"// Selected work"}
              </h2>
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

        <div className="mb-24">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
              {"// Common questions"}
            </h2>
          </Reveal>
          <StaggerGroup className="grid gap-6">
            {faqs.map((faq) => (
              <StaggerItem key={faq.question}>
                <div className="border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors bg-paper">
                  <h3 className="font-display italic text-2xl mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-ink/70 leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

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
