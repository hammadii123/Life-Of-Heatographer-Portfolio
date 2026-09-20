import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import { posts, postBySlug } from "@/content/journal";
import { photoBySlug } from "@/content/photos";
import { site, absolute, whatsappLink } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/journal/${post.slug}` },
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absolute(`/journal/${post.slug}`),
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: post.frames[0] ? [{ url: `/gallery/${post.frames[0]}.jpg` }] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  /* Frames are dealt into the article as the headings go past, so the piece
     is illustrated by the work it is describing rather than by stock. */
  const headingIndexes = post.body
    .map((b, i) => ("h" in b ? i : -1))
    .filter((i) => i >= 0)
    .filter((_, n) => n > 0 && n % 4 === 0)
    .slice(0, post.frames.length);

  return (
    <article style={{ ["--accent" as string]: post.accent } as React.CSSProperties}>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        ]}
      />

      <PageHeader
        accent={post.accent}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: post.title },
        ]}
        urdu={post.urdu}
        title={post.title}
        lead={post.description}
        meta={`${new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })} · ${post.readMinutes} min read · ${site.person}`}
      />

      <section className="section section--tight">
        <div className="shell">
          <div className="article">
            {post.body.map((block, i) => {
              const frameSlot = headingIndexes.indexOf(i);
              const frameSlug = frameSlot >= 0 ? post.frames[frameSlot] : undefined;
              const framePhoto = frameSlug ? photoBySlug(frameSlug) : undefined;

              return (
                <div key={i}>
                  {framePhoto && (
                    <Link
                      href={`/work/${framePhoto.slug}`}
                      data-cursor="frame"
                      data-cursor-label={framePhoto.urduTitle}
                    >
                      <Frame
                        slug={framePhoto.slug}
                        alt={framePhoto.alt}
                        ratio={framePhoto.ratio}
                        accent={framePhoto.accent}
                        title={framePhoto.title}
                        sizes="(max-width: 760px) 92vw, 44rem"
                        drift
                      />
                    </Link>
                  )}

                  {"h" in block && (
                    <h2 data-reveal="rise">{block.h}</h2>
                  )}
                  {"p" in block && (
                    <p data-reveal="soft">{block.p}</p>
                  )}
                  {"quote" in block && (
                    <blockquote data-reveal="soft">{block.quote}</blockquote>
                  )}
                  {"list" in block && (
                    <ul role="list" data-reveal="soft">
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" data-tone="deep">
        <div className="shell shell--narrow endnote">
          <p className="urdu endnote__urdu" data-reveal="ink">
            کوئی سوال ہو تو پوچھ لیجیے۔
          </p>
          <h2 className="display endnote__title" data-reveal="rise">
            Got a question this did not answer? Ask me.
          </h2>
          <div className="endnote__acts" data-reveal="soft">
            <a
              className="btn"
              href={whatsappLink("Hi Hammad — I read your journal and had a question.")}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              WhatsApp {site.contact.phoneLocal}
            </a>
            <Link className="btn" data-ghost href="/journal" data-cursor="link">
              More notes
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
