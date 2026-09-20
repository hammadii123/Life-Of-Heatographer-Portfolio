import Link from "next/link";

/**
 * The top of every inner page. Same shape everywhere so the site reads as one
 * object: breadcrumb, Urdu line, title, lead.
 *
 * `title` is split on newlines and each line is wrapped so it can rise from
 * behind its own edge — real per-line motion without shipping a text-splitting
 * library to the browser. See `.lines` in motion.css.
 */
export default function PageHeader({
  crumbs,
  urdu,
  title,
  lead,
  meta,
  accent,
}: {
  crumbs?: { label: string; href?: string }[];
  urdu?: string;
  /** Use \n to control where the display type breaks. */
  title: string;
  lead?: string;
  meta?: string;
  accent?: string;
}) {
  const lines = title.split("\n");

  return (
    <header
      className="pagehead"
      style={accent ? ({ ["--accent" as string]: accent } as React.CSSProperties) : undefined}
    >
      <div className="shell">
        {crumbs && crumbs.length > 0 && (
          <nav className="crumbs mono" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`}>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                {i < crumbs.length - 1 && (
                  <span aria-hidden="true" style={{ paddingInline: "0.5rem" }}>
                    /
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {urdu && (
          <p className="urdu pagehead__urdu" data-reveal="ink">
            {urdu}
          </p>
        )}

        <h1 className="display pagehead__title lines" data-reveal="still">
          {lines.map((line, i) => (
            <span className="line" key={i} style={{ ["--i" as string]: i }}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        {lead && (
          <p className="lead pagehead__lead" data-reveal="soft" style={{ ["--reveal-delay" as string]: "220ms" }}>
            {lead}
          </p>
        )}

        {meta && (
          <p className="mono pagehead__meta" data-reveal="soft" style={{ ["--reveal-delay" as string]: "320ms" }}>
            {meta}
          </p>
        )}
      </div>
    </header>
  );
}
