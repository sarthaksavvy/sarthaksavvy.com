import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import JsonLd from "./components/JsonLd";
import { pageMetadata } from "./seo";
import { graph, personSchema, websiteSchema } from "./structuredData";

export const metadata = pageMetadata({
  title: "Sarthak Shrivastava - Sarthaksavvy",
  description: "Sarthak Shrivastava's personal website",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={graph(personSchema(), websiteSchema())} />
      <Hero />
      <Marquee />
    </>
  );
}
