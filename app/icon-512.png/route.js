import { monogramIcon } from "../../lib/monogramIcon";

// Referenced by app/manifest.js. 512x512 is the larger of the two sizes a
// Lighthouse PWA installability audit expects a manifest icon set to cover,
// used for splash screens and higher-density home-screen icons.
export const dynamic = "force-static";

export function GET() {
  return monogramIcon(512);
}
