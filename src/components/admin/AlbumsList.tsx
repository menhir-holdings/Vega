"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DELIVERY_STATE_LABELS } from "@/lib/delivery";
import type { AlbumDeliveryState } from "@/types/album";

type AlbumSummary = {
  id: string;
  name: string;
  slug: string;
  deliveryState: AlbumDeliveryState;
  showcasedAt?: string;
  assetCount: number;
  visibleToClient: number;
  visibleOnSite: number;
  coverUrl?: string;
};

export function AlbumsList() {
  const [albums, setAlbums] = useState<AlbumSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/workspace");
    const data = (await res.json()) as { albums: AlbumSummary[] };
    setAlbums(data.albums);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const createAlbum = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    await fetch("/api/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setNewName("");
    setShowCreate(false);
    setCreating(false);
    await load();
  };

  if (loading) return <p className="p-8 text-ink-muted">Loading albums…</p>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <Link href="/admin" className="mb-2 inline-block text-sm text-ink-muted hover:text-ink">
            ← Your site
          </Link>
          <h1 className="text-display-lg font-light">Albums</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Each album is a shoot. Upload, deliver to your client, then showcase on your
            website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="border border-ink bg-ink px-5 py-2.5 text-sm tracking-[0.08em] text-paper"
        >
          New shoot
        </button>
      </div>

      {showCreate && (
        <form
          className="mb-8 flex flex-wrap gap-2 border border-line p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void createAlbum();
          }}
        >
          <input
            type="text"
            autoFocus
            className="min-w-[200px] flex-1 border border-line bg-paper px-3 py-2 text-sm"
            placeholder="Shoot name (e.g. Martinez Portrait)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            type="submit"
            disabled={creating || !newName.trim()}
            className="border border-ink px-4 py-2 text-sm disabled:opacity-50"
          >
            Create
          </button>
          <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-ink-muted">
            Cancel
          </button>
        </form>
      )}

      {albums.length === 0 ? (
        <p className="text-ink-muted">No albums yet. Create one after your next shoot.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {albums.map((album) => (
            <li key={album.id}>
              <Link
                href={`/admin/albums/${album.id}`}
                className="group flex gap-4 border border-line p-4 hover:border-ink"
              >
                <div className="h-24 w-20 shrink-0 overflow-hidden bg-stone">
                  {album.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={album.coverUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-light">
                    {album.name}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {album.assetCount} images · {album.visibleOnSite} on site
                  </p>
                  <p className="mt-2 text-xs tracking-[0.08em] text-ink-faint">
                    {DELIVERY_STATE_LABELS[album.deliveryState]}
                    {album.showcasedAt ? " · showcased" : ""}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
