"use client";

import HorizontalScroller from "./HorizontalScroller";
import CredentialCard from "./content/CredentialCard";

// The home page's recognition and certifications, on the same self-scrolling
// strip as the photos, podcasts and products, at a compact card size. Each card
// still links out to its verification page; a drag across the strip does not.
export default function CredentialsScroller({ credentials }) {
  if (!credentials?.length) return null;

  return (
    <HorizontalScroller
      // Listed twice before the scroller doubles it again: three cards at this
      // size are narrower than the widest strip, and a single set would show a
      // gap at the loop's seam. Only the first set is reachable by keyboard.
      items={[...credentials, ...credentials]}
      className="-mx-6 sm:-mx-10 py-2"
      trackClassName="px-6 sm:px-10"
      renderItem={(credential, { hidden, index, wasDragging }) => (
        <CredentialCard
          key={`${credential.name}-${index}`}
          credential={credential}
          compact
          hidden={hidden || index >= credentials.length}
          onLinkClick={(e) => {
            if (wasDragging()) e.preventDefault();
          }}
          className="w-64 sm:w-80 flex-shrink-0 select-none"
        />
      )}
    />
  );
}
