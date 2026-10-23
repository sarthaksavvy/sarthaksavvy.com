import trainingEvents from "../trainings.json";

// trainings.json is oldest-first, which is how it is easiest to append to. Every
// reader wants newest-first, so the flip happens once here.
export const eventsNewestFirst = [...trainingEvents].reverse();

export function eventPath(event) {
  return `/training/${event.slug}`;
}

export function eventBySlug(slug) {
  return trainingEvents.find((event) => event.slug === slug);
}

/** The talk after this one and the one before it, either of which may not exist. */
export function neighbours(event) {
  const i = eventsNewestFirst.findIndex((e) => e.id === event.id);
  return { newer: eventsNewestFirst[i - 1] ?? null, older: eventsNewestFirst[i + 1] ?? null };
}
