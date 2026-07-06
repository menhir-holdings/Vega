"use client";

import { useState } from "react";
import type { Category } from "@/types/album";

type CategoryPanelProps = {
  albumId: string;
  categories: Category[];
  onUpdate: () => void;
};

export function CategoryPanel({ albumId, categories, onUpdate }: CategoryPanelProps) {
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);

  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  const create = async () => {
    if (!newName.trim()) return;
    setBusy(true);
    await fetch(`/api/albums/${albumId}/categories`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", name: newName.trim() }),
    });
    setNewName("");
    setBusy(false);
    onUpdate();
  };

  const remove = async (categoryId: string) => {
    setBusy(true);
    await fetch(`/api/albums/${albumId}/categories`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", categoryId }),
    });
    setBusy(false);
    onUpdate();
  };

  return (
    <div className="mb-6">
      <p className="text-label mb-3">Categories</p>
      <div className="flex flex-wrap gap-2">
        {sorted.map((cat) => (
          <span
            key={cat.id}
            className="inline-flex items-center gap-1 border border-line px-2.5 py-1 text-xs tracking-wide"
          >
            {cat.name}
            <button
              type="button"
              aria-label={`Remove ${cat.name}`}
              disabled={busy}
              onClick={() => void remove(cat.id)}
              className="ml-1 text-ink-faint hover:text-ink"
            >
              ×
            </button>
          </span>
        ))}
        <form
          className="inline-flex gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            void create();
          }}
        >
          <input
            type="text"
            className="w-28 border border-line bg-paper px-2 py-1 text-xs sm:w-36"
            placeholder="New category"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            type="submit"
            disabled={busy || !newName.trim()}
            className="border border-line px-2 py-1 text-xs disabled:opacity-40"
          >
            Add
          </button>
        </form>
      </div>
      <p className="mt-2 text-[11px] text-ink-faint">
        Folder uploads auto-create categories from folder names.
      </p>
    </div>
  );
}
