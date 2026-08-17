import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import JsonLd from "./components/JsonLd";
import { pageMetadata } from "./seo";
import { graph, personSchema, websiteSchema } from "./structuredData";

export const metadata = pageMetadata({
  title: "Sarthak Shrivastava — AI Consultant & Founder of Bitfumes",
  description:
    "AI consultant helping teams ship LLM features and AI automation. Founder of Bitfumes, Docker Captain, AWS certified, and teacher of 100K+ students.",
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
