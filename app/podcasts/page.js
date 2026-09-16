import { Clock } from "lucide-react";
import Image from "next/image";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import TiltCard from "../components/motion/TiltCard";
import PodcastScroller from "../components/PodcastScroller";
import FaqSection from "../components/content/FaqSection";
import SectionHeading from "../components/content/SectionHeading";
import BigCount from "../components/content/BigCount";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { canonicalUrl, ogImages, pageMetadata } from "../seo";
import {
  PERSON_ID,
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  personSchema,
  webPageSchema,
} from "../structuredData";
import { faqGroup } from "../content/faqs";
import { PODCAST_GUESTS as guests } from "../content/podcastGuests";
import { getSubscriberCount } from "../../lib/youtube";

const DESCRIPTION =
  "Conversations with the Laravel community — including Taylor Otwell, " +
  "James Brooks, Freek Van der Herten and Nuno Maduro — hosted by AI " +
  "consultant Sarthak Shrivastava.";

export const metadata = pageMetadata({
  title: "Laravel India Podcast — Hosted by Sarthak Shrivastava",
  description: DESCRIPTION,
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

// "A (x), B (y) and C (z)" — the phrasing the podcast card's paragraph needs.
function guestSentence(list) {
  return list
    .map(({ name, role }) => `${name} (${role})`)
    .reduce((sentence, entry, i, arr) => {
      if (i === 0) return entry;
      const sep = i === arr.length - 1 ? " and " : ", ";
      return `${sentence}${sep}${entry}`;
    }, "");
}

// The same trail feeds the BreadcrumbList markup and the visible
// breadcrumb nav below, so the two cannot drift apart.
const BREADCRUMB_TRAIL = [{ name: "Podcasts", path: "/podcasts" }];

// `sameAs` is what ties this page to the show as Apple, Spotify and YouTube
// already know it, so the three listings and this page are understood as one
// podcast rather than four unrelated URLs.
function buildStructuredData(faqs) {
  return graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/podcasts",
    name: "Laravel India Podcast, hosted by Sarthak Shrivastava",
    description: DESCRIPTION,
    primaryImage: ogImages.podcast.url,
  }),
  {
    "@type": "PodcastSeries",
    "@id": `${canonicalUrl("/podcasts")}#podcast`,
    name: "Laravel India Podcast",
    url: canonicalUrl("/podcasts"),
    description:
      "Conversations with guests from the worldwide Laravel community, " +
      "including Taylor Otwell, James Brooks, Freek Van der Herten and " +
      "Nuno Maduro.",
    image: canonicalUrl(ogImages.podcast.url),
    inLanguage: "en",
    // Named guests are entities in their own right. A crawler that can only
    // read "including Taylor Otwell" as prose learns nothing it can act on;
    // as `actor` nodes, the show becomes findable from the guest's name.
    actor: guests.map((guest) => ({
      "@type": "Person",
      name: guest.name,
      description: guest.role,
    })),
    author: { "@id": PERSON_ID },
    producer: { "@id": PERSON_ID },
    sameAs: platforms.map((platform) => platform.href),
  },
  faqSchema(faqs),
  breadcrumbSchema(BREADCRUMB_TRAIL)
  );
}

export default async function Podcasts() {
  const subscribers = await getSubscriberCount();
  const faqs = faqGroup("podcast", subscribers).faqs;
  const structuredData = buildStructuredData(faqs);

  return (
    <div className="py-10 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="max-w-[1400px] mx-auto">
        <Breadcrumbs trail={BREADCRUMB_TRAIL} />
        <div className="mb-6 md:mb-20 grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-8">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6">
              My <span className="italic text-accentText">Podcast.</span>
            </h1>
            <BigCount value={guests.length} label="Podcast episodes" className="md:hidden" />
          </Reveal>
          <Reveal delay={0.1} className="hidden md:flex md:col-span-4 flex-col items-end justify-end gap-6">
            <BigCount value={guests.length} label="Podcast episodes" className="justify-end" />
            <p className="text-lg text-ink/70">
              Exploring web development through conversations with industry
              experts and deep dives into modern technologies.
            </p>
          </Reveal>
        </div>

        {/* The guests were a clause inside one sentence. As named entries they
            are three more things this page can be found by — someone searching
            "Taylor Otwell podcast" is looking for exactly this episode list,
            and a clause buried in a paragraph is not what gets matched. */}
        <div className="mb-16">
          <Reveal>
            <SectionHeading>Guests</SectionHeading>
          </Reveal>
          <Reveal>
            <p className="text-sm text-muted font-mono uppercase tracking-widest mb-6">
              Tap a face to watch the episode
            </p>
          </Reveal>
          <Reveal>
            <PodcastScroller guests={guests} />
          </Reveal>
          {/* Same copy as the desktop intro column, shown here instead on
              mobile so the scroller isn't pushed below the fold by it. */}
          <p className="md:hidden text-lg text-ink/70 mt-8">
            Exploring web development through conversations with industry
            experts and deep dives into modern technologies.
          </p>
        </div>

        <Reveal>
          <TiltCard className="border border-line rounded-3xl p-8 hover:border-ink/40 transition-colors">
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-8 items-center">
              <div className="rounded-2xl overflow-hidden sm:rotate-1 w-36 sm:w-full mx-auto">
                <Image
                  src="/images/laravel-india-podcast.jpg"
                  alt="Latest episode cover"
                  className="object-cover w-full h-auto"
                  width={220}
                  height={220}
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-display italic text-3xl">
                  Laravel India Podcast
                </h2>
                <p className="text-ink/70 leading-relaxed">
                  Laravel India Podcast is a podcast with guests from the
                  Laravel community worldwide, including{" "}
                  {guestSentence(guests)}, and many more.
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
                      rel="noopener noreferrer"
                      className="bg-ink text-paper hover:bg-accent hover:text-ink transition-colors px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase inline-flex"
                    >
                      {p.label}
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="mt-24">
          <FaqSection faqs={faqs} id="podcast-faq" />
        </div>
      </div>
    </div>
  );
}
