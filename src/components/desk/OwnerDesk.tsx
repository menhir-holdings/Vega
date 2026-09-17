"use client";

import { useId, useState, type FormEvent } from "react";
import { liveSite, photographer } from "@/lib/public-site";

function formatPublished(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(iso));
}

export function OwnerDesk() {
  const fieldId = useId();
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  function handleAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = note.trim();
    if (!body) return;
    const subject = encodeURIComponent(`Change request — ${photographer.name}`);
    const mailto = `mailto:${photographer.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div
      id="main"
      className="desk-root flex min-h-[100svh] flex-col lg:h-[100svh] lg:overflow-hidden"
    >
      <header className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--desk-line)] bg-[var(--desk-chrome)] px-4 py-3 sm:px-5">
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
        <p className="text-[0.8125rem] text-[var(--desk-muted)]">
          {photographer.name}
        </p>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 sm:justify-end">
          <p className="flex items-center gap-2 text-[0.8125rem] text-[var(--desk-ink)]">
            <span
              className="inline-block size-1.5 shrink-0 rounded-full bg-[var(--desk-ready)]"
              aria-hidden
            />
            <span className="font-medium">{liveSite.status}</span>
          </p>
          <a
            href={liveSite.productionUrl}
            target="_blank"
            rel="noreferrer"
            className="truncate font-mono text-[0.75rem] text-[var(--desk-muted)] transition-colors hover:text-[var(--desk-ink)]"
          >
            {liveSite.productionHost}
          </a>
          <p className="text-[0.75rem] text-[var(--desk-faint)]">
            Published {formatPublished(liveSite.publishedAt)}
          </p>
          <a
            href={liveSite.productionUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center bg-[var(--desk-ink)] px-3 text-[0.75rem] font-medium text-[var(--desk-ground)] transition-opacity hover:opacity-90"
          >
            Visit
          </a>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col gap-10 border-b border-[var(--desk-line)] bg-[var(--desk-panel)] px-4 py-6 sm:px-5 lg:w-[22.5rem] lg:overflow-y-auto lg:border-r lg:border-b-0 xl:w-[24rem]">
          <section aria-labelledby="desk-live-heading">
            <h2
              id="desk-live-heading"
              className="text-[0.75rem] font-medium text-[var(--desk-faint)]"
            >
              Production
            </h2>
            <dl className="mt-4 space-y-3">
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3">
                <dt className="text-[0.75rem] text-[var(--desk-faint)]">
                  Domain
                </dt>
                <dd className="min-w-0">
                  <a
                    href={liveSite.productionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all font-mono text-[0.8125rem] text-[var(--desk-ink)] transition-colors hover:text-white"
                  >
                    {liveSite.productionHost}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3">
                <dt className="text-[0.75rem] text-[var(--desk-faint)]">
                  Status
                </dt>
                <dd className="flex items-center gap-2 text-[0.8125rem] text-[var(--desk-ink)]">
                  <span
                    className="inline-block size-1.5 rounded-full bg-[var(--desk-ready)]"
                    aria-hidden
                  />
                  {liveSite.status}
                </dd>
              </div>
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3">
                <dt className="text-[0.75rem] text-[var(--desk-faint)]">
                  Published
                </dt>
                <dd className="text-[0.8125rem] text-[var(--desk-ink)]">
                  {formatPublished(liveSite.publishedAt)}
                </dd>
              </div>
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3">
                <dt className="text-[0.75rem] text-[var(--desk-faint)]">
                  Source
                </dt>
                <dd className="font-mono text-[0.8125rem] text-[var(--desk-ink)]">
                  {liveSite.sourceRef}
                  <span className="text-[var(--desk-faint)]"> · </span>
                  {liveSite.sourceSha}
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="desk-ask-heading" className="mt-auto">
            <h2
              id="desk-ask-heading"
              className="text-[0.75rem] font-medium text-[var(--desk-faint)]"
            >
              Change request
            </h2>
            {sent ? (
              <div className="mt-4 space-y-3">
                <p className="text-[0.875rem] text-[var(--desk-ink)]">
                  Mail client opened.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setNote("");
                    setSent(false);
                  }}
                  className="text-[0.8125rem] text-[var(--desk-muted)] underline-offset-4 hover:text-[var(--desk-ink)] hover:underline"
                >
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={handleAsk} className="mt-4 space-y-3">
                <label htmlFor={fieldId} className="sr-only">
                  Change request
                </label>
                <textarea
                  id={fieldId}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={7}
                  required
                  placeholder="Swap the hero still. Softer type on About."
                  className="w-full resize-y border border-[var(--desk-line)] bg-[var(--desk-ground)] px-3 py-3 text-[0.875rem] leading-relaxed text-[var(--desk-ink)] outline-none placeholder:text-[var(--desk-faint)] focus:border-[var(--desk-ink)]"
                />
                <button
                  type="submit"
                  className="inline-flex h-9 items-center bg-[var(--desk-ink)] px-4 text-[0.75rem] font-medium text-[var(--desk-ground)] transition-opacity hover:opacity-90"
                >
                  Send
                </button>
              </form>
            )}
          </section>
        </aside>

        <section
          aria-label="Live preview"
          className="flex h-[70svh] min-h-[70svh] min-w-0 flex-1 flex-col bg-[var(--desk-ground)] lg:h-auto lg:min-h-0"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--desk-line)] px-4 py-2.5">
            <p className="text-[0.8125rem] font-medium text-[var(--desk-ink)]">
              Preview
            </p>
            <p className="truncate font-mono text-[0.75rem] text-[var(--desk-faint)]">
              Public /
            </p>
          </div>
          <div className="relative min-h-0 flex-1 bg-[var(--desk-paper)]">
            <iframe
              title={`${photographer.name} public site`}
              src="/"
              className="absolute inset-0 h-full w-full border-0 bg-[var(--desk-paper)]"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
