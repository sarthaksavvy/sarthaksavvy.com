import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  ExternalLink,
  PieChart,
  Scan,
  Smartphone,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { ogImages, pageMetadata } from "../../seo";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  personSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "../../structuredData";
import { projectByPath } from "../../content/projects";

const SITE = "https://apps.apple.com/us/app/expensorr/id6739472004";

// The QR sources are 1000x1000 but land in a 192px box with 16px of padding
// on each side. Declaring the size they are actually drawn at is what lets
// next/image ship a thumbnail instead of the full-resolution original.
const QR_RENDERED_SIZE = 160;

const DESCRIPTION =
  "Expensorr is a simple yet powerful expense tracking application that helps you monitor and manage your personal finances with ease.";

export const metadata = pageMetadata({
  title: "Expensorr - Expense Tracking App | Sarthak Shrivastava",
  description: DESCRIPTION,
  path: "/side-projects/expensorr",
  image: ogImages.expensorr,
});

// The same record the index page and the /side-projects/expensorr.md mirror
// render from, so the product is described identically wherever it appears.
const project = projectByPath("/side-projects/expensorr");

const structuredData = graph(
  personSchema(),
  organizationSchema(),
  webPageSchema({
    path: "/side-projects/expensorr",
    name: "Expensorr — expense tracking for iOS and Android",
    description: DESCRIPTION,
    primaryImage: project.image,
  }),
  softwareApplicationSchema({
    name: "Expensorr",
    description: DESCRIPTION,
    url: SITE,
    path: "/side-projects/expensorr",
    image: ogImages.expensorr.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS",
    features: project.features,
  }),
  breadcrumbSchema([
    { name: "Side Projects", path: "/side-projects" },
    { name: "Expensorr", path: "/side-projects/expensorr" },
  ])
);

export default function ExpensorrProject() {
  const features = [
    {
      icon: <Scan size={24} className="text-accent" />,
      title: "Receipt Scanning",
      description:
        "Quickly scan and digitize your receipts. The app automatically extracts important information like date, amount, and merchant to save you time.",
    },
    {
      icon: <Smartphone size={24} className="text-accent" />,
      title: "Multi-platform Sync",
      description:
        "Access your expense data seamlessly across multiple devices with real-time synchronization, ensuring your financial information is always up to date.",
    },
    {
      icon: <PieChart size={24} className="text-accent" />,
      title: "Budget Analytics",
      description:
        "Visualize your spending patterns with intuitive charts and graphs. Identify trends and gain insights to make better financial decisions.",
    },
    {
      icon: <CreditCard size={24} className="text-accent" />,
      title: "Multi-currency Support",
      description:
        "Track expenses in different currencies, perfect for travelers or those who manage finances across multiple countries.",
    },
  ];

  const testimonials = [
    {
      text: "This app has completely changed how I manage my finances. The receipt scanning feature is a game-changer!",
      author: "John D.",
      rating: 5,
    },
    {
      text: "I've tried many expense trackers, but Expensorr stands out with its intuitive interface and powerful analytics.",
      author: "Sarah M.",
      rating: 5,
    },
    {
      text: "The multi-currency support is perfect for my business trips. Highly recommended for frequent travelers.",
      author: "Michael T.",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink py-16 px-6">
      <JsonLd data={structuredData} />
      <div className="container mx-auto max-w-6xl">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/side-projects"
            className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Side Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h1 className="font-display text-5xl md:text-6xl mb-6">Expensorr</h1>
            <p className="text-xl text-ink/70 mb-8">
              A simple yet powerful expense tracking application that helps you
              monitor and manage your personal finances with ease. Take control
              of your spending habits and budget effectively.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
              >
                Download on iOS
                <ExternalLink size={18} />
              </a>
              <a
                href="#download"
                className="inline-flex items-center gap-2 bg-transparent border border-ink/20 text-ink px-6 py-3 rounded-full font-medium hover:bg-line/60 transition-colors"
              >
                Get App
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          {/* The "Get App" button above links here, so this panel owns the
              #download target. */}
          <div
            id="download"
            className="relative h-80 scroll-mt-24 rounded-3xl overflow-hidden shadow-xl bg-paper border border-line p-6"
          >
            <div className="grid grid-cols-2 h-full gap-4">
              {/* iOS QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-48 w-48 mb-3 bg-white p-4 rounded-xl">
                  <Image
                    src="/images/projects/qr/expensorr-ios.jpg"
                    alt="QR code linking to Expensorr on the App Store"
                    width={QR_RENDERED_SIZE}
                    height={QR_RENDERED_SIZE}
                    className="object-contain h-full w-full"
                  />
                </div>
                <p className="text-center font-medium">iOS Download</p>
              </div>

              {/* Android QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-48 w-48 mb-3 bg-white p-4 rounded-xl">
                  <Image
                    src="/images/projects/qr/expensorr-android.jpg"
                    alt="QR code linking to Expensorr on Google Play"
                    width={QR_RENDERED_SIZE}
                    height={QR_RENDERED_SIZE}
                    className="object-contain h-full w-full"
                  />
                </div>
                <p className="text-center font-medium">Android Download</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-6 text-accent">
            Project Overview
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <p className="text-ink/70 mb-6">
              Expensorr was created to solve the common challenge of tracking
              and managing personal expenses in a simple yet effective way.
              Traditional methods like spreadsheets can be cumbersome, while
              many existing apps are either too complex or lack important
              features.
            </p>
            <p className="text-ink/70">
              I designed Expensorr with a focus on user experience, making it
              intuitive enough for anyone to use while providing powerful
              features for those who want deeper insights into their spending
              habits. The app combines simplicity with functionality, helping
              users take control of their finances without feeling overwhelmed.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-ink/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Screenshots */}
        {/* <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            App Screenshots
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <ClientImage
                  src="/images/projects/expensorr-screen1.jpg"
                  alt="Expensorr Dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  fallbackText="Screenshot Preview"
                />
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <ClientImage
                  src="/images/projects/expensorr-screen2.jpg"
                  alt="Expense Analytics"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  fallbackText="Screenshot Preview"
                />
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <ClientImage
                  src="/images/projects/expensorr-screen3.jpg"
                  alt="Receipt Scanner"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  fallbackText="Screenshot Preview"
                />
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-800">
                <ClientImage
                  src="/images/projects/expensorr-screen4.jpg"
                  alt="Budget Planning"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  fallbackText="Screenshot Preview"
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-8 text-accent">
            User Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-paper border border-line rounded-3xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < testimonial.rating
                          ? "text-accent fill-[#FF5A1F]"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <p className="text-ink/70 mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-20">
          <h2 className="font-display italic text-3xl mb-6 text-accent">
            Technologies Used
          </h2>
          <div className="bg-paper border border-line rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Flutter</p>
                <p className="text-sm text-muted">
                  Android and IOS Development
                </p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Firebase</p>
                <p className="text-sm text-muted">Backend & Database</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Cloud Functions</p>
                <p className="text-sm text-muted">Data Processing</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Figma</p>
                <p className="text-sm text-muted">UI/UX Design</p>
              </div>
              <div className="text-center p-4 bg-line/40 rounded-xl">
                <p className="font-semibold">Fastlane</p>
                <p className="text-sm text-muted">Deployment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-paper border border-line rounded-3xl p-8 mb-12 shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to take control of your finances?
          </h3>
          <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
            Download Expensorr today and start tracking your expenses
            efficiently. Available on iOS and Android.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-paper px-8 py-3 rounded-full font-medium hover:bg-accent transition-colors inline-flex items-center gap-2"
            >
              Download Now
              <ExternalLink size={20} />
            </a>
            <Link
              href="/side-projects"
              className="bg-transparent border border-ink/20 text-ink px-8 py-3 rounded-full font-medium hover:bg-line/60 transition-colors inline-flex items-center gap-2"
            >
              View Other Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
