import {
  ArrowLeft,
  ArrowRight,
  Captions,
  ExternalLink,
  Film,
  ListOrdered,
  Mic,
  ZoomIn,
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

const SITE = "https://premier-pro-extension.vercel.app";

const DESCRIPTION =
  "Backstage Cut is an AI-powered Premiere Pro extension that handles transcription, captions, zooms, B-roll and chapters without leaving the timeline.";

export const metadata = pageMetadata({
  title: "Backstage Cut - AI Premiere Pro Extension | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/side-projects/backstage-cut",
  image: ogImages.backstageCut,
});

// The same record the index page and the /side-projects/backstage-cut.md mirror
// render from, so the product is described identically wherever it appears.
const project = projectByPath("/side-projects/backstage-cut");

// The same trail feeds the BreadcrumbList markup and the visible
// breadcrumb nav below, so the two cannot drift apart.
const BREADCRUMB_TRAIL = [
  { name: "Side Projects", path: "/side-projects" },
  { name: "Backstage Cut", path: "/side-projects/backstage-cut" },
];

const structuredData = graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/side-projects/backstage-cut",
    name: "Backstage Cut — AI extension for Adobe Premiere Pro",
    description: DESCRIPTION,
    primaryImage: project.image,
  }),
  softwareApplicationSchema({
    name: "Backstage Cut",
    description: DESCRIPTION,
    url: SITE,
    path: "/side-projects/backstage-cut",
    image: ogImages.backstageCut.url,
    applicationCategory: "MultimediaApplication",
    features: project.features,
  }),
  breadcrumbSchema(BREADCRUMB_TRAIL)
);

export default function BackstageCutProject() {
  const features = [
    {
      icon: <Mic size={24} className="text-accent" />,
      title: "Transcription",
      description:
        "Transcribes the active sequence in one click — no export, no round trip. English, Hindi and Hinglish with automatic language detection, and every word stays editable before anything gets rendered.",
    },
    {
      icon: <Captions size={24} className="text-accent" />,
      title: "Live Captions",
      description:
        "Five caption styles — clean word progress, editorial serif, kinetic focus, impact pulse and editorial label — previewed live over your actual footage, with TikTok and Reels safe zones respected.",
    },
    {
      icon: <ZoomIn size={24} className="text-accent" />,
      title: "AutoZoom",
      description:
        "Punch-in zooms timed to what is actually being said instead of a fixed interval. Keyframes land on non-destructive adjustment layers and stay as editable as any native Premiere keyframe.",
    },
    {
      icon: <Film size={24} className="text-accent" />,
      title: "Smart Assets",
      description:
        "Matches clips from your own B-roll folder against the transcript and suggests frame-aligned placements. Nothing touches the timeline until you approve it.",
    },
    {
      icon: <ListOrdered size={24} className="text-accent" />,
      title: "Chapters",
      description:
        "YouTube chapter markers timed straight from the transcript. Regenerate the titles as many times as you like without re-timing anything underneath.",
    },
  ];

  const steps = [
    {
      title: "Talk it through once",
      description:
        "Transcribe the sequence or bring in an existing SRT. Every word stays editable, and that same transcript feeds captions, zooms, B-roll and chapters.",
    },
    {
      title: "Make it yours",
      description:
        "Pick a caption style, position it over the footage, and save it as your house style so the next twenty videos start where this one ended.",
    },
    {
      title: "Keep editing",
      description:
        "Everything lands as ordinary Premiere clips and keyframes. No export, no round trip, no proprietary format to get stuck inside.",
    },
  ];

  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      points: [
        "30 minutes of transcription",
        "All features unlocked",
        "No credit card required",
      ],
    },
    {
      name: "Pro Beta",
      price: "$5/mo",
      points: [
        "300 minutes every 30 days — about twenty videos",
        "Beta rate locked in when it leaves beta",
        "Cancel anytime from the billing portal",
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
            <h1 className="font-display text-5xl md:text-6xl mb-6">
              Backstage Cut
            </h1>
            <p className="text-xl text-ink/70 mb-8">
              Ship three videos in the time one used to take. An AI panel that
              lives inside Premiere Pro and handles the repetitive half of
              editing — captions, zooms, B-roll and chapters — so you can stay
              on the story.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
              >
                Try Backstage Cut
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
              src="/images/projects/backstage-cut.png"
              alt="Backstage Cut — AI Premiere Pro extension"
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
              Most of the time a creator spends in Premiere is not spent on
              creative decisions. It goes into transcribing, styling captions,
              adding punch-in zooms, hunting for the right B-roll clip and
              typing out chapter markers — the same handful of jobs on every
              single video.
            </p>
            <p className="text-ink/70">
              Backstage Cut collapses that work into a panel that sits next to
              the timeline. It transcribes the active sequence without an
              export, then reuses that one transcript for captions, zoom timing,
              B-roll matching and chapters. Whatever it produces is ordinary
              Premiere clips and keyframes, so the project stays yours — and
              stays editable — even if the extension is uninstalled tomorrow.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <span className="font-display italic text-3xl text-accent">
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
                Premiere Pro
              </h3>
              <p className="text-ink/70">
                2021 (15.0) or later, including 2024 and 2025.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted">
                Operating System
              </h3>
              <p className="text-ink/70">
                macOS 10.15 or later, or Windows 10/11 — both 64-bit.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted">
                Install
              </h3>
              <p className="text-ink/70">
                Ships as a ZXP panel, installed with ZXP Installer.
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
              Backstage Cut is in beta and used on real edits every week. Start
              with 30 free minutes of transcription — every feature unlocked, no
              credit card.
            </p>
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors text-lg"
            >
              Visit Backstage Cut
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
