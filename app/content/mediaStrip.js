import trainingEvents from "../trainings.json";
import { PODCAST_GUESTS } from "./podcastGuests";
import { isVideo, posterFor } from "../../lib/media";

// Every photo the site holds of Sarthak actually doing the work — each shot
// from each training event, plus every podcast guest — as one flat list for
// the home page strip. The home page had a marquee of job titles in this
// slot, which is a claim; this is the evidence for it.
//
// Both halves derive from the records the /training and /podcasts pages
// already render, so adding an event or a guest there puts it here too with
// nothing else to update.

const eventsNewestFirst = [...trainingEvents]
  // Newest first, matching the order the training page lists events in, so
  // the strip opens on recent work rather than on 2018.
  .reverse()
  .map((event) =>
    event.images.map((src) => ({
      // A clip shows its poster frame here — the strip never plays anything,
      // and the poster is a real file next to the video.
      src: isVideo(src) ? posterFor(src) : src,
      href: "/training",
      kind: "training",
      label: event.title.trim(),
      sublabel: event.conference,
    }))
  );

// One photo from each event, then each event's second photo, and so on.
// Laid out event by event instead, the five shots of one talk would sit
// together under five copies of the same caption; this way neighbouring
// cards are always different events, and the strip still opens on the most
// recent one.
const eventPhotos = [];
for (let round = 0; ; round += 1) {
  const pass = eventsNewestFirst
    .map((photos) => photos[round])
    .filter(Boolean);
  if (!pass.length) break;
  eventPhotos.push(...pass);
}

const guestPhotos = PODCAST_GUESTS.map((guest) => ({
  src: guest.photo,
  href: "/podcasts",
  kind: "podcast",
  label: guest.name,
  sublabel: guest.role,
}));

// Guests spread evenly through the event photos instead of sitting in a block
// at one end: there are far fewer of them, and a visitor who only ever sees
// the first screen of the strip should still meet one. Spacing is computed,
// not random, so the server and the client agree on the order.
function interleave(many, few) {
  if (!few.length) return many;

  const gap = many.length / few.length;
  const out = [];
  let next = 0;

  many.forEach((item, i) => {
    out.push(item);
    if (next < few.length && i + 1 >= Math.round((next + 1) * gap)) {
      out.push(few[next]);
      next += 1;
    }
  });

  return [...out, ...few.slice(next)];
}

// Cards that open the strip, in this order, by caption. Each pulls the first
// matching card forward (for an event, its first photo) and the rest of the
// strip keeps its interleaved order behind them.
const PINNED_FIRST = [
  "Taylor Otwell",
  "Mastering the Learning",
  "Deploy Laravel with Docker",
  "Building AI Agents using CAgent",
];

function pinFirst(items, labels) {
  const rest = [...items];
  const pinned = [];
  for (const label of labels) {
    const i = rest.findIndex((item) => item.label === label);
    if (i !== -1) pinned.push(...rest.splice(i, 1));
  }
  return [...pinned, ...rest];
}

export const MEDIA_STRIP = pinFirst(
  interleave(eventPhotos, guestPhotos),
  PINNED_FIRST
);
