import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import { photos, photoBySlug, neighbours } from "@/content/photos";
import { chapterById } from "@/content/chapters";
import { site, absolute, whatsappLink } from "@/lib/site";
import { photoJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/story.css";

export function generateStaticParams() {
  return photos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) return {};

  const title = `${photo.title} — ${photo.place}`;
  const description = `${photo.caption} A street photograph from ${photo.place} by ${site.person}, with the story behind the frame.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${photo.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: absolute(`/work/${photo.slug}`),
      images: [{ url: `/gallery/${photo.slug}.jpg`, alt: photo.alt }],
      publishedTime: photo.date,
    },
    twitter: { card: "summary_large_image", title, description },
    keywords: photo.tags,
  };
}

export default async function PhotoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) notFound();

  const chapter = chapterById(photo.chapter);
  const { prev, next } = neighbours(photo.slug);

  return (
    <article
      className="story"
      style={{ ["--accent" as string]: photo.accent } as React.CSSProperties}
    >
      <JsonLd
        data={[
          photoJsonLd(photo),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: photo.title, path: `/work/${photo.slug}` },
          ]),
        ]}
      />

      <div className="shell story__shell">
        {/* ---------- the photograph, held while the story scrolls ---------- */}
        <div className="story__stage">
          <div className="story__sticky">
            <Frame
              slug={photo.slug}
              alt={photo.alt}
              ratio={photo.ratio}
              accent={photo.accent}
              title={photo.title}
              sizes="(max-width: 900px) 92vw, 48vw"
              priority
              develop={false}
              cursorLabel={photo.urduTitle}
              className="story__frame"
            />
            <p className="mono story__made">{photo.howItWasMade}</p>
          </div>
        </div>

        {/* ---------- the words ---------- */}
        <div className="story__text">
          <nav className="crumbs mono" aria-label="Breadcrumb">
            <Link href="/" data-cursor="link">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/work" data-cursor="link">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/chapters/${chapter.slug}`} data-cursor="link">
              {chapter.title}
            </Link>
          </nav>

          <p className="urdu story__urduTitle" data-reveal="ink">
            {photo.urduTitle}
          </p>

          <h1 className="display story__title" data-reveal="rise">
            {photo.title}
          </h1>

          <p className="urdu story__urduLine" data-reveal="ink" style={{ ["--reveal-delay" as string]: "140ms" }}>
            {photo.urdu}
          </p>

          <p className="story__caption" data-reveal="soft" style={{ ["--reveal-delay" as string]: "220ms" }}>
            {photo.caption}
          </p>

          <hr className="rule" data-reveal="draw" />

          <div className="prose story__body">
            {photo.story.map((para, i) => (
              <p key={i} data-reveal="soft" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                {para}
              </p>
            ))}
          </div>

          {photo.note && (
            <p className="story__note mono" data-reveal="soft">
              {photo.note}
            </p>
          )}

          <dl className="story__facts" data-reveal="soft">
            <div>
              <dt className="mono">Where</dt>
              <dd>{photo.place}</dd>
            </div>
            <div>
              <dt className="mono">When</dt>
              <dd>
                <time dateTime={photo.date}>{photo.when}</time>
              </dd>
            </div>
            <div>
              <dt className="mono">Chapter</dt>
              <dd>
                <Link href={`/chapters/${chapter.slug}`} className="wipe" data-cursor="link">
                  {chapter.title} · {chapter.urdu}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="mono">Made with</dt>
              <dd>{site.gear.split(".")[0]}</dd>
            </div>
          </dl>

          <ul className="story__tags" role="list" data-reveal="soft">
            {photo.tags.map((t) => (
              <li key={t} className="mono">
                {t}
              </li>
            ))}
          </ul>

          <div className="story__acts" data-reveal="soft">
            {photo.instagram && (
              <a
                className="btn"
                data-ghost
                href={photo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                See the original post
              </a>
            )}
            <a
              className="btn"
              href={whatsappLink(`Hi Hammad — I was looking at "${photo.title}" on your site.`)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              Talk about a shoot
            </a>
          </div>
        </div>
      </div>

      {/* ---------- move through the sequence ---------- */}
      <nav className="pager" aria-label="More frames">
        {prev && (
          <Link
            href={`/work/${prev.slug}`}
            className="pager__side"
            data-dir="prev"
            style={{ ["--accent" as string]: prev.accent }}
            data-cursor="frame"
            data-cursor-label={prev.urduTitle}
          >
            <span className="mono pager__dir">Previous frame</span>
            <span className="urdu pager__urdu">{prev.urduTitle}</span>
            <span className="display pager__title">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="pager__side"
            data-dir="next"
            style={{ ["--accent" as string]: next.accent }}
            data-cursor="frame"
            data-cursor-label={next.urduTitle}
          >
            <span className="mono pager__dir">Next frame</span>
            <span className="urdu pager__urdu">{next.urduTitle}</span>
            <span className="display pager__title">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
