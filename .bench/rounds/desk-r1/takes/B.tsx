import { liveSite, photographer } from "@/lib/public-site";

/** Live site dominant. Visit and Send as chips on a thin rail. */
export default function TakeB() {
  return (
    <div
      id="main"
      className="desk-root flex min-h-[100svh] flex-col lg:h-[100svh] lg:overflow-hidden"
    >
      <header className="flex h-11 shrink-0 items-center gap-2 border-b border-[var(--desk-line)] bg-[var(--desk-chrome)] px-3 sm:px-4">
        <p className="text-[0.8125rem] font-medium tracking-[-0.02em] text-[var(--desk-ink)]">
          Vega
          <span className="mx-2 text-[var(--desk-faint)]" aria-hidden>
            /
          </span>
          Desk
        </p>
        <span
          className="hidden h-4 w-px bg-[var(--desk-line)] sm:block"
          aria-hidden
        />
        <p className="hidden text-[0.75rem] text-[var(--desk-muted)] sm:block">
          {photographer.name}
        </p>
        <p className="ml-auto flex items-center gap-2 text-[0.75rem] text-[var(--desk-ink)]">
          <span
            className="inline-block size-1.5 shrink-0 rounded-full bg-[var(--desk-ready)]"
            aria-hidden
          />
          {liveSite.status}
        </p>
        <a
          href={liveSite.productionUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-7 items-center border border-[var(--desk-line)] px-2.5 text-[0.6875rem] font-medium text-[var(--desk-ink)]"
        >
          Visit
        </a>
        <button
          type="button"
          className="inline-flex h-7 items-center bg-[var(--desk-ink)] px-2.5 text-[0.6875rem] font-medium text-[var(--desk-ground)]"
        >
          Send
        </button>
      </header>
      <section aria-label="Live preview" className="relative min-h-0 flex-1">
        <iframe
          title={`${photographer.name} public site`}
          src="/"
          className="absolute inset-0 h-full w-full border-0 bg-[var(--desk-paper)]"
        />
      </section>
    </div>
  );
}
