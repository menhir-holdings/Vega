import { notFound } from "next/navigation";
import { MANIFESTS } from "@/bench/manifests";

type PageProps = {
  params: Promise<{ round: string }>;
};

export function generateStaticParams() {
  return [{ round: "hero-r1" }, { round: "desk-r1" }];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps) {
  const { round } = await params;
  const manifest = MANIFESTS[round];
  if (!manifest) return { title: "Bench — Vega" };
  return { title: `Bench ${manifest.id} — Vega` };
}

export default async function BenchRoundPage({ params }: PageProps) {
  const { round } = await params;
  const manifest = MANIFESTS[round];
  if (!manifest) notFound();

  const columns =
    manifest.columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className="bench-shell">
      <header className="border-b border-[var(--bench-line)] px-4 py-5 sm:px-6">
        <p className="text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--bench-faint)]">
          Bench
          <span className="mx-2 text-[var(--bench-line)]" aria-hidden>
            ·
          </span>
          Vega
          <span className="mx-2 text-[var(--bench-line)]" aria-hidden>
            ·
          </span>
          {manifest.id}
        </p>
        <h1 className="mt-2 text-[1.125rem] font-medium tracking-[-0.02em] text-[var(--bench-ink)]">
          {manifest.brief}
        </h1>
        <p className="mt-2 max-w-3xl text-[0.8125rem] leading-relaxed text-[var(--bench-muted)]">
          Axis: {manifest.axes}. Each inner window is the real{" "}
          <code className="font-mono text-[0.75rem] text-[var(--bench-ink)]">
            {manifest.frameRoute}
          </code>{" "}
          — scroll inside the frame. Outer chrome is Bench.
        </p>
      </header>

      <main
        id="main"
        className={`grid grid-cols-1 gap-px bg-[var(--bench-line)] ${columns}`}
      >
        {manifest.takes.map((entry) => {
          const src = `${manifest.frameRoute}?__benchRound=${manifest.id}&__benchTake=${entry.letter}`;
          return (
            <article
              key={entry.letter}
              className="flex min-w-0 flex-col bg-[var(--bench-chrome)]"
            >
              <header className="flex items-baseline gap-3 px-4 pt-4">
                <span className="text-[0.75rem] font-medium tracking-[0.12em] text-[var(--bench-ink)]">
                  {entry.letter}
                </span>
                <h2 className="text-[0.9375rem] font-medium tracking-[-0.02em] text-[var(--bench-ink)]">
                  {entry.name}
                </h2>
              </header>
              <p className="px-4 pt-2 pb-4 text-[0.8125rem] leading-relaxed text-[var(--bench-muted)]">
                {entry.thesis}
              </p>
              <div className="relative min-h-[42rem] flex-1 border-t border-[var(--bench-line)] bg-[#f6f5f2] lg:min-h-[48rem]">
                <p className="absolute top-0 right-0 left-0 z-10 flex h-7 items-center border-b border-[var(--bench-line)] bg-[var(--bench-ground)] px-3 font-mono text-[0.6875rem] text-[var(--bench-faint)]">
                  {src}
                </p>
                <iframe
                  title={`Take ${entry.letter} — ${entry.name}`}
                  src={src}
                  className="absolute inset-0 mt-7 h-[calc(100%-1.75rem)] w-full border-0 bg-[#f6f5f2]"
                />
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
