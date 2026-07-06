"use client";

import { useRef, useState } from "react";
import { compressFiles } from "@/lib/compress-image";
import type { MediaAsset } from "@/types/album";

type RetouchPanelProps = {
  albumId: string;
  pickedAssets: MediaAsset[];
  deliveryState: string;
  onFinalize: () => void;
  onUpdate: () => void;
};

export function RetouchPanel({
  albumId,
  pickedAssets,
  deliveryState,
  onFinalize,
  onUpdate,
}: RetouchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const uploadFinal = async (assetId: string, file: File) => {
    setBusy(true);
    try {
      const [compressed] = await compressFiles([file]);
      const res = await fetch(`/api/albums/${albumId}/assets/${assetId}/final`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl: compressed.dataUrl }),
      });
      if (res.ok) onUpdate();
    } finally {
      setBusy(false);
      setUploadTargetId(null);
    }
  };

  const copyPickList = async () => {
    const lines = pickedAssets
      .sort((a, b) => (a.clientPickNumber ?? 0) - (b.clientPickNumber ?? 0))
      .map((a) => {
        const note = a.clientNote ? ` — ${a.clientNote}` : "";
        return `${a.clientPickNumber}. ${a.filename}${note}`;
      });
    await navigator.clipboard.writeText(lines.join("\n"));
  };

  const exportCsv = () => {
    const rows = [
      ["pick", "filename", "note"],
      ...pickedAssets
        .sort((a, b) => (a.clientPickNumber ?? 0) - (b.clientPickNumber ?? 0))
        .map((a) => [String(a.clientPickNumber ?? ""), a.filename, a.clientNote ?? ""]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "picks.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (pickedAssets.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        Client picks will appear here after they submit their selection.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void copyPickList()}
          className="border border-line px-4 py-2 text-sm tracking-[0.08em]"
        >
          Copy pick list
        </button>
        <button
          type="button"
          onClick={exportCsv}
          className="border border-line px-4 py-2 text-sm tracking-[0.08em]"
        >
          Export CSV
        </button>
      </div>

      <ul className="space-y-3">
        {pickedAssets
          .sort((a, b) => (a.clientPickNumber ?? 0) - (b.clientPickNumber ?? 0))
          .map((asset) => (
            <li
              key={asset.id}
              className="flex flex-wrap items-center gap-4 border border-line p-3"
            >
              <div className="h-16 w-12 shrink-0 overflow-hidden bg-stone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.previewUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm">
                  <span className="text-ink-faint">#{asset.clientPickNumber}</span>{" "}
                  {asset.filename}
                </p>
                {asset.clientNote && (
                  <p className="text-sm text-ink-muted">{asset.clientNote}</p>
                )}
                {asset.finalUrl && (
                  <p className="text-xs text-ink-faint">Final uploaded</p>
                )}
              </div>
              {deliveryState === "picked" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setUploadTargetId(asset.id);
                    inputRef.current?.click();
                  }}
                  className="border border-ink px-3 py-1.5 text-xs tracking-[0.08em] disabled:opacity-50"
                >
                  {busy && uploadTargetId === asset.id
                    ? "Uploading…"
                    : asset.finalUrl
                      ? "Replace final"
                      : "Upload final"}
                </button>
              )}
            </li>
          ))}
      </ul>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && uploadTargetId) void uploadFinal(uploadTargetId, file);
          e.target.value = "";
        }}
      />

      {deliveryState === "picked" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setBusy(true);
            onFinalize();
            setBusy(false);
          }}
          className="border border-ink bg-ink px-6 py-3 text-sm tracking-[0.1em] text-paper disabled:opacity-50"
        >
          Release downloads to client
        </button>
      )}

      {deliveryState === "finalized" && (
        <p className="text-sm text-ink-muted">
          Finals released — client can download from the same link.
        </p>
      )}
    </div>
  );
}
