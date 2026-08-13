import { SITE_URL } from "./routes";
import { SITE_NAME, canonicalUrl } from "./seo";

// Schema.org descriptions of the site. Search engines read the pages fine on
// their own; what they cannot infer is the *shape* of the thing they are
// reading — that "Sarthak Shrivastava" is a person who consults on AI rather
// than a company, that the podcast page is a show with episodes on Spotify,
// that a project page describes an application. Saying so explicitly is what
// makes a knowledge panel, a podcast result or a sitelink possible.
//
// Every fact below is already stated somewhere the visitor can read it. If a
// claim is not on the site, it does not belong here either.

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const socialProfiles = [
  "https://linkedin.com/in/sarthaksavvy",
  "https://github.com/sarthaksavvy",
  "https://x.com/sarthaksavvy",
  "https://instagram.com/sarthaksavvy",
  "https://youtube.com/bitfumes",
];

/**
 * The Person every other schema on the site points back at. Cross-page `@id`
 * references are not resolved by crawlers, so this is emitted in full wherever
 * it is needed rather than linked to.
 */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    alternateName: "sarthaksavvy",
    jobTitle: ["AI Consultant", "Founder", "Software Engineer"],
    description:
      "India-based founder, content creator, developer and AI consultant — " +
      "passionate about building products and automating daily work.",
    url: SITE_URL,
    image: canonicalUrl("/images/sarthak.jpg"),
    email: "mailto:hello@sarthaksavvy.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    worksFor: [
      {
        "@type": "Organization",
        name: "Bitfumes",
        url: "https://bitfumes.com",
      },
      {
        "@type": "Organization",
        name: "Pfizer",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Large Language Models",
      "AI Automation",
      "Laravel",
      "JavaScript",
      "Python",
      "AWS",
      "Docker",
      "DevOps",
      "Full-stack Development",
    ],
    award: "Docker Captain",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Solutions Architect",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Developer",
      },
    ],
    sameAs: socialProfiles,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

/**
 * Wraps one or more nodes in the `@graph` envelope so a page emits a single
 * script tag instead of one per node.
 */
export function graph(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat(),
  };
}

/**
 * Breadcrumbs let a result show "sarthaksavvy.com › Side Projects › AudioBolo"
 * instead of a bare URL. `trail` is ordered from the root down; the home crumb
 * is added here so no caller has to remember it.
 */
export function breadcrumbSchema(trail) {
  const crumbs = [{ name: "Home", path: "/" }, ...trail];

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: canonicalUrl(path),
    })),
  };
}

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * "September 24, 2024" -> "2024-09-24". Schema.org wants ISO 8601 and the
 * events file stores the human form, so the two are reconciled here rather
 * than by duplicating every date in the data. Returns null on anything this
 * does not recognise, which drops the event from the markup instead of
 * publishing a date a crawler will reject.
 */
export function isoDate(humanDate) {
  const match = /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/.exec(
    String(humanDate).trim()
  );
  if (!match) return null;

  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month === -1) return null;

  return `${match[3]}-${String(month + 1).padStart(2, "0")}-${match[2].padStart(
    2,
    "0"
  )}`;
}

/**
 * The talks on the speaking page, described as events with a performer, so a
 * conference listing and this page can be recognised as the same appearance.
 */
export function speakingEventsSchema(events) {
  const person = personSchema();

  const items = events
    .map((event) => {
      const startDate = isoDate(event.date);
      if (!startDate) return null;

      return {
        "@type": "Event",
        name: event.title.trim(),
        description: event.description,
        startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.conference,
          address: event.location,
        },
        ...(event.images?.length
          ? { image: canonicalUrl(event.images[0]) }
          : {}),
        performer: person,
      };
    })
    .filter(Boolean);

  return {
    "@type": "ItemList",
    name: "Talks by Sarthak Shrivastava",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item,
    })),
  };
}

/**
 * The consulting practice as a thing that can be hired, which is not something
 * a `Person` node can express: `Person` says who Sarthak is, `ProfessionalService`
 * says what is on offer and who provides it. Without it, a page about AI
 * consulting reads to a crawler as prose about a person rather than as a
 * service with an area of practice.
 *
 * `services` are the same four areas the page lists, so the markup and the
 * visible copy cannot drift.
 */
export function professionalServiceSchema({
  path,
  name,
  description,
  services,
}) {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#ai-consulting`,
    name,
    description,
    url: canonicalUrl(path),
    image: canonicalUrl("/images/sarthak.jpg"),
    provider: personSchema(),
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    serviceType: services.map((service) => service.title),
    knowsAbout: [
      "AI Consulting",
      "Large Language Models",
      "LLM Integration",
      "AI Automation",
      "Prompt Engineering",
      "AI Product Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: services.map(({ title, summary }) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: title,
          description: summary,
          provider: { "@id": PERSON_ID },
        },
      })),
    },
  };
}

/**
 * Questions a visitor asks before they book a call. Google can show these
 * directly under the result, which is worth more on a page whose whole job is
 * to answer "can this person do the thing I need". `answer` is plain text on
 * purpose: it has to be the same string the page renders, or the markup is
 * describing a page that does not exist.
 */
export function faqSchema(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/**
 * A project page describes a piece of software, not an article about one.
 * `url` is the product's own site — the page itself is already the canonical
 * `mainEntityOfPage`.
 */
export function softwareApplicationSchema({
  name,
  description,
  url,
  path,
  image,
  applicationCategory,
  operatingSystem,
}) {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image: canonicalUrl(image),
    applicationCategory,
    ...(operatingSystem ? { operatingSystem } : {}),
    mainEntityOfPage: canonicalUrl(path),
    author: personSchema(),
  };
}
