import { monogramIcon } from "../../lib/monogramIcon";

// Referenced by app/manifest.js. The manifest's `icons` array needs a real
// bitmap at 192x192 — the size Android's "Add to Home Screen" and a
// Lighthouse PWA installability audit both look for — which the SVG favicon
// alone does not satisfy on every platform.
export const dynamic = "force-static";

export function GET() {
  return monogramIcon(192);
}
