"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { lightboxBackdrop, lightboxImage } from "@/lib/motion";

type DeliverAsset = {
  id: string;
  previewUrl: string;
  alt: string;
  filename: string;
};

type DeliverLightboxProps = {
  assets: DeliverAsset[];
  index: number | null;
  selected: Set<string>;
  notes: Record<string, string>;
  canPick: boolean;
  pickLimit?: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onToggle: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
};

export function DeliverLightbox({
  assets,
  index,
  selected,
  notes,
  canPick,
  onClose,
  onNavigate,
  onToggle,
  onNoteChange,
}: DeliverLightboxProps) {
  const reduceMotion = useReducedMotion();
  const open = index !== null;
  const current = open ? assets[index] : null;
  const hasPrev = open && index > 0;
  const hasNext = open && index < assets.length - 1;
  const isSelected = current ? selected.has(current.id) : false;

  const goPrev = useCallback(() => {
    if (hasPrev && index !== null) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext && index !== null) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="deliver-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-50 flex flex-col bg-ink"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={
            reduceMotion
              ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
              : lightboxBackdrop
          }
        >
          <div className="flex items-center justify-between px-4 py-3 text-paper">
            <button type="button" onClick={onClose} className="text-sm tracking-[0.1em]">
              Close
            </button>
            <span className="text-xs text-paper/70">
              {(index ?? 0) + 1} / {assets.length}
            </span>
            {canPick && (
              <button
                type="button"
                onClick={() => onToggle(current.id)}
                className={`text-2xl ${isSelected ? "text-red-400" : "text-paper/50"}`}
                aria-label={isSelected ? "Remove from picks" : "Add to picks"}
              >
                {isSelected ? "♥" : "♡"}
              </button>
            )}
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2">
            {hasPrev && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 z-10 px-3 py-6 text-paper/80"
                aria-label="Previous"
              >
                ‹
              </button>
            )}
            <motion.div
              className="max-h-[70dvh] max-w-full"
              variants={reduceMotion ? undefined : lightboxImage}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.previewUrl}
                alt={current.alt}
                className="max-h-[70dvh] w-auto object-contain"
                draggable={false}
              />
            </motion.div>
            {hasNext && (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 z-10 px-3 py-6 text-paper/80"
                aria-label="Next"
              >
                ›
              </button>
            )}
          </div>

          {canPick && isSelected && (
            <div className="border-t border-paper/20 px-4 py-3">
              <input
                type="text"
                placeholder="Retouch note (optional)"
                className="w-full border border-paper/30 bg-transparent px-3 py-2 text-sm text-paper placeholder:text-paper/40"
                value={notes[current.id] ?? ""}
                onChange={(e) => onNoteChange(current.id, e.target.value)}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
