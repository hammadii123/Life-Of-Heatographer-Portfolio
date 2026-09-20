/**
 * template.tsx re-mounts on every navigation (layout.tsx does not), so the
 * markup below animates once per page change.
 *
 * The transition is a shutter: two blades snap back off the screen and the new
 * page is underneath, already exposed. It is the same gesture as the hero's
 * fourth act, which is the point — moving between pages on this site should
 * feel like advancing a frame, not like loading a document.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="wipe-shutter" aria-hidden="true">
        <span className="wipe-shutter__blade" data-blade="top" />
        <span className="wipe-shutter__blade" data-blade="bottom" />
        <span className="wipe-shutter__seam" />
      </div>
      <div className="page-in">{children}</div>
    </>
  );
}
