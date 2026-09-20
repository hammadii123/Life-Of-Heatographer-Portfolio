import { site, absolute } from "./site";
import type { Photo } from "@/content/photos";
import type { Chapter } from "@/content/chapters";

/**
 * Structured data. Google reads these to decide what this site *is* — a real
 * person, in a real city, who offers a real service, with real images.
 * Every @id is stable so the graph links together across pages.
 */

const PERSON_ID = absolute("/#person");
const SITE_ID = absolute("/#website");
const BUSINESS_ID = absolute("/#business");

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.person,
    alternateName: site.name,
    url: site.url,
    jobTitle: site.role,
    description: site.description,
    knowsLanguage: ["ur", "en"],
    nationality: { "@type": "Country", name: site.location.country },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phoneIntl,
    sameAs: [site.social.instagram, site.social.instagramAlt, site.social.threads],
  };
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "en-PK",
    description: site.description,
    publisher: { "@id": PERSON_ID },
  };
}

/** The one that wins "photographer in Karachi" and "near me" queries. */
export function businessJsonLd(services: { name: string; description: string }[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: `${site.person} — ${site.role}`,
    image: absolute("/opengraph-image"),
    url: absolute("/hire"),
    description: site.description,
    founder: { "@id": PERSON_ID },
    priceRange: "$$",
    telephone: site.contact.phoneIntl,
    email: `mailto:${site.contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    areaServed: site.areas.map((a) => ({
      "@type": "Place",
      name: `${a}, ${site.location.city}`,
    })),
    serviceType: [
      "Street photography",
      "Portrait photography",
      "Event photography",
      "Documentary photography",
      "Brand and product photography",
    ],
    sameAs: [site.social.instagram],
    hasOfferCatalog: services.length
      ? {
          "@type": "OfferCatalog",
          name: "Photography services in Karachi",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              areaServed: site.location.city,
              provider: { "@id": PERSON_ID },
            },
          })),
        }
      : undefined,
  };
}

/** Per-photograph. This is what puts individual frames into Google Images. */
export function photoJsonLd(photo: Photo) {
  return {
    "@context": "https://schema.org",
    "@type": "Photograph",
    "@id": absolute(`/work/${photo.slug}#photo`),
    name: photo.title,
    alternateName: photo.urduTitle,
    description: photo.alt,
    url: absolute(`/work/${photo.slug}`),
    image: {
      "@type": "ImageObject",
      contentUrl: absolute(`/gallery/${photo.slug}.jpg`),
      caption: photo.caption,
      description: photo.alt,
      creditText: site.person,
      creator: { "@id": PERSON_ID },
      copyrightNotice: `© ${site.person}`,
      license: absolute("/license"),
      acquireLicensePage: absolute("/hire"),
    },
    dateCreated: photo.date,
    datePublished: photo.date,
    creator: { "@id": PERSON_ID },
    copyrightHolder: { "@id": PERSON_ID },
    contentLocation: {
      "@type": "Place",
      name: photo.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressCountry: site.location.countryCode,
      },
    },
    keywords: photo.tags.join(", "),
    isPartOf: { "@id": SITE_ID },
  };
}

export function chapterJsonLd(chapter: Chapter, items: Photo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": absolute(`/chapters/${chapter.slug}#gallery`),
    name: chapter.seoTitle,
    description: chapter.seoDescription,
    url: absolute(`/chapters/${chapter.slug}`),
    author: { "@id": PERSON_ID },
    inLanguage: "en-PK",
    associatedMedia: items.map((p) => ({
      "@type": "ImageObject",
      contentUrl: absolute(`/gallery/${p.slug}.jpg`),
      name: p.title,
      description: p.alt,
      creditText: site.person,
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absolute(t.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: absolute(`/journal/${post.slug}`),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: "en-PK",
    mainEntityOfPage: absolute(`/journal/${post.slug}`),
  };
}
