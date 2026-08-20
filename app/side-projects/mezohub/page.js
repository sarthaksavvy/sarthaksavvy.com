import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Search,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";
import ClientImage from "../../components/ClientImage";
import JsonLd from "../../components/JsonLd";
import { ogImages, pageMetadata } from "../../seo";
import {
  breadcrumbSchema,
  graph,
  softwareApplicationSchema,
} from "../../structuredData";

const SITE = "https://mezohub.com";

const DESCRIPTION =
  "Mezohub is a centralized platform for connecting developers, designers, and entrepreneurs to collaborate on innovative projects.";

export const metadata = pageMetadata({
  title: "Mezohub - Collaboration Platform | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/side-projects/mezohub",
  image: ogImages.mezohub,
});

const structuredData = graph(
  softwareApplicationSchema({
    name: "Mezohub",
    description: DESCRIPTION,
    url: SITE,
    path: "/side-projects/mezohub",
    image: ogImages.mezohub.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
  }),
  breadcrumbSchema([
    { name: "Side Projects", path: "/side-projects" },
    { name: "Mezohub", path: "/side-projects/mezohub" },
  ])
);

export default function MezohubProject() {
  const features = [
    {
      icon: <Search size={24} className="text-accent" />,
      title: "Project Discovery",
      description:
        "Browse projects looking for collaborators, and get matched with the ones that fit your skills and interests.",
    },
    {
      icon: <Users size={24} className="text-accent" />,
      title: "Skill-Based Team Formation",
      description:
        "Build a team around the skills a project actually needs, connecting developers, designers, and entrepreneurs.",
    },
    {
      icon: <MessageCircle size={24} className="text-accent" />,
      title: "Integrated Messaging",
      description:
        "Message collaborators directly inside Mezohub, so coordinating a team doesn't mean jumping to another app.",
    },
    {
      icon: <Share2 size={24} className="text-accent" />,
      title: "Project Showcase",
      description:
        "Showcase finished and in-progress work in a public portfolio, so it's discoverable by the wider community.",
    },
  ];

  const benefits = [
    {
      title: "For Developers",
      points: [
        "Discover projects that match your skills",
        "Get matched onto teams through skill-based team formation",
        "Coordinate with teammates via integrated messaging",
        "Showcase what you've built in a public portfolio",
      ],
    },
    {
      title: "For Designers",
      points: [
        "Find projects that need design collaborators",
        "Join teams through skill-based matching",
        "Stay in sync with the team via integrated messaging",
        "Build a portfolio of the projects you've shipped",
      ],
    },
    {
      title: "For Entrepreneurs",
      points: [
        "Discover developers and designers for your idea",
        "Form a team through skill-based matching",
        "Keep the team aligned with integrated messaging",
        "Showcase your project to attract collaborators",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink py-16 px-6">
      <JsonLd data={structuredData} />
      <div className="container mx-auto max-w-6xl">
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
            <h1 className="font-display text-5xl md:text-6xl mb-6">Mezohub</h1>
            <p className="text-xl text-ink/70 mb-8">
              A platform for connecting developers, designers, and entrepreneurs
              to collaborate on innovative projects. Mezohub bridges the gap
              between ideas and execution.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://mezohub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
              >
                Visit Mezohub
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <ClientImage
              src="/images/projects/mezohub.jpg"
              alt="Mezohub Platform"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-6 text-accent">
            Project Overview
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <p className="text-ink/70 mb-6">
              Mezohub solves a different problem than most project tools:
              finding the right people to build with. It&apos;s a dedicated
              space where developers, designers, and entrepreneurs can
              discover projects and each other.
            </p>
            <p className="text-ink/70">
              Project discovery, skill-based team formation, integrated
              messaging, and portfolio showcases live in one place, so
              collaboration doesn&apos;t mean stitching together five
              separate tools.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
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

        {/* Benefits for Different Users */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Who Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-ink/70"
                    >
                      <CheckCircle
                        size={18}
                        className="text-accent mt-1 flex-shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-6 text-accent">
            Technologies Used
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">React</p>
                <p className="text-sm text-muted">Frontend Framework</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Laravel</p>
                <p className="text-sm text-muted">Backend</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">MySQL</p>
                <p className="text-sm text-muted">Database</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">WebSocket</p>
                <p className="text-sm text-muted">Real-time Communication</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Digital Ocean</p>
                <p className="text-sm text-muted">Cloud Infrastructure</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Tailwind CSS</p>
                <p className="text-sm text-muted">Styling</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">GitHub Actions</p>
                <p className="text-sm text-muted">CI/CD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-paper border border-line rounded-3xl p-8 mb-12 shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to collaborate on Mezohub?
          </h3>
          <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
            Join our growing community of developers, designers, and
            entrepreneurs to find your next project or team member.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://mezohub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-paper px-8 py-3 rounded-full font-medium hover:bg-accent transition-colors inline-flex items-center gap-2"
            >
              Visit Platform
              <ExternalLink size={20} />
            </a>
            <Link
              href="/side-projects"
              className="bg-transparent border border-ink/20 text-ink px-8 py-3 rounded-full font-medium hover:bg-line/60 transition-colors inline-flex items-center gap-2"
            >
              View Other Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
