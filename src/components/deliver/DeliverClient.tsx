"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { downloadImagesAsZip } from "@/lib/download-zip";
import type { AlbumDeliveryState, Category } from "@/types/album";
import { DeliverLightbox } from "./DeliverLightbox";

type ClientAsset = {
  id: string;
  categoryId: string | null;
  previewUrl: string;
  finalUrl?: string;
  width: number;
  height: number;
  alt: string;
  selectionState?: string;
  clientPickNumber?: number;
  filename: string;
};

type DeliverData = {
  session: { submittedAt?: string; finalizedAt?: string };
  album: {
    name: string;
    shortLabel?: string;
    deliveryState: AlbumDeliveryState;
    pickLimit?: number;
    categories: Category[];
    assets: ClientAsset[];
  };
  submission: { picks: Array<{ assetId: string; note?: string }> } | null;
  canPick: boolean;
  canDownload: boolean;
  requiresPin?: boolean;
};

type DeliverClientProps = {
  token: string;
};

export function DeliverClient({ token }: DeliverClientProps) {
  const [data, setData] = useState<DeliverData | null>(null);
  const [pin, setPin] = useState("");
  const [pinNeeded, setPinNeeded] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [submitting, setSubmitting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const load = useCallback(
    async (pinValue?: string) => {
      const q = pinValue ? `?pin=${encodeURIComponent(pinValue)}` : "";
      const res = await fetch(`/api/deliver/${token}${q}`);
      if (res.status === 401) {
        setPinNeeded(true);
        return;
      }
      if (!res.ok) {
        setError("This gallery link is invalid or expired.");
        return;
      }
      const json = (await res.json()) as DeliverData;
      setData(json);
      setPinNeeded(false);
      if (json.submission) {
        setSelected(new Set(json.submission.picks.map((p) => p.assetId)));
        json.submission.picks.forEach((p) => {
          if (p.note) setNotes((n) => ({ ...n, [p.assetId]: p.note! }));
        });
        setDone(true);
      }
    },
    [token],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const toggle = (id: string) => {
    if (!data?.canPick || done) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (data.album.pickLimit && next.size >= data.album.pickLimit) {
          setError(`You can select up to ${data.album.pickLimit} images.`);
          return prev;
        }
        next.add(id);
      }
      setError(null);
      return next;
    });
  };

  const submit = async () => {
    if (!data || selected.size === 0) {
      setError("Select at least one image.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const res = await fetch(`/api/deliver/${token}/picks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin: pin || undefined,
        picks: [...selected].map((assetId) => ({
          assetId,
          note: notes[assetId] || undefined,
        })),
      }),
    });
    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      setError(body.error ?? "Could not submit");
      setSubmitting(false);
      return;
    }
    setDone(true);
    setShowReview(false);
    setSubmitting(false);
    await load(pin);
  };

  const filteredAssets = useMemo(() => {
    if (!data) return [];
    if (activeCategory === "all") return data.album.assets;
    return data.album.assets.filter((a) => a.categoryId === activeCategory);
  }, [data, activeCategory]);

  const downloadAsset = (asset: ClientAsset) => {
    const url = asset.finalUrl ?? asset.previewUrl;
    const a = document.createElement("a");
    a.href = url;
    a.download = asset.filename;
    a.target = "_blank";
    a.rel = "noopener";
    a.click();
  };

  const downloadAll = async () => {
    if (!data) return;
    const finals = data.album.assets.filter(
      (a) => a.selectionState === "picked" && (a.finalUrl || a.previewUrl),
    );
    setDownloading(true);
    try {
      await downloadImagesAsZip(
        finals.map((a) => ({
          url: a.finalUrl ?? a.previewUrl,
          filename: a.filename,
        })),
        `${data.album.name.replace(/\s+/g, "-")}-finals.zip`,
      );
    } finally {
      setDownloading(false);
    }
  };

  if (pinNeeded) {
    return (
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-5">
        <p className="text-label mb-4">Private gallery</p>
        <h1 className="mb-6 font-[family-name:var(--font-cormorant)] text-3xl font-light">
          Enter PIN
        </h1>
        <input
          type="password"
          inputMode="numeric"
          className="mb-4 w-full border border-line bg-paper px-4 py-3 text-lg tracking-widest"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
        />
        <button
          type="button"
          onClick={() => void load(pin)}
          className="w-full border border-ink bg-ink py-4 text-sm tracking-[0.1em] text-paper"
        >
          Open gallery
        </button>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center px-5">
        <p className="text-center text-ink-muted">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <p className="text-ink-muted">Loading your gallery…</p>
      </div>
    );
  }

  const { album, canPick, canDownload } = data;
  const state = album.deliveryState;

  const statusMessage =
    state === "ready_to_pick" && !done
      ? "Tap an image to view full size, then heart your favorites"
      : state === "ready_to_pick" && done
        ? "Selection sent — your photographer will retouch your picks"
        : state === "picked"
          ? "Your photographer is preparing your images"
          : state === "finalized" && canDownload
            ? "Your retouched images are ready to download"
            : state === "draft"
              ? "This gallery isn't open yet — check back soon"
              : "";

  return (
    <div className="mx-auto min-h-[100dvh] max-w-lg pb-28">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 px-4 py-4 backdrop-blur-sm">
        <p className="text-label mb-1">{album.shortLabel ?? "Gallery"}</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-light">
          {album.name}
        </h1>
        {statusMessage && (
          <p className="mt-2 text-xs leading-relaxed text-ink-muted">{statusMessage}</p>
        )}
      </header>

      {album.categories.length > 0 && (
        <div
          className="flex gap-2 overflow-x-auto border-b border-line px-4 py-3"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 px-3 py-1.5 text-xs tracking-[0.1em] ${
              activeCategory === "all" ? "bg-ink text-paper" : "text-ink-muted"
            }`}
          >
            All
          </button>
          {album.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 text-xs tracking-[0.1em] ${
                activeCategory === cat.id ? "bg-ink text-paper" : "text-ink-muted"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {canPick && !done && (
        <p className="sticky top-[theme(spacing.0)] z-10 border-b border-line bg-paper px-4 py-2 text-center text-sm text-ink-muted">
          {selected.size}
          {album.pickLimit ? ` / ${album.pickLimit}` : ""} selected
        </p>
      )}

      <div className="grid grid-cols-2 gap-1 px-1 pt-1">
        {filteredAssets.map((asset, i) => {
          const isSelected = selected.has(asset.id);
          const showDownload = canDownload && asset.selectionState === "picked";

          return (
            <div key={asset.id} className="relative aspect-[3/4] overflow-hidden bg-stone">
              <button
                type="button"
                className="relative h-full w-full"
                onClick={() => {
                  if (showDownload) downloadAsset(asset);
                  else setLightboxIndex(i);
                }}
                aria-pressed={isSelected}
                aria-label={asset.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.previewUrl}
                  alt={asset.alt}
                  className="h-full w-full object-cover"
                />
                {canPick && !done && (
                  <span
                    className={`absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                      isSelected ? "bg-ink text-paper" : "bg-paper/85 text-ink-faint"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(asset.id);
                    }}
                    role="button"
                    aria-hidden
                  >
                    {isSelected ? "♥" : "♡"}
                  </span>
                )}
                {asset.clientPickNumber && (
                  <span className="absolute left-2 top-2 bg-ink px-2 py-0.5 text-xs text-paper">
                    #{asset.clientPickNumber}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <DeliverLightbox
        assets={filteredAssets}
        index={lightboxIndex}
        selected={selected}
        notes={notes}
        canPick={canPick && !done}
        pickLimit={album.pickLimit}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        onToggle={toggle}
        onNoteChange={(id, note) => setNotes((n) => ({ ...n, [id]: note }))}
      />

      {showReview && (
        <div className="fixed inset-0 z-40 flex flex-col bg-paper">
          <header className="border-b border-line px-4 py-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light">
              Review your picks
            </h2>
            <p className="text-sm text-ink-muted">{selected.size} images selected</p>
          </header>
          <ul className="flex-1 overflow-y-auto px-4 py-4">
            {[...selected].map((id) => {
              const asset = album.assets.find((a) => a.id === id);
              if (!asset) return null;
              return (
                <li key={id} className="mb-4 flex gap-3 border-b border-line pb-4">
                  <div className="h-20 w-16 shrink-0 overflow-hidden bg-stone">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset.previewUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{asset.filename}</p>
                    {notes[id] && <p className="text-xs text-ink-muted">{notes[id]}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    className="text-xs text-ink-muted underline"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line p-4">
            <button
              type="button"
              disabled={submitting}
              onClick={() => void submit()}
              className="mb-2 w-full border border-ink bg-ink py-4 text-sm tracking-[0.12em] text-paper disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Confirm & send"}
            </button>
            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="w-full py-2 text-sm text-ink-muted"
            >
              Back to gallery
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="fixed bottom-20 inset-x-4 z-30 text-center text-sm text-red-800">{error}</p>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-4 backdrop-blur-sm">
        {canPick && !done && (
          <button
            type="button"
            disabled={selected.size === 0}
            onClick={() => setShowReview(true)}
            className="w-full border border-ink bg-ink py-4 text-sm tracking-[0.12em] text-paper disabled:opacity-40"
          >
            Review & submit ({selected.size})
          </button>
        )}
        {canDownload && (
          <button
            type="button"
            disabled={downloading}
            onClick={() => void downloadAll()}
            className="w-full border border-ink bg-ink py-4 text-sm tracking-[0.12em] text-paper disabled:opacity-50"
          >
            {downloading ? "Preparing ZIP…" : "Download all finals"}
          </button>
        )}
        {done && !canDownload && state !== "finalized" && (
          <p className="text-center text-sm text-ink-muted">
            Same link when downloads are ready — no new URL needed.
          </p>
        )}
        <p className="mt-3 text-center text-[10px] text-ink-faint">
          <Link href="/" className="underline">
            Vega
          </Link>
        </p>
      </div>
    </div>
  );
}
