import Image from "next/image";
import { liveSite, monograph, openingStill, photographer } from "@/lib/public-site";

const strip = [openingStill, ...monograph];

/** Contact strip of stills, live iframe, one compose. */
export default function TakeD() {
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
        <p className="text-[0.75rem] text-[var(--desk-faint)]">Film room</p>
        <a
          href={liveSite.productionUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto truncate font-mono text-[0.6875rem] text-[var(--desk-muted)]"
        >
          {liveSite.productionHost}
        </a>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside
          aria-label="Contact strip"
          className="flex shrink-0 gap-2 overflow-x-auto border-b border-[var(--desk-line)] bg-[var(--desk-panel)] p-2 lg:w-[5.5rem] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:border-r lg:border-b-0"
        >
          {strip.map((still, index) => (
            <button
              key={still.id}
              type="button"
              className={`relative h-16 w-12 shrink-0 overflow-hidden bg-stone lg:h-[4.5rem] lg:w-full ${
                index === 0
                  ? "ring-1 ring-[var(--desk-ink)]"
                  : "opacity-80"
              }`}
              aria-label={still.caption}
              aria-current={index === 0 ? "true" : undefined}
            >
              <Image
                src={still.src}
                alt={still.alt}
                width={still.width}
                height={still.height}
                sizes="72px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </aside>

        <section
          aria-label="Live preview"
          className="relative min-h-[50svh] min-w-0 flex-1 lg:min-h-0"
        >
          <iframe
            title={`${photographer.name} public site`}
            src="/"
            className="absolute inset-0 h-full w-full border-0 bg-[var(--desk-paper)]"
          />
        </section>
      </div>

      <div className="flex shrink-0 items-end gap-2 border-t border-[var(--desk-line)] bg-[var(--desk-chrome)] px-3 py-2.5 sm:px-4">
        <label htmlFor="bench-desk-d-note" className="sr-only">
          Change request
        </label>
        <textarea
          id="bench-desk-d-note"
          rows={2}
          placeholder="Swap the hero still. Softer type on About."
          className="min-h-[2.5rem] min-w-0 flex-1 resize-none border border-[var(--desk-line)] bg-[var(--desk-ground)] px-3 py-2 text-[0.8125rem] text-[var(--desk-ink)] outline-none placeholder:text-[var(--desk-faint)]"
        />
        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center bg-[var(--desk-ink)] px-4 text-[0.75rem] font-medium text-[var(--desk-ground)]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
