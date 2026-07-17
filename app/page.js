import Hero from "./components/Hero";
import Marquee from "./components/Marquee";

export const metadata = {
  title: "Sarthak Shrivastava - Sarthaksavvy",
  description: "Sarthak Shrivastava's personal website",
  alternates: {
    canonical: "https://sarthaksavvy.com",
  },
  openGraph: {
    title: "Sarthak Shrivastava - Sarthaksavvy",
    description: "Sarthak Shrivastava's personal website",
    url: "https://sarthaksavvy.com",
    siteName: "Sarthak Shrivastava - Sarthaksavvy",
    images: "/sarthak.jpg",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
    </>
  );
}
