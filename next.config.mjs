// Baseline response headers the app never set on its own. None of these
// depend on how a page is rendered, so applying them to every route is safe:
// there is no framing, no cross-origin embedding and no use of camera/mic/
// geolocation anywhere on the site for these to interfere with.
const securityHeaders = [
  // Stops a browser from guessing a response's MIME type from its content,
  // which is how a misconfigured upload or an old browser can be tricked
  // into executing something served as plain text or an image.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // The site is never meant to render inside someone else's <iframe> — this
  // closes off clickjacking, where a transparent frame of the real page is
  // laid over a decoy to hijack clicks.
  { key: "X-Frame-Options", value: "DENY" },
  // Full referrer only ever goes to the site's own pages; other origins get
  // just the scheme+host, not the full path (which could leak a query like
  // an /ask question) or downgrade to plain HTTP.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Explicitly denies the sensor/media APIs the site has no use for, so an
  // injected or compromised third-party script embedded in the future
  // cannot request them.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Forces HTTPS on repeat visits for a year, so a stale bookmark or typed
  // "http://" cannot be downgraded to an insecure connection.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
