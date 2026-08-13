import { Clock } from "lucide-react";
import Image from "next/image";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import TiltCard from "../components/motion/TiltCard";
import JsonLd from "../components/JsonLd";
import { canonicalUrl, ogImages, pageMetadata } from "../seo";
import { breadcrumbSchema, graph, personSchema } from "../structuredData";

export const metadata = pageMetadata({
  title: "Laravel India Podcast — Hosted by Sarthak Shrivastava",
  description:
    "Conversations with the worldwide Laravel community — including Taylor Otwell, James Brooks and Freek Van der Herten — hosted by AI consultant and Bitfumes founder Sarthak Shrivastava.",
  path: "/podcasts",
  image: ogImages.podcast,
});

const platforms = [
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/in/podcast/laravel-india-podcast/id1528388091",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/3XuNgni6Q0yLMmgLnoRoib",
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@laravelindiapodcast",
  },
];

// `sameAs` is what ties this page to the show as Apple, Spotify and YouTube
// already know it, so the three listings and this page are understood as one
// podcast rather than four unrelated URLs.
const structuredData = graph(
  {
    "@type": "PodcastSeries",
    name: "Laravel India Podcast",
    url: canonicalUrl("/podcasts"),
    description:
      "Conversations with guests from the worldwide Laravel community, " +
      "including Taylor Otwell, James Brooks and Freek Van der Herten.",
    image: canonicalUrl(ogImages.podcast.url),
    inLanguage: "en",
    author: personSchema(),
    sameAs: platforms.map((platform) => platform.href),
  },
  breadcrumbSchema([{ name: "Podcasts", path: "/podcasts" }])
);

export default function Podcasts() {
  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              My <span className="italic text-accent">Podcast.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 flex items-end">
            <p className="text-lg text-ink/70">
              Exploring web development through conversations with industry
              experts and deep dives into modern technologies.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <TiltCard className="border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl overflow-hidden md:rotate-1">
                <Image
                  src="/images/laravel-india-podcast.jpg"
                  alt="Latest episode cover"
                  className="object-cover w-full h-auto"
                  width={400}
                  height={400}
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-display italic text-4xl">
                  Laravel India Podcast
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Laravel India Podcast is a podcast that has guest from Laravel
                  Community from worldwide including peoples like Taylor Otwell
                  (Laravel CEO), James Brooks (Laravel Core Team Member), Freek
                  Van der Herten (Spatie Laravel Developer), and many more.
                </p>
                <div className="flex gap-4 text-sm text-muted font-mono">
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    Episodes: 12+
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {platforms.map((p) => (
                    <MagneticButton
                      key={p.label}
                      href={p.href}
                      target="_blank"
                      className="bg-ink text-paper hover:bg-accent transition-colors px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase inline-flex"
                    >
                      {p.label}
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
