"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DELIVERY_STATE_LABELS } from "@/lib/delivery";
import type { AlbumDeliveryState } from "@/types/album";

type AlbumSummary = {
  id: string;
  name: string;
  deliveryState: AlbumDeliveryState;
  showcasedAt?: string;
  assetCount: number;
  coverUrl?: string;
};

type SiteSummary = {
  slug: string;
  published: boolean;
  heroTitle: string;
  publishedAt?: string;
};

export function SiteHome() {
  const [site, setSite] = useState<SiteSummary | null>(null);
  const [albums, setAlbums] = useState<AlbumSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [wsRes, albumsRes] = await Promise.all([
      fetch("/api/workspace"),
      fetch("/api/albums"),
    ]);
    const ws = (await wsRes.json()) as {
      site: SiteSummary;
      albums: AlbumSummary[];
    };
    const albumsData = (await albumsRes.json()) as { albums: AlbumSummary[] };
    setSite(ws.site);
    setAlbums(albumsData.albums);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <p className="p-8 text-ink-muted">Loading your site…</p>;

  const pendingShowcase = albums.filter(
    (a) => a.deliveryState === "finalized" && !a.showcasedAt,
  );
  const inProgress = albums.filter(
    (a) => a.deliveryState !== "finalized" || !a.showcasedAt,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-10 border-b border-line pb-8">
        <p className="text-label mb-2">Your website</p>
        <h1 className="text-display-lg font-light">{site?.heroTitle ?? "Your portfolio"}</h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          Vega manages your site and creative direction. Each shoot can deliver to your
          client and add new work to your portfolio.
        </p>
      </div>

      {site && (
        <section className="mb-10 border border-line p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-label mb-2">Live site</p>
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light">
                /s/{site.slug}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {site.published ? (
                  <>
                    Published
                    {site.publishedAt &&
                      ` · ${new Date(site.publishedAt).toLocaleDateString()}`}
                  </>
                ) : (
                  "Draft — not yet published"
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/site"
                className="border border-ink bg-ink px-5 py-2.5 text-sm tracking-[0.08em] text-paper"
              >
                Edit site
              </Link>
              <Link
                href={`/s/${site.slug}`}
                target="_blank"
                className="border border-line px-5 py-2.5 text-sm tracking-[0.08em] hover:border-ink"
              >
                Preview
              </Link>
            </div>
          </div>
        </section>
      )}

      {pendingShowcase.length > 0 && (
        <section className="mb-10 rounded border border-amber-900/25 bg-amber-50/40 p-5">
          <h2 className="mb-3 font-[family-name:var(--font-cormorant)] text-lg font-light">
            Ready to add to your site
          </h2>
          <ul className="space-y-2">
            {pendingShowcase.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/admin/albums/${a.id}`}
                  className="text-sm underline hover:text-ink"
                >
                  {a.name} — showcase {a.assetCount} images
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light">
          Shoots
        </h2>
        <Link
          href="/admin/albums"
          className="border border-line px-4 py-2 text-sm tracking-[0.08em] hover:border-ink"
        >
          All albums →
        </Link>
      </div>

      {inProgress.length === 0 ? (
        <p className="mb-8 text-ink-muted">
          No shoots yet.{" "}
          <Link href="/admin/albums" className="underline">
            Create an album
          </Link>{" "}
          after your next session.
        </p>
      ) : (
        <ul className="mb-10 grid gap-3 sm:grid-cols-2">
          {inProgress.slice(0, 4).map((album) => (
            <li key={album.id}>
              <Link
                href={`/admin/albums/${album.id}`}
                className="flex gap-3 border border-line p-3 hover:border-ink"
              >
                <div className="h-16 w-14 shrink-0 bg-stone">
                  {album.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={album.coverUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg font-light">
                    {album.name}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {DELIVERY_STATE_LABELS[album.deliveryState]}
                    {album.showcasedAt ? " · on site" : ""}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-ink-muted">
        <strong className="text-ink">Client delivery</strong> lives inside each album — share a
        pick link, get selections back, ship finals. When done, showcase the best work on your
        site.{" "}
        <Link href="/deliver/demo-pick-link" className="underline">
          Try demo client link
        </Link>
      </p>
    </div>
  );
}
