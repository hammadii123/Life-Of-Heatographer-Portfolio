import Link from "next/link";
import { photoBySlug } from "@/content/photos";
import Frame from "@/components/ui/Frame";
import "@/styles/pages.css";

export const metadata = { title: "Not found" };

export default function NotFound() {
  const frame = photoBySlug("campus-aakhri");

  return (
    <section className="section" style={{ paddingTop: "calc(var(--nav-h) + 6rem)" }}>
      <div className="shell shell--narrow endnote">
        <p className="mono">404</p>
        <p className="urdu endnote__urdu">یہاں کچھ نہیں ہے۔</p>
        <h1 className="display endnote__title">
          There is nothing at this address. Which, honestly, happens on the street too.
        </h1>
        <p className="lead">
          Most days I come back with nothing. Nobody posts about those days. Try one of these
          instead.
        </p>

        <div className="endnote__acts">
          <Link className="btn" href="/work" data-cursor="link">
            The work
          </Link>
          <Link className="btn" data-ghost href="/chapters" data-cursor="link">
            Chapters
          </Link>
          <Link className="btn" data-ghost href="/" data-cursor="link">
            Home
          </Link>
        </div>

        {frame && (
          <div style={{ marginTop: "clamp(2.5rem, 7vw, 5rem)", maxWidth: "520px" }}>
            <Frame
              slug={frame.slug}
              alt={frame.alt}
              ratio={frame.ratio}
              accent={frame.accent}
              title={frame.title}
              sizes="(max-width: 700px) 92vw, 520px"
              cursorLabel={frame.urduTitle}
            />
          </div>
        )}
      </div>
    </section>
  );
}
