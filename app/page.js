import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import { getSubscriberCount } from "../lib/youtube";

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

export default async function Home() {
  const subscribers = await getSubscriberCount();
  return (
    <>
      <Hero subscribers={subscribers} />
      <Marquee />
    </>
  );
}
