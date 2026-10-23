import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import trainingEvents from "../../../trainings.json";
import { eventBySlug } from "../../../content/trainingEvents";
import { isVideo, posterFor } from "../../../../lib/media";

// A 1200x630 card per event, drawn at build time. The raw event photos are
// 2-4MB camera files in every aspect ratio: WhatsApp drops previews over
// roughly 300KB, and X centre-crops anything that is not 1.91:1. Rendering one
// small JPEG per event fixes both, and puts the title on the card so the
// preview says what the talk was before anyone opens the link.

export const dynamic = "force-static";
const WIDTH = 1200;
const HEIGHT = 630;
const WIDE_ENOUGH = 1.4;

export function generateStaticParams() {
  return trainingEvents.map((event) => ({ slug: event.slug }));
}

async function loadPhoto(src) {
  const file = path.join(process.cwd(), "public", isVideo(src) ? posterFor(src) : src);
  return readFile(file);
}

// The first photo that survives a landscape crop. A portrait flyer cropped to
// 1.91:1 is a slice of someone's torso, so it is passed over; if every image is
// portrait the card falls back to type alone.
async function pickPhoto(event) {
  for (const src of event.images ?? []) {
    try {
      const buffer = await loadPhoto(src);
      const { width, height } = await sharp(buffer).metadata();
      if (width / height >= WIDE_ENOUGH) {
        const jpeg = await sharp(buffer)
          .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
          .jpeg({ quality: 72 })
          .toBuffer();
        return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
      }
    } catch {
      // A missing file should cost the card its photo, not the build.
    }
  }
  return null;
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return new Response("Not found", { status: 404 });

  const photo = await pickPhoto(event);
  const title = event.title.trim();

  const png = await new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#171410",
          color: "#F6F3EC",
          fontFamily: "sans-serif",
        }}
      >
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} width={WIDTH} height={HEIGHT} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background: photo
              ? "linear-gradient(180deg, rgba(23,20,16,0.7) 0%, rgba(23,20,16,0.45) 30%, rgba(23,20,16,0.6) 55%, rgba(23,20,16,0.95) 100%)"
              : "#171410",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 56,
            top: 56,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#FF5A1F" }}>
            Talk · {event.date}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: title.length > 50 ? 56 : 68, fontWeight: 700, lineHeight: 1.08 }}>
              {title}
            </div>
            <div style={{ display: "flex", fontSize: 30, marginTop: 20, color: "#E4DFD2" }}>
              {event.conference} · {event.location}
            </div>
            <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#FF5A1F" }}>
              Sarthak Shrivastava · sarthaksavvy.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  ).arrayBuffer();

  // ImageResponse only emits PNG, which for a photo is over a megabyte.
  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 76, mozjpeg: true }).toBuffer();
  return new Response(jpeg, {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
