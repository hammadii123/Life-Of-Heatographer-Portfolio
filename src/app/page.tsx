import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import { Aperture, Quiet, Sheet, Marquee } from "@/components/home/Pieces";
import { photos, photoBySlug, featuredPhotos } from "@/content/photos";
import { chapters } from "@/content/chapters";
import { site, whatsappLink } from "@/lib/site";
import { businessJsonLd } from "@/lib/jsonld";
import "@/styles/sections.css";

export const metadata: Metadata = {
  title: `${site.person} — Street Photographer in Karachi`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const stopped = photoBySlug("ummeed-wali-aankhen")!;
  const captured = photoBySlug("unki-hansi")!;
  const quiet = photoBySlug("barish-mein-safar")!;

  const crowd = photos.filter((p) => p.slug !== stopped.slug && p.slug !== captured.slug);
  const stories = featuredPhotos().filter((p) => p.slug !== captured.slug).slice(0, 4);

  /* His own words, used as texture. Longest lines first would make the
     marquee lopsided, so they run in publication order. */
  const lines = photos
    .map((p) => p.urdu.split("\n")[0].trim())
    .filter((l, i, all) => l.length > 0 && all.indexOf(l) === i)
    .slice(0, 10);

  return (
    <>
      <JsonLd data={businessJsonLd()} />

      <Hero crowd={crowd} stopped={stopped} captured={captured} />

      {/* ---------------- what the name means ---------------- */}
      <section className="section meaning" data-tone="deep">
        <div className="shell">
          <p className="mono" data-reveal="soft">
            The name
          </p>

          <h2 className="meaning__word display" data-reveal="rise">
            heart
            <Aperture />
            grapher
          </h2>

          <div className="meaning__split">
            <p className="urdu meaning__urdu" data-reveal="ink">
              دل جہاں رکتا ہے، کیمرہ وہیں دیکھتا ہے۔
            </p>

            <div className="prose meaning__prose">
              <p data-reveal="soft">
                Not <em>one who takes pictures</em>. One who photographs with the heart.
              </p>
              <p data-reveal="soft" style={{ ["--reveal-delay" as string]: "80ms" }}>
                Karachi has twenty million people in it and almost no portraits of them. A man sells
                cloth on the same square metre of footpath for eleven years, is seen by four thousand
                people a day, and is looked at by none of them.
              </p>
              <p data-reveal="soft" style={{ ["--reveal-delay" as string]: "160ms" }}>
                I am not a better photographer than anyone else with a phone. I am just the one who
                stops. That is the entire craft: being willing to stand still on a street where
                standing still is strange, and to be looked at oddly for it, because something is
                happening and everybody else has somewhere to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- one photograph, and silence ---------------- */}
      <Quiet photo={quiet} />

      {/* ---------------- chapters ---------------- */}
      <section className="section chapters" id="chapters">
        <div className="shell">
          <header className="head" data-reveal="soft" data-exit>
            <p className="mono">The work, in five chapters</p>
            <h2 className="display head__title">
              One city, <em>five ways of looking at it</em>
            </h2>
          </header>

          <ol className="chapters__list" role="list">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <Link
                  href={`/chapters/${c.slug}`}
                  className="chapter"
                  data-reveal="rise"
                  data-cursor="link"
                  data-cursor-label={c.roman}
                  style={{
                    ["--reveal-delay" as string]: `${i * 70}ms`,
                    ["--accent" as string]: c.accent,
                  }}
                >
                  <span className="chapter__no mono">{String(i + 1).padStart(2, "0")}</span>

                  <span className="chapter__names">
                    <span className="urdu chapter__urdu">{c.urdu}</span>
                    <span className="display chapter__title">{c.title}</span>
                    <span className="mono chapter__roman">{c.roman}</span>
                  </span>

                  <span className="chapter__blurb">{c.blurb}</span>

                  <span className="chapter__go mono" aria-hidden="true">
                    Open
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- the contact sheet, travelling ---------------- */}
      <Sheet photos={photos.slice(0, 14)} />

      {/* ---------------- stories ---------------- */}
      <section className="section stories" data-tone="raised">
        <div className="shell">
          <header className="head" data-reveal="soft" data-exit>
            <p className="mono">Every frame has one</p>
            <h2 className="display head__title">
              The story is <em>the photograph</em>
            </h2>
            <p className="lead">
              A picture with no story behind it is decoration. Each of these has the reason it was
              taken written under it — where I was standing, what I was waiting for, and what
              happened after.
            </p>
          </header>

          <div className="stories__grid">
            {stories.map((p, i) => (
              <article
                className="story"
                key={p.slug}
                style={{ ["--accent" as string]: p.accent }}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="story__link lift"
                  data-cursor="frame"
                  data-cursor-label={p.urduTitle}
                >
                  <Frame
                    slug={p.slug}
                    alt={p.alt}
                    ratio={p.ratio}
                    accent={p.accent}
                    title={p.title}
                    sizes="(max-width: 780px) 92vw, 46vw"
                    className="story__frame"
                    delay={(i % 2) * 110}
                    drift
                  />

                  <div className="story__body">
                    <p className="urdu story__urdu">{p.urdu.split("\n")[0]}</p>
                    <h3 className="display story__title">{p.title}</h3>
                    <p className="story__excerpt">{p.story[0]}</p>
                    <p className="mono story__meta">
                      {p.place} · {p.when}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <p className="stories__more" data-reveal="soft">
            <Link href="/work" className="link-arrow" data-cursor="link">
              All {photos.length} frames
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------- his own words, running past ---------------- */}
      <Marquee lines={lines} />

      {/* ---------------- proof ---------------- */}
      <section className="section proof" data-tone="bone">
        <div className="shell">
          <div className="proof__grid">
            <figure className="proof__quote" data-reveal="soft">
              <blockquote className="display">
                People do not stop for a good photograph. They stop for a <em>true</em> one.
              </blockquote>
              <figcaption className="mono">
                What 7,661 people taught me about one picture of an empty building
              </figcaption>
            </figure>

            <dl className="proof__stats">
              {[
                { k: "7,661", v: "likes on one frame of a campus nobody else cared about" },
                { k: "164", v: "comments, almost all of them about the reader's own memory" },
                { k: "Pixel", v: "no studio, no crew — one phone and the patience to wait" },
                { k: "Karachi", v: "Saddar, Burns Road, Kharadar, Lyari, and everywhere between" },
              ].map((s, i) => (
                <div
                  className="proof__stat"
                  key={s.k}
                  data-reveal="rise"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <dt className="display">{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- hire ---------------- */}
      <section className="section invite" data-tone="deep">
        <div className="shell shell--narrow">
          <p className="mono" data-reveal="soft">
            Working together
          </p>

          <h2 className="display invite__title" data-reveal="rise">
            If you want to be photographed the way I photograph this city — <em>honestly</em> —
            let&rsquo;s talk.
          </h2>

          <p className="lead" data-reveal="soft">
            Portraits, events, brand and documentary work across {site.location.city}. I answer on
            WhatsApp faster than on email, and I will tell you honestly if a shoot is not something I
            am right for.
          </p>

          <div className="invite__acts" data-reveal="soft">
            <a
              className="btn"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              WhatsApp {site.contact.phoneLocal}
            </a>
            <Link className="btn" data-ghost href="/hire" data-cursor="link">
              Rates &amp; what a shoot involves
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
