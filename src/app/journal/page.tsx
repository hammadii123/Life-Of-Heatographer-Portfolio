import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import { posts } from "@/content/journal";
import { absolute } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: "Journal — Street Photography in Karachi",
  description:
    "Notes on photographing Karachi: where to shoot, what a photographer costs here, and how to photograph strangers without being a nuisance.",
  alternates: { canonical: "/journal" },
  openGraph: { url: absolute("/journal") },
};

export default function JournalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
        urdu="جو سیکھا، لکھ دیا۔"
        title={"Notes from\nthe street"}
        lead="Things people message me about often enough that they deserved a proper answer: where to go, what it costs, and how to point a camera at a stranger without being a nuisance."
      />

      <section className="section section--tight">
        <div className="shell">
          <div className="posts">
            {posts.map((p) => (
              <article
                className="post"
                key={p.slug}
                style={{ ["--accent" as string]: p.accent }}
                data-reveal="soft"
              >
                <p className="mono post__date">
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </p>

                <div>
                  <p className="urdu post__urdu">{p.urdu}</p>
                  <h2 className="display post__title">
                    <Link href={`/journal/${p.slug}`} data-cursor="link">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="post__desc">{p.description}</p>
                </div>

                <p className="mono post__read">{p.readMinutes} min</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
