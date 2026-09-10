"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { liveSite, photographer } from "@/lib/public-site";

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
    <div id="main" className="min-h-[100svh] bg-[#eceae6] text-ink">
      <header className="flex items-center justify-between gap-4 border-b border-line bg-paper/90 px-[var(--space-sm)] py-4 sm:px-[var(--space-md)]">
        <div className="flex items-center gap-4">
          <p className="text-[0.75rem] tracking-[0.16em] uppercase text-ink-muted">
            Desk
          </p>
          <span className="hidden h-3 w-px bg-line sm:block" aria-hidden />
          <p className="font-[family-name:var(--font-display)] text-lg font-light">
            {photographer.name}
          </p>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] tracking-[0.12em] uppercase text-ink-muted">
            {liveSite.status}
          </span>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="text-[0.8125rem] tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
        >
          Open live site
        </Link>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-8 px-[var(--space-sm)] py-8 lg:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:px-[var(--space-md)] lg:py-10">
        <aside className="space-y-10">
          <section>
            <p className="text-label mb-3">What&apos;s live</p>
            <p className="font-[family-name:var(--font-display)] text-2xl font-light leading-snug">
              The public site is on.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Visitors land on the photographer site. There is no marketplace,
              follow graph, or community layer.
            </p>
            <p className="mt-4 text-xs tracking-[0.04em] text-ink-faint">
              {liveSite.bookmark}
            </p>
            <ul className="mt-6 space-y-2">
              {liveSite.pages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={page.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-label mb-3">Ask for a change</p>
            <p className="mb-4 text-sm leading-relaxed text-ink-muted">
              Write what should move. Vega takes it from there — no editor to
              learn.
            </p>
            {sent ? (
              <p className="text-sm text-ink">Noted. We&apos;ll take it from here.</p>
            ) : (
              <form onSubmit={handleAsk} className="space-y-3">
                <label htmlFor={fieldId} className="sr-only">
                  Change request
                </label>
                <textarea
                  id={fieldId}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={5}
                  required
                  placeholder="Swap the hero still. Softer type on About."
                  className="w-full resize-y border border-line bg-paper px-3 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-ink-faint focus:border-ink"
                />
                <button
                  type="submit"
                  className="border border-ink bg-ink px-4 py-2 text-[0.75rem] tracking-[0.14em] uppercase text-paper transition-opacity hover:opacity-90"
                >
                  Send
                </button>
              </form>
            )}
          </section>
        </aside>

        <section aria-label="Live preview">
          <p className="text-label mb-3 hidden lg:block">Preview</p>
          <div className="overflow-hidden border border-line bg-paper shadow-[0_24px_80px_rgba(36,34,31,0.12)]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <p className="text-[0.6875rem] tracking-[0.08em] text-ink-faint">
                {photographer.name} · live
              </p>
              <span className="text-[0.6875rem] tracking-[0.12em] uppercase text-ink-muted">
                Published
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#d8d4cc]">
              <iframe
                title={`${photographer.name} live site`}
                src="/"
                className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-paper"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
