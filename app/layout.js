import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChatWidget from "./components/FloatingChatWidget";
import EntryGate from "./components/EntryGate";
import ResetIntroButton from "./components/ResetIntroButton";
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

export const metadata = {
  title: "Sarthak Shrivastava - Sarthaksavvy",
  description: "Sarthak Shrivastava's personal website",
  metadataBase: new URL("https://sarthaksavvy.com"),
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
