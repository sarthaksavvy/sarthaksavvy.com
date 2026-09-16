const VIDEO_PATTERN = /\.(mp4|mpg|mov|webm)$/i;

export function isVideo(src) {
  return VIDEO_PATTERN.test(src);
}

// Silent previews (thumbnails, scroller covers) never play, so they lean on a
// poster frame that sits next to the video — "clip.mp4" → "clip-poster.jpg" —
// and skip downloading the video itself until the lightbox asks for it.
export function posterFor(src) {
  return src.replace(VIDEO_PATTERN, "-poster.jpg");
}
