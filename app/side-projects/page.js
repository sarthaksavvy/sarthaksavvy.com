import { ArrowRight } from "lucide-react";
import Link from "next/link";
import DissolveImage from "../components/motion/DissolveImage";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";
import MagneticButton from "../components/motion/MagneticButton";
import TiltCard from "../components/motion/TiltCard";
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
  projectListSchema,
  webPageSchema,
} from "../structuredData";
import { PROJECTS } from "../content/projects";
import { faqGroup } from "../content/faqs";
import { getSubscriberCount } from "../../lib/youtube";

const DESCRIPTION =
  "AI apps built by AI consultant Sarthak Shrivastava — an AI voice-to-text " +
  "tool, a Premiere Pro AI extension, an expense tracker and a LinkedIn AI " +
  "assistant.";

export const metadata = pageMetadata({
  title: "Side Projects by Sarthak Shrivastava — AI Apps & Tools",
  description: DESCRIPTION,
  path: "/side-projects",
});

// The catalogue moved to app/content/projects.js. It was five records with no
// behaviour attached, and the markdown mirror at /side-projects.md, the
// ItemList markup below and each project's own page all need the same five —
// so keeping them inside this component meant four places to edit a feature
// list and three chances to forget one.
function buildStructuredData(faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/side-projects",
    name: "Side projects by Sarthak Shrivastava",
    description: DESCRIPTION,
  }),
  // An ordered list of applications rather than an ordered list of links: a
  // crawler reading the link version learns five pages exist, and reading this
  // one learns what each of them is.
  projectListSchema(PROJECTS),
  faqSchema(faqs),
  breadcrumbSchema([{ name: "Side Projects", path: "/side-projects" }])
  );
}

export default async function SideProjects() {
  const projects = PROJECTS;
  const subscribers = await getSubscriberCount();
  const faqs = faqGroup("projects", subscribers).faqs;
  const structuredData = buildStructuredData(faqs);

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              Side <span className="italic text-accent">Projects.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Exploring my creativity through passion projects — each one an
              opportunity to innovate and solve real-world problems.
            </p>
          </Reveal>
        </div>

        {/* Names all five products in one paragraph. A grid of cards is the
            right way to browse them and the wrong way to be asked "what has
            Sarthak built" — the answer to that has to exist as a sentence
            somewhere, or a model assembles one from whichever card it read. */}
        <Reveal>
          <AnswerBlock className="mb-16">
            <p>
              Sarthak Shrivastava has built and shipped five products, most of
              them on top of large language models: Backstage Cut, an AI
              extension for Adobe Premiere Pro; AudioBolo, an AI voice-to-text
              app for macOS; Expensorr, an expense tracker for iOS and Android;
              Mezohub, a collaboration platform for developers and designers;
              and Ginger, a LinkedIn AI assistant for Chrome. All five are live
              and publicly available.
            </p>
          </AnswerBlock>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project, i) => (
            <StaggerItem key={project.id}>
              <TiltCard
                className={`border border-line rounded-3xl overflow-hidden hover:border-ink/40 transition-colors h-full ${
                  i % 2 === 1 ? "md:mt-12" : ""
                }`}
              >
                <Link href={project.projectLink}>
                  <div className="h-64 relative bg-line">
                    <DissolveImage src={project.image} alt={project.name} className="h-full w-full" />
                  </div>
                </Link>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/15 text-ink/70 text-xs font-mono px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={project.projectLink}>
                    <h2 className="font-display italic text-3xl mb-3 hover:text-accent transition-colors">
                      {project.name}
                    </h2>
                  </Link>
                  <p className="text-ink/70 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-ink/70">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <MagneticButton
                      as={Link}
                      href={project.projectLink}
                      className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </MagneticButton>

                    <MagneticButton
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors"
                    >
                      Visit Project
                      <ArrowRight size={16} />
                    </MagneticButton>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FaqSection faqs={faqs} id="projects-faq" />

        <Reveal className="border border-line rounded-3xl p-10 sm:p-14 text-center">
          <h2 className="font-display italic text-3xl sm:text-4xl mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
            I&apos;m always open to new ideas and collaborations on interesting
            projects. Let&apos;s create something amazing together!
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
