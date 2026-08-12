import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import { pageMetadata } from "./seo";

export const metadata = pageMetadata({
  title: "Sarthak Shrivastava - Sarthaksavvy",
  description: "Sarthak Shrivastava's personal website",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
    </>
  );
}
