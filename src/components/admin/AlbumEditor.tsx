"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Album, ClientPickSubmission, DeliverySession } from "@/types/album";
import { AlbumJourney, type JourneyStep } from "./AlbumJourney";
import { CategoryPanel } from "./CategoryPanel";
import { DeliveryPanel } from "./DeliveryPanel";
import { RetouchPanel } from "./RetouchPanel";
import { ShowcasePanel } from "./ShowcasePanel";
import { UploadBatch } from "./UploadBatch";

type AlbumEditorProps = {
  albumId: string;
};

export function AlbumEditor({ albumId }: AlbumEditorProps) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [session, setSession] = useState<DeliverySession | null>(null);
  const [submission, setSubmission] = useState<ClientPickSubmission | null>(null);
  const [siteSlug, setSiteSlug] = useState("vega-studio");
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<JourneyStep>("ingest");

  const load = useCallback(async () => {
    const [albumRes, wsRes] = await Promise.all([
      fetch(`/api/albums/${albumId}`),
      fetch("/api/workspace"),
    ]);
    if (!albumRes.ok) return;
    const data = (await albumRes.json()) as {
      album: Album;
      session: DeliverySession | null;
      submission: ClientPickSubmission | null;
    };
    const ws = (await wsRes.json()) as { site: { slug: string } };
    setAlbum(data.album);
    setSession(data.session);
    setSubmission(data.submission);
    setSiteSlug(ws.site.slug);
    setLoading(false);
  }, [albumId]);

  useEffect(() => {
    void load();
  }, [load]);

  const patchAlbum = async (patch: Partial<Album> & { reorder?: string[] }) => {
    await fetch(`/api/albums/${albumId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    await load();
  };

  const patchAsset = async (
    assetId: string,
    patch: {
      visibleToClient?: boolean;
      visibleOnSite?: boolean;
      categoryId?: string | null;
    },
  ) => {
    await fetch(`/api/albums/${albumId}/assets/${assetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    await load();
  };

  const moveAsset = async (assetId: string, direction: -1 | 1) => {
    if (!album) return;
    const sorted = [...album.assets].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((a) => a.id === assetId);
    const swap = idx + direction;
    if (swap < 0 || swap >= sorted.length) return;
    [sorted[idx], sorted[swap]] = [sorted[swap], sorted[idx]];
    await patchAlbum({ reorder: sorted.map((a) => a.id) });
  };

  const finalize = async () => {
    await fetch(`/api/albums/${albumId}/finalize`, { method: "POST" });
    await load();
    setStep("showcase");
  };

  if (loading) {
    return <p className="p-8 text-ink-muted">Loading album…</p>;
  }

  if (!album) {
    return <p className="p-8 text-ink-muted">Album not found.</p>;
  }

  const sorted = [...album.assets].sort((a, b) => a.sortOrder - b.sortOrder);
  const pickedAssets = sorted.filter((a) => a.selectionState === "picked");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <Link href="/admin/albums" className="mb-2 inline-block text-sm text-ink-muted hover:text-ink">
          ← Albums
        </Link>
        <h1 className="text-display-lg font-light">{album.name}</h1>
        <p className="mt-2 text-sm text-ink-muted">
          {sorted.length} images · client delivery is a step; showcase culminates on your site
        </p>
      </div>

      <AlbumJourney
        deliveryState={album.deliveryState}
        assetCount={sorted.length}
        showcasedAt={album.showcasedAt}
        activeStep={step}
        onStepChange={setStep}
      />

      {step === "ingest" && (
        <section className="max-w-xl border border-line p-6">
          <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-xl font-light">
            Upload shoot
          </h2>
          <UploadBatch albumId={albumId} onComplete={() => void load()} />
          {sorted.length > 0 && (
            <button
              type="button"
              onClick={() => setStep("curate")}
              className="mt-6 border border-ink px-6 py-2.5 text-sm tracking-[0.08em]"
            >
              Continue to curate →
            </button>
          )}
        </section>
      )}

      {step === "curate" && (
        <section>
          <CategoryPanel albumId={albumId} categories={album.categories} onUpdate={() => void load()} />
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light">
                Curate
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Client = delivery link. Site = may appear on your portfolio after showcase.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep("deliver")}
              className="shrink-0 border border-ink px-4 py-2 text-sm tracking-[0.08em]"
            >
              Continue to deliver →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {sorted.map((asset) => (
              <div
                key={asset.id}
                className={`border bg-paper-elevated ${
                  !asset.visibleToClient ? "border-line opacity-60" : "border-line"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.previewUrl} alt={asset.alt} className="h-full w-full object-cover" />
                  {album.coverAssetId === asset.id && (
                    <span className="absolute left-2 top-2 bg-ink px-2 py-0.5 text-[10px] text-paper">
                      Cover
                    </span>
                  )}
                </div>
                <div className="space-y-2 p-2">
                  <p className="truncate font-mono text-[10px] text-ink-faint">{asset.filename}</p>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        void patchAsset(asset.id, { visibleToClient: !asset.visibleToClient })
                      }
                      className={`px-2 py-0.5 text-[10px] tracking-wide ${
                        asset.visibleToClient
                          ? "bg-ink text-paper"
                          : "border border-line text-ink-faint line-through"
                      }`}
                    >
                      Client
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void patchAsset(asset.id, { visibleOnSite: !asset.visibleOnSite })
                      }
                      className={`px-2 py-0.5 text-[10px] tracking-wide ${
                        asset.visibleOnSite
                          ? "bg-ink text-paper"
                          : "border border-line text-ink-faint"
                      }`}
                    >
                      Site
                    </button>
                    <button
                      type="button"
                      onClick={() => void patchAlbum({ coverAssetId: asset.id })}
                      className="border border-line px-2 py-0.5 text-[10px] text-ink-faint"
                    >
                      ★
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => void moveAsset(asset.id, -1)}
                      className="flex-1 border border-line py-1 text-xs text-ink-muted"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => void moveAsset(asset.id, 1)}
                      className="flex-1 border border-line py-1 text-xs text-ink-muted"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {step === "deliver" && (
        <section className="max-w-xl border border-line p-6">
          <p className="mb-4 text-sm text-ink-muted">
            Client delivery — share one link for picks and later downloads. This is a feature
            inside your shoot, not separate from your site workflow.
          </p>
          <DeliveryPanel
            albumId={albumId}
            deliveryState={album.deliveryState}
            session={session}
            pickLimit={album.pickLimit}
            onUpdate={() => void load()}
            onPickLimitChange={(limit) => void patchAlbum({ pickLimit: limit })}
          />
        </section>
      )}

      {step === "retouch" && (
        <section className="max-w-2xl border border-line p-6">
          <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-light">
            Retouch & release to client
          </h2>
          <p className="mb-6 text-sm text-ink-muted">
            Upload finals and release downloads. Then showcase selected work on your website.
          </p>
          <RetouchPanel
            albumId={albumId}
            pickedAssets={pickedAssets}
            deliveryState={album.deliveryState}
            onFinalize={() => void finalize()}
            onUpdate={() => void load()}
          />
          {submission && (
            <p className="mt-4 text-xs text-ink-faint">
              Client submitted {new Date(submission.submittedAt).toLocaleString()}
            </p>
          )}
          {album.deliveryState === "finalized" && (
            <button
              type="button"
              onClick={() => setStep("showcase")}
              className="mt-6 border border-ink px-6 py-2.5 text-sm tracking-[0.08em]"
            >
              Continue to showcase →
            </button>
          )}
        </section>
      )}

      {step === "showcase" && (
        <section className="max-w-2xl border border-line p-6">
          <ShowcasePanel
            albumId={albumId}
            albumName={album.name}
            assets={sorted}
            showcasedAt={album.showcasedAt}
            siteSlug={siteSlug}
            onComplete={() => void load()}
          />
        </section>
      )}
    </div>
  );
}
