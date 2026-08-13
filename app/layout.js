import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChatWidget from "./components/FloatingChatWidget";
import EntryGate from "./components/EntryGate";
import ResetIntroButton from "./components/ResetIntroButton";
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
        <EntryGate />
        <div className="min-h-screen bg-paper text-ink w-full overflow-x-hidden">
          <Header />
          {children}
          <Footer />
          <FloatingChatWidget />
          <ResetIntroButton />
        </div>
      </body>
    </html>
  );
}
