import { SITE_URL, SITE_UPDATED, updatedFor } from "./routes";
import { SITE_NAME, canonicalUrl } from "./seo";
import {
  CREDENTIALS,
  DEFINITION,
  EMAIL,
  EXPERTISE,
  HANDLE,
  LOCATION,
  SAME_AS,
  SUMMARY,
} from "./content/profile";

// Schema.org descriptions of the site. Search engines read the pages fine on
// their own; what they cannot infer is the *shape* of the thing they are
// reading — that "Sarthak Shrivastava" is a person who consults on AI rather
// than a company, that the podcast page is a show with episodes on Spotify,
// that a project page describes an application. Saying so explicitly is what
// makes a knowledge panel, a podcast result or a sitelink possible.
//
// Answer engines use the same markup for a different job. A model asked "who
// is Sarthak Shrivastava" is choosing between a dozen sources, and the one it
// can parse without inference is the one it quotes. `@id` references inside a
// single `@graph` are what turn eleven separate pages into one entity it can
// be confident about, rather than eleven pages that happen to share a name.
//
// Every fact below is already stated somewhere the visitor can read it. If a
// claim is not on the site, it does not belong here either.

export const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BITFUMES_ID = `${SITE_URL}/#bitfumes`;

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
    alternateName: [HANDLE, "Sarthak"],
    // `disambiguatingDescription` is the field a knowledge graph reads when it
    // has two entities with the same name and has to pick one. It wants the
    // single sentence that could only be this person.
    disambiguatingDescription: DEFINITION,
    jobTitle: ["AI Consultant", "Founder", "Software Engineer"],
    description: SUMMARY,
    url: SITE_URL,
    mainEntityOfPage: canonicalUrl("/about-me"),
    image: {
      "@type": "ImageObject",
      url: canonicalUrl("/images/sarthak.jpg"),
      width: 1200,
      height: 1247,
      caption: SITE_NAME,
    },
    email: `mailto:${EMAIL}`,
    nationality: { "@type": "Country", name: LOCATION.country },
    address: {
      "@type": "PostalAddress",
      addressCountry: LOCATION.countryCode,
    },
    workLocation: {
      "@type": "Place",
      name: `${LOCATION.country} (remote worldwide)`,
    },
    knowsLanguage: ["en", "hi"],
    worksFor: [
      { "@id": BITFUMES_ID },
      {
        "@type": "Organization",
        name: "Pfizer",
      },
    ],
    founder: { "@id": BITFUMES_ID },
    knowsAbout: EXPERTISE,
    award: CREDENTIALS.map((credential) => credential.name),
    hasCredential: CREDENTIALS.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.name,
      description: credential.detail,
      ...(credential.year ? { dateCreated: credential.year } : {}),
    })),
    sameAs: SAME_AS,
  };
}

/**
 * Bitfumes as an organisation in its own right. Without it, "founder of
 * Bitfumes" is a string inside a Person node and Bitfumes is not an entity a
 * model can attach anything to — including the YouTube channel and the courses,
 * which are the two things most likely to be asked about.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": BITFUMES_ID,
    name: "Bitfumes",
    url: "https://bitfumes.com",
    description:
      "Developer education company and YouTube channel teaching Laravel, " +
      "Docker, AWS, JavaScript and AI to software engineers.",
    founder: { "@id": PERSON_ID },
    sameAs: [
      "https://bitfumes.com",
      "https://youtube.com/bitfumes",
      "https://courses.sarthaksavvy.com/",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: "sarthaksavvy.com",
    description: DEFINITION,
    url: SITE_URL,
    inLanguage: "en",
    dateModified: SITE_UPDATED,
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    // The /ask box on this site answers questions about Sarthak from the site's
    // own content. Declaring it as the site's search action is what lets an
    // assistant — or a sitelinks searchbox — hand a question straight to it.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/ask?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
 * The `WebPage` node every route should carry. It is the node that says when
 * the page last changed, which entity it is about, and which part of it is
 * worth reading aloud — three things a page cannot state any other way.
 *
 * `speakable` matters more than it looks: it is the only standard way to point
 * a voice assistant at the part of a page that answers the question, rather
 * than letting it read the navigation.
 */
export function webPageSchema({
  path,
  name,
  description,
  primaryImage,
  breadcrumb = true,
}) {
  const url = canonicalUrl(path);

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    dateModified: updatedFor(path),
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: canonicalUrl(primaryImage),
          },
        }
      : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

/**
 * Breadcrumbs let a result show "sarthaksavvy.com › Side Projects › AudioBolo"
 * instead of a bare URL. `trail` is ordered from the root down; the home crumb
 * is added here so no caller has to remember it.
 */
export function breadcrumbSchema(trail) {
  const crumbs = [{ name: "Home", path: "/" }, ...trail];
  const last = trail.at(-1);

  return {
    "@type": "BreadcrumbList",
    ...(last ? { "@id": `${canonicalUrl(last.path)}#breadcrumb` } : {}),
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
  const items = events
    .map((event) => {
      const startDate = isoDate(event.date);
      if (!startDate) return null;

      return {
        "@type": "Event",
        name: event.title.trim(),
        description: event.description,
        startDate,
        endDate: startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.conference,
          address: event.location,
        },
        organizer: {
          "@type": "Organization",
          name: event.conference,
        },
        ...(event.images?.length
          ? { image: canonicalUrl(event.images[0]) }
          : {}),
        performer: { "@id": PERSON_ID },
      };
    })
    .filter(Boolean);

  return {
    "@type": "ItemList",
    name: "Talks by Sarthak Shrivastava",
    numberOfItems: items.length,
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
    provider: { "@id": PERSON_ID },
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressCountry: LOCATION.countryCode,
    },
    // The service is delivered remotely, so the area it serves is not the
    // country it is based in — without this, a local-intent query in another
    // country has no reason to surface it.
    areaServed: { "@type": "Place", name: "Worldwide" },
    availableLanguage: ["English", "Hindi"],
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
          serviceType: title,
          provider: { "@id": PERSON_ID },
          areaServed: { "@type": "Place", name: "Worldwide" },
        },
      })),
    },
  };
}

/**
 * Questions a visitor asks before they book a call. Google can show these
 * directly under the result, and an answer engine looking for a short,
 * attributable answer to a question will take a `Question`/`acceptedAnswer`
 * pair over a paragraph it has to summarise itself. `answer` is plain text on
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
  features,
}) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl(path)}#software`,
    name,
    description,
    url,
    image: canonicalUrl(image),
    applicationCategory,
    ...(operatingSystem ? { operatingSystem } : {}),
    ...(features?.length ? { featureList: features } : {}),
    mainEntityOfPage: canonicalUrl(path),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/**
 * The five projects as an ordered list of applications rather than an ordered
 * list of links. A crawler reading the link version learns that five pages
 * exist; reading this one it learns what each of them is, which is the
 * difference between being listed and being recommended.
 */
export function projectListSchema(projects) {
  return {
    "@type": "ItemList",
    name: "Side projects by Sarthak Shrivastava",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: softwareApplicationSchema({
        name: project.name,
        description: project.summary,
        url: project.link,
        path: project.projectLink,
        image: project.image,
        applicationCategory: project.category,
        operatingSystem: project.platform,
        features: project.features,
      }),
    })),
  };
}
