"use client";

import HorizontalScroller from "./HorizontalScroller";

// The home page's band of event and podcast photos. Card markup is the
// scroller's own default — picture, title, then where it was — so this is
// only the band the strip sits in: full-bleed, ruled top and bottom, in the
// slot the job-title marquee used to hold.
export default function MediaStrip({ items }) {
  if (!items?.length) return null;

  return (
    <HorizontalScroller
      items={items}
      className="border-y border-line py-8"
      trackClassName="px-6 sm:px-10"
    />
  );
}
