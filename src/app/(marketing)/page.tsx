import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)] sm:py-[var(--space-3xl)]">
      <p className="text-label mb-6">Menhir Holdings</p>
      <h1 className="text-display-lg mb-8 font-light text-ink">
        Your portfolio site, managed
      </h1>
      <p className="mb-10 text-lg leading-[1.75] text-ink-muted sm:text-xl">
        Vega runs your photographer website — you keep creative control. Each shoot can
        deliver picks and finals to your client, then add new showcase work to your live
        site in one flow.
      </p>

      <div className="mb-14 grid gap-6 sm:grid-cols-2">
        <section className="border border-line p-6">
          <h2 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-light">
            Your website
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted">
            Edit copy, preview, publish to your URL. Vega handles the plumbing; you
            direct the portfolio.
          </p>
        </section>
        <section className="border border-line p-6">
          <h2 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-light">
            Shoot → client → showcase
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted">
            Album delivery for client picks and downloads — then showcase the best images
            on your site. One album model, two outcomes.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin"
          className="border border-ink bg-ink px-6 py-3 text-sm tracking-[0.1em] text-paper transition-opacity hover:opacity-90"
        >
          Open your site
        </Link>
        <Link
          href="/s/vega-studio"
          className="border border-line px-6 py-3 text-sm tracking-[0.1em] text-ink-muted transition-colors hover:border-ink hover:text-ink"
        >
          Example portfolio
        </Link>
        <Link
          href="/deliver/demo-pick-link"
          className="border border-line px-6 py-3 text-sm tracking-[0.1em] text-ink transition-colors hover:border-ink"
        >
            Client demo link
        </Link>
      </div>
    </div>
  );
}
