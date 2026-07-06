"use client";

import { useState } from "react";
import Link from "next/link";
import type { DeliverySession } from "@/types/album";

type DeliveryPanelProps = {
  albumId: string;
  deliveryState: string;
  session: DeliverySession | null;
  pickLimit?: number;
  onUpdate: () => void;
  onPickLimitChange: (limit?: number) => void;
};

export function DeliveryPanel({
  albumId,
  deliveryState,
  session,
  pickLimit,
  onUpdate,
  onPickLimitChange,
}: DeliveryPanelProps) {
  const [pin, setPin] = useState(session?.pin ?? "");
  const [clientEmail, setClientEmail] = useState(session?.clientEmail ?? "");
  const [copyMsg, setCopyMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const saveSettings = async () => {
    setSaving(true);
    await fetch(`/api/albums/${albumId}/delivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin || undefined, clientEmail: clientEmail || undefined }),
    });
    setSaving(false);
    onUpdate();
  };

  const openForPicking = async () => {
    setSaving(true);
    await fetch(`/api/albums/${albumId}/delivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin: pin || undefined,
        clientEmail: clientEmail || undefined,
        openForPicking: true,
      }),
    });
    setSaving(false);
    onUpdate();
  };

  const copyLink = async () => {
    const res = await fetch(`/api/albums/${albumId}/delivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin || undefined, clientEmail: clientEmail || undefined }),
    });
    const data = (await res.json()) as { token: string };
    const url = `${window.location.origin}/deliver/${data.token}`;
    await navigator.clipboard.writeText(url);
    setCopyMsg("Link copied — send to your client");
    setTimeout(() => setCopyMsg(null), 3000);
    onUpdate();
  };

  const isOpen = deliveryState === "ready_to_pick";
  const isPastPick = deliveryState === "picked" || deliveryState === "finalized";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-xl font-light">
          Client delivery
        </h2>
        <p className="text-sm text-ink-muted">
          One link for picking and downloads. Your client never needs an account.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-label mb-2 block">PIN (optional)</label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            className="w-full border border-line bg-paper px-3 py-2 text-sm tracking-widest"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="4-digit"
          />
        </div>
        <div>
          <label className="text-label mb-2 block">Client email (optional)</label>
          <input
            type="email"
            className="w-full border border-line bg-paper px-3 py-2 text-sm"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="for finals notification"
          />
        </div>
      </div>

      <div>
        <label className="text-label mb-2 block">Pick limit</label>
        <input
          type="number"
          min={1}
          className="w-24 border border-line bg-paper px-3 py-2 text-sm"
          value={pickLimit ?? ""}
          placeholder="∞"
          onChange={(e) => {
            const v = e.target.value ? Number(e.target.value) : undefined;
            onPickLimitChange(v);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={saving}
          onClick={() => void saveSettings()}
          className="border border-line px-4 py-2 text-sm tracking-[0.08em] hover:border-ink disabled:opacity-50"
        >
          Save settings
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => void copyLink()}
          className="border border-ink px-4 py-2 text-sm tracking-[0.08em]"
        >
          Copy client link
        </button>
        {session && (
          <Link
            href={`/deliver/${session.token}`}
            target="_blank"
            className="border border-line px-4 py-2 text-sm tracking-[0.08em] text-ink-muted hover:text-ink"
          >
            Preview as client
          </Link>
        )}
      </div>

      {copyMsg && <p className="text-sm text-ink">{copyMsg}</p>}

      {!isOpen && !isPastPick && (
        <button
          type="button"
          disabled={saving}
          onClick={() => void openForPicking()}
          className="w-full border border-ink bg-ink py-3 text-sm tracking-[0.1em] text-paper disabled:opacity-50 sm:w-auto sm:px-8"
        >
          Open for picking
        </button>
      )}

      {isOpen && (
        <p className="rounded border border-line bg-paper-elevated px-4 py-3 text-sm text-ink-muted">
          Gallery is open — waiting for client selection.
        </p>
      )}

      {isPastPick && (
        <p className="rounded border border-line bg-paper-elevated px-4 py-3 text-sm text-ink-muted">
          Client has submitted picks. Go to Retouch to upload finals.
        </p>
      )}
    </div>
  );
}
