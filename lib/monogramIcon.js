import { ImageResponse } from "next/og";

// The same mark and colours as `app/icon.svg` and `app/apple-icon.js`,
// redrawn at whatever size a caller needs. Shared here because the manifest
// needs PNG icons at specific sizes (192 and 512) that the SVG favicon and
// the single-size apple-touch-icon do not cover, and a Lighthouse PWA
// installability audit checks for exactly those two.
export function monogramIcon(size) {
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
          fontSize: Math.round(size * 0.56),
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        S
      </div>
    ),
    { width: size, height: size }
  );
}
