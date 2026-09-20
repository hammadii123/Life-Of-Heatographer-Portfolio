import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Instrument_Sans, JetBrains_Mono, Noto_Nastaliq_Urdu } from "next/font/google";
import { site } from "@/lib/site";
import { personJsonLd, siteJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/ui/JsonLd";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import Reveal from "@/components/chrome/Reveal";
import Viewfinder from "@/components/chrome/Viewfinder";
import Sound from "@/components/chrome/Sound";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

/* Nastaliq is a heavy face and it is genuinely part of the brand, so it is
   loaded properly rather than faked with a fallback serif. */
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-nastaliq",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.person} — Street Photographer in Karachi`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  publisher: site.person,
  keywords: [
    "street photographer in Karachi",
    "photographer in Karachi",
    "Karachi street photography",
    "documentary photographer Pakistan",
    "portrait photographer Karachi",
    "candid photographer Karachi",
    "photographer near me Karachi",
    "photography services Karachi",
    "humans of Karachi",
    "Hammad Mustafa photographer",
    "heartographer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.person} — Street Photographer in Karachi`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1113",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${nastaliq.variable}`}
    >
      <body>
        <JsonLd data={[siteJsonLd(), personJsonLd()]} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Reveal />
        <Viewfinder />
        <Sound />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
