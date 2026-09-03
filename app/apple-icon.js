import { ImageResponse } from "next/og";

// `app/icon.svg` already gives the browser tab its monogram via Next's file
// convention, but iOS Safari does not read that: "Add to Home Screen" only
// looks for an `apple-touch-icon` link, and without one it falls back to a
// screenshot of whatever was on screen — usually a crop of body text, not the
// site's mark. This file is the same convention for that icon: Next renders
// it once at build time and wires up the `<link rel="apple-touch-icon">`
// automatically, no manual tag needed.
//
// Same mark and colours as `app/icon.svg`, redrawn at PNG size and without
// its own corner rounding — iOS applies its own mask on top of whatever
// square it's given, so a pre-rounded source only fights that mask.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 100,
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
