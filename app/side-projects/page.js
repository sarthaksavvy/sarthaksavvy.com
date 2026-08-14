import { ArrowRight } from "lucide-react";
import Link from "next/link";
import DissolveImage from "../components/motion/DissolveImage";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";
import MagneticButton from "../components/motion/MagneticButton";
import TiltCard from "../components/motion/TiltCard";
import JsonLd from "../components/JsonLd";
import { canonicalUrl, pageMetadata } from "../seo";
import { breadcrumbSchema, graph } from "../structuredData";

export const metadata = pageMetadata({
  title: "Sarthak Shrivastava - Side Projects",
  description: "Side Projects by Sarthak Shrivastava",
  path: "/side-projects",
});

export default function SideProjects() {
  const projects = [
    {
      id: 4,
      name: "Backstage Cut",
      description:
        "An AI-powered Premiere Pro extension that automates the repetitive parts of editing — transcription, captions, zooms, B-roll and chapters — without ever leaving the timeline.",
      image: "/images/projects/backstage-cut.png",
      link: "https://premier-pro-extension.vercel.app",
      projectLink: "/side-projects/backstage-cut",
      tags: ["AI", "Premiere Pro", "Video Editing"],
      features: [
        "One-click transcription and captions in English, Hindi and Hinglish",
        "Punch-in zooms timed to dialogue, with editable keyframes",
        "B-roll matched from your own folder and frame-aligned",
        "YouTube chapter markers generated from the transcript",
      ],
    },
    {
      id: 5,
      name: "AudioBolo",
      description:
        "An AI voice transcription app for macOS that turns speech into accurate, context-aware text — so you can type at the speed of thought.",
      image: "/images/projects/audiobolo.png",
      link: "https://audiobolo.com",
      projectLink: "/side-projects/audiobolo",
      tags: ["AI", "macOS App", "Productivity"],
      features: [
        "Screen context awareness for more accurate transcripts",
        "Auto-learns from your corrections over time",
        "@Filename tagging for AI coding tools like Cursor",
        "Custom modes for posts, emails and meeting notes",
      ],
    },
    {
      id: 2,
      name: "Expensorr",
      description:
        "A simple yet powerful expense tracking application that helps you monitor and manage your personal finances with ease.",
      image: "/images/projects/expensorr.png",
      link: "https://apps.apple.com/us/app/expensorr/id6739472004",
      projectLink: "/side-projects/expensorr",
      tags: ["Finance", "Tracking", "Mobile App"],
      features: [
        "Receipt scanning and categorization",
        "Budget planning and alerts",
        "Expense reports and analytics",
        "Multi-currency support",
      ],
    },
    {
      id: 1,
      name: "Mezohub",
      description:
        "A centralized platform for connecting developers, designers, and entrepreneurs to collaborate on innovative projects.",
      image: "/images/projects/mezohub.jpg",
      link: "https://mezohub.com",
      projectLink: "/side-projects/mezohub",
      tags: ["Collaboration", "Platform", "Community"],
      features: [
        "Project discovery and matching",
        "Integrated messaging system",
        "Skill-based team formation",
        "Project showcase portfolio",
      ],
    },
    {
      id: 3,
      name: "Ginger",
      description:
        "A Chrome extension that helps users generate human-like comments using AI on LinkedIn posts and reply to existing comments effortlessly.",
      image: "/images/projects/ginger.jpg",
      link: "https://chromewebstore.google.com/detail/ginger-linkedin-ai-assist/ijolijeckddogpijopofibpplokamjba",
      projectLink: "/side-projects/ginger",
      tags: ["AI", "Chrome Extension", "LinkedIn"],
      features: [
        "Human-like LinkedIn comment generation",
        "Reply to comments with AI assistance",
        "No sign-in required to get started",
        "100 free generations for guests, 300 for signed-in users",
      ],
    },
  ];

  // Listing the projects as an ordered set of pages gives the index a reason
  // to be crawled past its own copy: each entry names a detail page a crawler
  // might otherwise only reach by following a card link.
  const structuredData = graph(
    {
      "@type": "ItemList",
      name: "Side projects by Sarthak Shrivastava",
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: project.name,
        url: canonicalUrl(project.projectLink),
      })),
    },
    breadcrumbSchema([{ name: "Side Projects", path: "/side-projects" }])
  );

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

        <Reveal className="border border-line rounded-3xl p-10 sm:p-14 text-center">
          <h3 className="font-display italic text-3xl sm:text-4xl mb-4">
            Interested in collaborating?
          </h3>
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
