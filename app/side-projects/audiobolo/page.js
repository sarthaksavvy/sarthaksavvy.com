import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Code2,
  ExternalLink,
  Lock,
  MonitorSmartphone,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { ogImages, pageMetadata } from "../../seo";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  personSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "../../structuredData";
import { projectByPath } from "../../content/projects";

const SITE = "https://audiobolo.com";

const DESCRIPTION =
  "AudioBolo is an AI-powered voice transcription app for macOS that turns speech into accurate, context-aware text — type at the speed of thought.";

export const metadata = pageMetadata({
  title: "AudioBolo - AI Voice to Text for macOS | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/side-projects/audiobolo",
  image: ogImages.audiobolo,
});

// The same record the index page and the /side-projects/audiobolo.md mirror
// render from, so the product is described identically wherever it appears.
const project = projectByPath("/side-projects/audiobolo");

// The same trail feeds the BreadcrumbList markup and the visible
// breadcrumb nav below, so the two cannot drift apart.
const BREADCRUMB_TRAIL = [
  { name: "Side Projects", path: "/side-projects" },
  { name: "AudioBolo", path: "/side-projects/audiobolo" },
];

const structuredData = graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/side-projects/audiobolo",
    name: "AudioBolo — AI voice-to-text for macOS",
    description: DESCRIPTION,
    primaryImage: project.image,
  }),
  softwareApplicationSchema({
    name: "AudioBolo",
    description: DESCRIPTION,
    url: SITE,
    path: "/side-projects/audiobolo",
    image: ogImages.audiobolo.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS",
    features: project.features,
  }),
  breadcrumbSchema(BREADCRUMB_TRAIL)
);

export default function AudioBoloProject() {
  const features = [
    {
      icon: <MonitorSmartphone size={24} className="text-accent" />,
      title: "Screen Context Awareness",
      description:
        "AudioBolo reads the interface of whatever app you are in — open tabs, sidebar files, URLs — so the AI already knows what you are working on before you start speaking.",
    },
    {
      icon: <Code2 size={24} className="text-accent" />,
      title: "IDE-aware Formatting",
      description:
        "Detects VS Code, Cursor and Xcode and formats what you dictate as code instead of prose, so snippets land ready to use rather than ready to clean up.",
    },
    {
      icon: <Sparkles size={24} className="text-accent" />,
      title: "Auto-Learn from Corrections",
      description:
        "Fix a word once and the app quietly remembers it. Names, jargon and product spellings stop coming back wrong on the next recording.",
    },
    {
      icon: <AtSign size={24} className="text-accent" />,
      title: "@Filename Tagging",
      description:
        "Reads your open files and project sidebar, then turns a spoken filename into a proper @reference for AI coding tools like Cursor's composer.",
    },
    {
      icon: <Wand2 size={24} className="text-accent" />,
      title: "Custom Modes",
      description:
        "Turn raw speech into a LinkedIn post, a professional email or structured meeting notes with one keystroke — each mode driven by a prompt you control.",
    },
    {
      icon: <Lock size={24} className="text-accent" />,
      title: "Private by Default",
      description:
        "Audio is processed locally where it can be, servers keep nothing after transcription, and on-device Whisper models let you work fully offline.",
    },
  ];

  const steps = [
    {
      title: "Press",
      description:
        "Hit your global shortcut from anywhere on the Mac — push-to-talk, no window to find first.",
    },
    {
      title: "Speak",
      description:
        "Talk normally. Filler words get stripped, and 50+ voice commands handle formatting as you go.",
    },
    {
      title: "Paste",
      description:
        "Finished text appears instantly and can auto-paste straight into the app you were already using.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      points: [
        "15 minutes of cloud transcription daily",
        "Unlimited offline transcription",
        "Local history, auto-copy, filler removal, push-to-talk",
      ],
    },
    {
      name: "Pro",
      price: "$24.99/yr",
      points: [
        "Unlimited transcription",
        "Priority cloud processing",
        "Cloud history sync across devices",
        "Export to TXT, SRT, VTT and CSV",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      points: [
        "Volume discounts for teams",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink py-16 px-6">
      <JsonLd data={structuredData} />
      <div className="container mx-auto max-w-6xl">
        <Breadcrumbs trail={BREADCRUMB_TRAIL} />
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h1 className="font-display text-5xl md:text-6xl mb-6">AudioBolo</h1>
            <p className="text-xl text-ink/70 mb-8">
              Type at the speed of thought. An AI voice transcription app for
              macOS that understands what is on your screen, learns your
              vocabulary, and drops finished text wherever you were already
              working.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
              >
                Download for macOS
                <ExternalLink size={18} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-transparent border border-ink/20 text-ink px-6 py-3 rounded-full font-medium hover:bg-line/60 transition-colors"
              >
                Learn More
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="relative aspect-[1200/630] rounded-3xl overflow-hidden shadow-xl border border-line">
            <Image
              src="/images/projects/audiobolo.png"
              alt="AudioBolo — AI voice transcription for macOS"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-20">
          <h2
            className="font-display italic text-3xl mb-6 text-accent"
            id="overview"
          >
            Project Overview
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <p className="text-ink/70 mb-6">
              Dictation tools are usually fast and wrong. They hear the words
              but not the situation, so every transcript arrives needing the
              same round of edits: fixed names, fixed jargon, reformatted code,
              stripped filler.
            </p>
            <p className="text-ink/70">
              AudioBolo closes that gap by reading the context you are already
              in. It knows which app is in front of you, which files are open,
              and which corrections you made last time — and it uses all three
              before the first word is transcribed. Cloud and on-device Whisper
              both work, 99+ languages are supported, and nothing is kept on the
              server once your text comes back.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20" id="features">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-ink/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            How It Works
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-ink/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <span className="font-display italic text-2xl text-accent">
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-2">
                  {plan.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-ink/70"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Requirements
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted">
                Operating System
              </h3>
              <p className="text-ink/70">macOS 12 (Monterey) or later.</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted">
                Languages
              </h3>
              <p className="text-ink/70">
                99+ supported, detected automatically.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted">
                Offline
              </h3>
              <p className="text-ink/70">
                On-device Whisper models, no connection required.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Get Started Now
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg text-center">
            <p className="text-xl text-ink/70 mb-8 max-w-2xl mx-auto">
              Start free with 15 minutes of cloud transcription a day and
              unlimited offline transcription. No account needed to find out
              whether talking beats typing.
            </p>
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors text-lg"
            >
              Visit AudioBolo
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* Back to Projects */}
        <div className="text-center">
          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
