const CHANNEL_URL = "https://www.youtube.com/@sarthaksavvy";
const FALLBACK_SUBSCRIBERS = "134K+";

function formatSubscribers(rawText) {
  // rawText looks like "134K subscribers" or "1.2M subscribers"
  const match = rawText.match(/^([\d.,]+[KM]?)\s*subscribers?/i);
  if (!match) return null;
  return `${match[1].toUpperCase()}+`;
}

export async function getSubscriberCount() {
  try {
    const res = await fetch(CHANNEL_URL, {
      headers: { "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      console.warn(
        `[youtube] channel page fetch failed with status ${res.status}, using fallback ${FALLBACK_SUBSCRIBERS}`
      );
      return FALLBACK_SUBSCRIBERS;
    }

    const html = await res.text();
    const match =
      html.match(/"subscriberCountText":\{"simpleText":"([^"]+)"\}/) ||
      html.match(/"content":"([\d.,]+[KM]?\s*subscribers?)"/);
    if (!match) {
      console.warn(
        `[youtube] could not find subscriber count in channel page HTML (YouTube may have changed its markup), using fallback ${FALLBACK_SUBSCRIBERS}`
      );
      return FALLBACK_SUBSCRIBERS;
    }

    const formatted = formatSubscribers(match[1]);
    if (!formatted) {
      console.warn(
        `[youtube] found subscriber text "${match[1]}" but failed to parse it, using fallback ${FALLBACK_SUBSCRIBERS}`
      );
      return FALLBACK_SUBSCRIBERS;
    }

    return formatted;
  } catch (error) {
    console.warn(
      `[youtube] error fetching subscriber count, using fallback ${FALLBACK_SUBSCRIBERS}:`,
      error.message
    );
    return FALLBACK_SUBSCRIBERS;
  }
}
