import { liveSite, photographer } from "@/lib/public-site";

const marks = [
  {
    id: "1",
    top: "22%",
    left: "14%",
    note: "Swap the opening still",
  },
  {
    id: "2",
    top: "58%",
    left: "38%",
    note: "Softer type on the name",
  },
  {
    id: "3",
    top: "78%",
    left: "62%",
    note: "Caption sits too far from the plate",
  },
] as const;

/** Annotation marks on the live preview. One Send. */
export default function TakeC() {
  return (
    <div
      id="main"
      className="desk-root flex min-h-[100svh] flex-col lg:h-[100svh] lg:overflow-hidden"
    >
      <header className="flex h-11 shrink-0 items-center gap-3 border-b border-[var(--desk-line)] bg-[var(--desk-chrome)] px-3 sm:px-4">
        <p className="text-[0.8125rem] font-medium tracking-[-0.02em] text-[var(--desk-ink)]">
          Vega
          <span className="mx-2 text-[var(--desk-faint)]" aria-hidden>
            /
          </span>
          Desk
        </p>
        <p className="text-[0.75rem] text-[var(--desk-faint)]">Proofing</p>
        <p className="ml-auto flex items-center gap-2 text-[0.75rem] text-[var(--desk-ink)]">
          <span
            className="inline-block size-1.5 shrink-0 rounded-full bg-[var(--desk-ready)]"
            aria-hidden
          />
          {liveSite.status}
        </p>
        <button
          type="button"
          className="inline-flex h-7 items-center bg-[var(--desk-ink)] px-3 text-[0.6875rem] font-medium text-[var(--desk-ground)]"
        >
          Send
        </button>
      </header>
      <section
        aria-label="Live preview with marks"
        className="relative min-h-0 flex-1 bg-[var(--desk-ground)]"
      >
        <iframe
          title={`${photographer.name} public site`}
          src="/"
          className="absolute inset-0 h-full w-full border-0 bg-[var(--desk-paper)]"
        />
        <ol className="pointer-events-none absolute inset-0 m-0 list-none p-0">
          {marks.map((mark) => (
            <li
              key={mark.id}
              className="absolute flex items-start gap-2"
              style={{ top: mark.top, left: mark.left }}
            >
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--desk-ink)] text-[0.625rem] font-medium text-[var(--desk-ground)]">
                {mark.id}
              </span>
              <span className="max-w-[11rem] bg-[var(--desk-chrome)] px-2 py-1.5 text-[0.6875rem] leading-snug text-[var(--desk-ink)] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                {mark.note}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
