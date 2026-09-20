import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import { chapters } from "@/content/chapters";
import { photosInChapter } from "@/content/photos";
import { site, absolute } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: "Chapters — One City, Five Ways of Looking at It",
  description:
    "The work in five chapters: Faces, Rain, Strays, Light & Dust, and Home. Street and documentary photography from Karachi by Hammad Mustafa.",
  alternates: { canonical: "/chapters" },
  openGraph: { url: absolute("/chapters") },
};

export default function ChaptersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Chapters", path: "/chapters" },
        ])}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Chapters" }]}
        urdu="ایک شہر، دیکھنے کے پانچ طریقے۔"
        title={"One city,\nfive ways of\nlooking at it"}
        lead={`Karachi is too big to photograph as one thing. So the work is sorted the way I actually think about it — by what I was looking for that day.`}
      />

      <section className="section section--tight">
        <div className="shell">
          {chapters.map((c, i) => {
            const frames = photosInChapter(c.id);
            return (
              <article
                className="chapterCard"
                key={c.id}
                style={{ ["--accent" as string]: c.accent }}
              >
                <div data-reveal="rise">
                  <p className="mono chapterCard__no">
                    Chapter {String(i + 1).padStart(2, "0")} · {frames.length}{" "}
                    {frames.length === 1 ? "frame" : "frames"}
                  </p>
                  <p className="urdu chapterCard__urdu">{c.urdu}</p>
                  <h2 className="display chapterCard__title">{c.title}</h2>
                  <p className="mono chapterCard__kicker">{c.kicker}</p>
                  <p className="chapterCard__blurb">{c.blurb}</p>
                  <p className="chapterCard__go">
                    <Link href={`/chapters/${c.slug}`} className="link-arrow" data-cursor="link">
                      Read {c.roman}
                    </Link>
                  </p>
                </div>

                <ul className="strip" role="list" data-reveal="soft">
                  {frames.slice(0, 6).map((p, j) => (
                    <li className="strip__item" key={p.slug}>
                      <Link
                        href={`/work/${p.slug}`}
                        data-cursor="frame"
                        data-cursor-label={p.urduTitle}
                      >
                        <Frame
                          slug={p.slug}
                          alt={p.alt}
                          ratio={p.ratio}
                          accent={p.accent}
                          title={p.title}
                          sizes="(max-width: 700px) 40vw, 230px"
                          delay={j * 70}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" data-tone="deep">
        <div className="shell shell--narrow endnote">
          <p className="urdu endnote__urdu" data-reveal="ink">
            ہر باب ایک ہی سوال کا جواب ہے۔
          </p>
          <h2 className="display endnote__title" data-reveal="rise">
            Every chapter is the same question asked in a different part of the city.
          </h2>
          <p className="lead" data-reveal="soft">
            Who is here, what are they carrying, and why has nobody stopped to look at them?
          </p>
          <div className="endnote__acts" data-reveal="soft">
            <Link className="btn" href="/work" data-cursor="link">
              See every frame
            </Link>
            <Link className="btn" data-ghost href="/about" data-cursor="link">
              About {site.person.split(" ")[0]}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
