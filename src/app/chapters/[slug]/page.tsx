import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import { chapters, chapterById } from "@/content/chapters";
import type { ChapterId } from "@/content/chapters";
import { photosInChapter } from "@/content/photos";
import { absolute } from "@/lib/site";
import { chapterJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) return {};

  return {
    title: chapter.seoTitle,
    description: chapter.seoDescription,
    alternates: { canonical: `/chapters/${chapter.slug}` },
    openGraph: {
      title: chapter.seoTitle,
      description: chapter.seoDescription,
      url: absolute(`/chapters/${chapter.slug}`),
    },
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exists = chapters.some((c) => c.slug === slug);
  if (!exists) notFound();

  const chapter = chapterById(slug as ChapterId);
  const frames = photosInChapter(chapter.id);
  const index = chapters.findIndex((c) => c.id === chapter.id);
  const nextChapter = chapters[(index + 1) % chapters.length];

  return (
    <>
      <JsonLd
        data={[
          chapterJsonLd(chapter, frames),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Chapters", path: "/chapters" },
            { name: chapter.title, path: `/chapters/${chapter.slug}` },
          ]),
        ]}
      />

      <PageHeader
        accent={chapter.accent}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Chapters", href: "/chapters" },
          { label: chapter.title },
        ]}
        urdu={chapter.urdu}
        title={chapter.title}
        lead={chapter.kicker}
        meta={`${frames.length} ${frames.length === 1 ? "frame" : "frames"} · ${chapter.roman}`}
      />

      <section
        className="section section--tight"
        style={{ ["--accent" as string]: chapter.accent } as React.CSSProperties}
      >
        <div className="shell">
          <div className="chapterEssay prose">
            {chapter.essay.map((para, i) => (
              <p key={i} data-reveal="soft" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--tight"
        style={{ ["--accent" as string]: chapter.accent } as React.CSSProperties}
      >
        <div className="shell">
          <div className="plates">
            {frames.map((p, i) => (
              <article
                className="plate"
                key={p.slug}
                style={{ ["--accent" as string]: p.accent }}
              >
                <div className="plate__frame">
                  <Link
                    href={`/work/${p.slug}`}
                    className="lift"
                    style={{ display: "block" }}
                    data-cursor="frame"
                    data-cursor-label={p.urduTitle}
                  >
                    <Frame
                      slug={p.slug}
                      alt={p.alt}
                      ratio={p.ratio}
                      accent={p.accent}
                      title={p.title}
                      sizes="(max-width: 900px) 92vw, 54vw"
                      priority={i === 0}
                      drift
                    />
                  </Link>
                </div>

                <div className="plate__words">
                  <p className="mono">{String(i + 1).padStart(2, "0")}</p>
                  <p className="urdu plate__urdu" data-reveal="ink">
                    {p.urdu.split("\n")[0]}
                  </p>
                  <h2 className="display plate__title" data-reveal="rise">
                    <Link href={`/work/${p.slug}`} data-cursor="link">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="plate__excerpt" data-reveal="soft">
                    {p.story[0]}
                  </p>
                  <p className="plate__go" data-reveal="soft">
                    <Link href={`/work/${p.slug}`} className="link-arrow" data-cursor="link">
                      Read the story
                    </Link>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        data-tone="deep"
        style={{ ["--accent" as string]: nextChapter.accent } as React.CSSProperties}
      >
        <div className="shell shell--narrow endnote">
          <p className="mono" data-reveal="soft">
            Next chapter
          </p>
          <p className="urdu endnote__urdu" data-reveal="ink">
            {nextChapter.urdu}
          </p>
          <h2 className="display endnote__title" data-reveal="rise">
            {nextChapter.title}
          </h2>
          <p className="lead" data-reveal="soft">
            {nextChapter.blurb}
          </p>
          <div className="endnote__acts" data-reveal="soft">
            <Link className="btn" href={`/chapters/${nextChapter.slug}`} data-cursor="link">
              Read {nextChapter.roman}
            </Link>
            <Link className="btn" data-ghost href="/chapters" data-cursor="link">
              All chapters
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
