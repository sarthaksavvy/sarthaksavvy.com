import { Clock } from "lucide-react";
import Image from "next/image";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import TiltCard from "../components/motion/TiltCard";
import AnswerBlock from "../components/content/AnswerBlock";
import FaqSection from "../components/content/FaqSection";
import SectionHeading from "../components/content/SectionHeading";
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
import { getSubscriberCount } from "../../lib/youtube";

const DESCRIPTION =
  "Conversations with the Laravel community — including Taylor Otwell, " +
  "James Brooks and Freek Van der Herten — hosted by AI consultant Sarthak " +
  "Shrivastava.";

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

// Everyone named on the page, as records rather than as a clause in a
// sentence. The same three feed the PodcastSeries `actor` list below.
const guests = [
  { name: "Taylor Otwell", role: "Creator of Laravel" },
  { name: "James Brooks", role: "Laravel core team member" },
  { name: "Freek Van der Herten", role: "Laravel developer at Spatie" },
];

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
      "including Taylor Otwell, James Brooks and Freek Van der Herten.",
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

        {/* The show's own description is inside a card, phrased for someone
            already looking at it. This is the version that survives being
            quoted: it names the host, the guests and where to listen. */}
        <Reveal>
          <AnswerBlock className="mb-16">
            <p>
              The Laravel India Podcast is hosted by Sarthak Shrivastava and
              features guests from the worldwide Laravel community, including
              Taylor Otwell (creator of Laravel), James Brooks (Laravel core
              team) and Freek Van der Herten (Spatie). There are 12 or more
              episodes, available on Apple Podcasts, Spotify and YouTube.
            </p>
          </AnswerBlock>
        </Reveal>

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
                      rel="noopener noreferrer"
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

        {/* The guests were a clause inside one sentence. As named entries they
            are three more things this page can be found by — someone searching
            "Taylor Otwell podcast" is looking for exactly this episode list,
            and a clause buried in a paragraph is not what gets matched. */}
        <div className="mt-24">
          <Reveal>
            <SectionHeading>Guests</SectionHeading>
          </Reveal>
          <Reveal>
            <dl className="grid md:grid-cols-3 gap-8 mb-24">
              {guests.map((guest) => (
                <div
                  key={guest.name}
                  className="border border-line rounded-3xl p-8 bg-paper"
                >
                  <dt className="font-display italic text-2xl mb-3">
                    {guest.name}
                  </dt>
                  <dd className="text-ink/70 leading-relaxed">{guest.role}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <FaqSection faqs={faqs} id="podcast-faq" />
        </div>
      </div>
    </div>
  );
}
