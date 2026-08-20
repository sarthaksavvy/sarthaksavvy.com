import { SITE_URL } from "./routes";

export const SITE_NAME = "Sarthak Shrivastava";

// Share previews are easy to get subtly wrong: the image has to resolve from
// the site root, the canonical has to match the sitemap entry, and Twitter
// needs its own tags because it does not read the OpenGraph ones. Building all
// of that from one place keeps every route consistent and makes a broken image
// path a one-line fix instead of an eight-file one.

// Every image below lives in /public/images. Dimensions are the real ones, so
// crawlers can lay the card out before the file finishes downloading.
export const ogImages = {
  portrait: {
    url: "/images/sarthak.jpg",
    width: 1200,
    height: 1247,
    alt: "Sarthak Shrivastava",
  },
  podcast: {
    url: "/images/laravel-india-podcast.jpg",
    width: 1200,
    height: 1200,
    alt: "Laravel India Podcast cover art",
  },
  audiobolo: {
    url: "/images/projects/audiobolo.png",
    width: 1200,
    height: 630,
    alt: "AudioBolo, an AI voice-to-text app for macOS",
  },
  backstageCut: {
    url: "/images/projects/backstage-cut.png",
    width: 1200,
    height: 630,
    alt: "Backstage Cut, an AI extension for Premiere Pro",
  },
  expensorr: {
    url: "/images/projects/expensorr.png",
    width: 1200,
    height: 630,
    alt: "Expensorr, an expense tracking app",
  },
  ginger: {
    url: "/images/projects/ginger.jpg",
    width: 400,
    height: 400,
    alt: "Ginger, a LinkedIn AI assistant Chrome extension",
  },
  mezohub: {
    url: "/images/projects/mezohub.jpg",
    width: 1563,
    height: 1563,
    alt: "Mezohub, a backend deployment platform",
  },
};

// X renders `summary_large_image` in a fixed 1.91:1 frame and centre-crops
// whatever it is given to fit. A square or portrait photo declared as a large
// card therefore arrives as a horizontal band sliced out of the middle of it —
// a face with the top of the head and the chin cut off. The compact `summary`
// card scales the same image into a 1:1 thumbnail with nothing cropped, so the
// choice is about the image's shape, not its size: only genuinely wide artwork
// survives the large card intact.
const WIDE_CARD_MIN_RATIO = 1.5;

export function twitterCard(image) {
  return image.width / image.height >= WIDE_CARD_MIN_RATIO
    ? "summary_large_image"
    : "summary";
}

export function canonicalUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/**
 * Builds the canonical, OpenGraph and Twitter metadata for a route.
 * `path` must match the route registered in routes.js so the canonical URL
 * and the sitemap entry never drift apart.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  image = ogImages.portrait,
  type = "website",
}) {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: twitterCard(image),
      title,
      description,
      images: [image.url],
    },
  };
}
