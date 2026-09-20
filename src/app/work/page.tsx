import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/work/GalleryGrid";
import JsonLd from "@/components/ui/JsonLd";
import { photos } from "@/content/photos";
import { site, absolute } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: "The Work — Street Photography from Karachi",
  description: `Every frame ${site.person} has published, with the story behind it. Street portraits, monsoon, strays and markets, photographed across Karachi.`,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `The Work — Street Photography from Karachi`,
    description: `Every frame ${site.person} has published, with the story behind it.`,
    url: absolute("/work"),
  },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "The Work — Street Photography from Karachi",
            url: absolute("/work"),
            description: site.description,
            author: { "@id": absolute("/#person") },
            associatedMedia: photos.map((p) => ({
              "@type": "ImageObject",
              contentUrl: absolute(`/gallery/${p.slug}.jpg`),
              name: p.title,
              description: p.alt,
              creditText: site.person,
            })),
          },
        ]}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        urdu="ہر تصویر کے پیچھے ایک وجہ ہے۔"
        title={"Every frame,\nand why it exists"}
        lead="Nothing here is decoration. Each photograph carries the reason it was taken — where I was standing, what I was waiting for, and what happened afterwards. Filter by chapter, or read it straight through."
      />

      <section className="section section--tight">
        <div className="shell">
          <GalleryGrid photos={photos} />
        </div>
      </section>

      <section className="section" data-tone="deep">
        <div className="shell shell--narrow endnote">
          <p className="urdu endnote__urdu" data-reveal="ink">
            یہ صرف شروعات ہے۔
          </p>
          <h2 className="display endnote__title" data-reveal="rise">
            This is the published work. There is a great deal more on the street.
          </h2>
          <p className="lead" data-reveal="soft">
            If you want your own day photographed like this — honestly, without anybody being asked
            to perform — that is what the hire page is for.
          </p>
          <div className="endnote__acts" data-reveal="soft">
            <Link className="btn" href="/hire" data-cursor="link">
              Rates &amp; what a shoot involves
            </Link>
            <Link className="btn" data-ghost href="/chapters" data-cursor="link">
              Read it as chapters
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
