"use client";

import { useState } from "react";
import Link from "next/link";
import type { MediaAsset } from "@/types/album";

type ShowcasePanelProps = {
  albumId: string;
  albumName: string;
  assets: MediaAsset[];
  showcasedAt?: string;
  siteSlug: string;
  onComplete: () => void;
};

export function ShowcasePanel({
  albumId,
  albumName,
  assets,
  showcasedAt,
  siteSlug,
  onComplete,
}: ShowcasePanelProps) {
  const candidates = assets.filter(
    (a) => a.selectionState === "picked" || a.finalUrl || a.visibleOnSite,
  );
  const pool = candidates.length ? candidates : assets;

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(pool.map((a) => a.id)),
  );
  const [sectionTitle, setSectionTitle] = useState(albumName);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(Boolean(showcasedAt));
  const [siteUrl, setSiteUrl] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showcase = async () => {
    if (selected.size === 0) return;
    setBusy(true);
    const res = await fetch(`/api/albums/${albumId}/showcase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assetIds: [...selected],
        sectionTitle,
        republish: true,
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { siteUrl: string };
      setSiteUrl(data.siteUrl);
      setDone(true);
      onComplete();
    }
    setBusy(false);
  };

  if (showcasedAt || (done && siteUrl)) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-ink-muted">
          This shoot is on your website
          {showcasedAt && (
            <> · added {new Date(showcasedAt).toLocaleDateString()}</>
          )}
        </p>
        <Link
          href={`/s/${siteSlug}`}
          target="_blank"
          className="inline-block border border-ink px-4 py-2 text-sm tracking-[0.08em]"
        >
          View on your site
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-light">
          Add to your website
        </h2>
        <p className="text-sm text-ink-muted">
          Choose which images from this shoot appear in your portfolio. Vega adds a
          gallery section — you keep creative control in the site editor.
        </p>
      </div>

      <label className="block">
        <span className="text-label mb-1 block">Gallery section title</span>
        <input
          className="w-full max-w-md border border-line bg-paper px-3 py-2 text-sm"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
      </label>

      <p className="text-sm text-ink-muted">
        {selected.size} of {pool.length} selected for your site
      </p>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {pool.map((asset) => {
          const on = selected.has(asset.id);
          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => toggle(asset.id)}
              className={`relative aspect-[4/5] overflow-hidden border-2 ${
                on ? "border-ink" : "border-transparent opacity-50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset.previewUrl} alt={asset.alt} className="h-full w-full object-cover" />
              {on && (
                <span className="absolute right-1 top-1 bg-ink px-1.5 py-0.5 text-[10px] text-paper">
                  Site
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={() => void showcase()}
          className="border border-ink bg-ink px-6 py-3 text-sm tracking-[0.1em] text-paper disabled:opacity-50"
        >
          {busy ? "Adding…" : "Add to my website & publish"}
        </button>
        <Link
          href="/admin/site"
          className="border border-line px-4 py-3 text-sm tracking-[0.08em] text-ink-muted hover:text-ink"
        >
          Edit site layout first
        </Link>
      </div>

      {siteUrl && (
        <p className="text-sm text-ink">
          Live at{" "}
          <Link href={siteUrl} target="_blank" className="underline">
            {siteUrl}
          </Link>
        </p>
      )}
    </div>
  );
}
