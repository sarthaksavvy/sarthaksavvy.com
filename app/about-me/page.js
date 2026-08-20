import Image from "next/image";
import Reveal from "../components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "../components/motion/Stagger";
import MagneticButton from "../components/motion/MagneticButton";
import { getSubscriberCount } from "../../lib/youtube";
import JsonLd from "../components/JsonLd";
import { canonicalUrl, pageMetadata } from "../seo";
import { breadcrumbSchema, graph, personSchema } from "../structuredData";

export const metadata = pageMetadata({
  title: "About Sarthak Shrivastava — AI Consultant & Docker Captain",
  description:
    "The path from software engineer to AI consultant: founding Bitfumes, becoming a Docker Captain, earning AWS certifications, and teaching 100K+ developers.",
  path: "/about-me",
});

// The page a crawler should treat as the profile of the person, which is what
// makes the roles, credentials and social links here attributable rather than
// loose text on a page.
const structuredData = graph(
  {
    "@type": "ProfilePage",
    url: canonicalUrl("/about-me"),
    name: "About Sarthak Shrivastava",
    mainEntity: personSchema(),
  },
  breadcrumbSchema([{ name: "About Me", path: "/about-me" }])
);

const currentRoles = [
  "Founder of Bitfumes",
  "Software Engineer at Pfizer",
  "Content Creator",
  "Docker Captain",
];

const coreExpertise = [
  "Laravel, JavaScript and Python Development",
  "AWS Cloud Certified",
  "Docker & DevOps",
  "AI & LLMs Integration",
];

const recognition = [
  "Docker Captain (December 2023)",
  "AWS Certified Solutions Architect",
  "AWS Certified Developer",
];

const baseStats = [
  { value: "100K+", label: "Students on Udemy" },
  { value: "3,000+", label: "Positive Course Reviews" },
];

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
  const stats = [
    { value: subscribers, label: "YouTube Subscribers" },
    ...baseStats,
  ];
  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 grid md:grid-cols-12 gap-6">
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

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-24">
            <div className="md:col-span-5 rounded-3xl overflow-hidden md:-rotate-2">
              <Image
                src="/images/about-me.jpg"
                alt="Sarthak Shrivastava"
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
            </div>
          </div>
        </Reveal>

        <div className="mb-24">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
              {"// Professional Journey"}
            </h2>
          </Reveal>
          <StaggerGroup className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <ListCard title="Current Roles" items={currentRoles} />
            </StaggerItem>
            <StaggerItem>
              <ListCard title="Core Expertise" items={coreExpertise} />
            </StaggerItem>
          </StaggerGroup>
        </div>

        <div className="mb-24">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
              {"// Achievements"}
            </h2>
          </Reveal>
          <StaggerGroup className="grid md:grid-cols-2 gap-8 mb-8">
            <StaggerItem>
              <ListCard title="Recognition" items={recognition} />
            </StaggerItem>
            <StaggerItem>
              <div className="border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors">
                <h3 className="font-display italic text-2xl mb-6">Community Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-3xl sm:text-4xl text-accent">
                        {s.value}
                      </div>
                      <div className="text-xs text-muted mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>

        <Reveal>
          <div className="border border-line rounded-3xl p-10 sm:p-14">
            <h2 className="font-display italic text-4xl mb-6">Current Focus</h2>
            <p className="text-ink/70 mb-8 max-w-2xl leading-relaxed">
              I&apos;m currently exploring and creating content about AI
              technologies, including OpenAI&apos;s developments and LLMs. My
              mission is to make technology education accessible while staying at
              the forefront of innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href="mailto:hello@sarthaksavvy.com"
                className="bg-ink text-paper px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-accent transition-colors inline-flex"
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                href="https://youtube.com/@sarthaksavvy"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase hover:border-ink transition-colors inline-flex"
              >
                Watch My Content
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AboutPage;
