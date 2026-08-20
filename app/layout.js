import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingControls from "./components/FloatingControls";
import EntryGate from "./components/EntryGate";
import MotionProvider from "./components/motion/MotionProvider";
import { SITE_URL } from "./routes";
import { SITE_NAME, ogImages, twitterCard } from "./seo";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Site-wide fallback. Routes that set their own metadata override these; the
// point here is that a route which forgets to still shares with a working
// card instead of a bare link. No canonical is set at this level — it would be
// inherited by every page that does not declare one and point them all at "/".
// Separate from `metadata` per the App Router's viewport export: `themeColor`
// tints the mobile browser chrome (status bar, task switcher) to match the
// site's own paper background instead of the browser's default white or grey.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F3EC",
};

export const metadata = {
  title: "Sarthak Shrivastava - Sarthaksavvy",
  description: "Sarthak Shrivastava's personal website",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    title: "Sarthak Shrivastava - Sarthaksavvy",
    description: "Sarthak Shrivastava's personal website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [ogImages.portrait],
  },
  twitter: {
    card: twitterCard(ogImages.portrait),
    title: "Sarthak Shrivastava - Sarthaksavvy",
    description: "Sarthak Shrivastava's personal website",
    images: [ogImages.portrait.url],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body className="grain">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MN3X8W00H5"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MN3X8W00H5');
          `}
        </Script>
        {/* Wraps everything, including the header, the footer and the entry
            overlay, so a visitor with "Reduce motion" turned on gets a still
            site rather than one where only the page body settled down. */}
        <MotionProvider>
          <EntryGate />
          <div className="min-h-screen bg-paper text-ink w-full overflow-x-hidden">
            {/* Header, footer and the two floating controls sit outside the
                main landmark on purpose: everything in here is repeated on
                every route, so a screen reader or keyboard visitor needs a way
                past it that is not seven Tab presses. The link is invisible
                until it is focused, at which point it is the first thing in
                the tab order. */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-5 focus:py-3 focus:rounded-full focus:bg-ink focus:text-paper focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper"
            >
              Skip to content
            </a>
            <Header />
            {/* The landmark lives here rather than in each page so no route can
                ship without one — before this only the home page had a <main>,
                which left every other page with no content landmark at all.
                tabIndex makes it a valid destination for the skip link: without
                it the browser moves the viewport but leaves focus behind, and
                the next Tab returns to the top of the header. */}
            <main id="main-content" tabIndex={-1} className="focus:outline-none">
              {children}
            </main>
            <Footer />
            <FloatingControls />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
