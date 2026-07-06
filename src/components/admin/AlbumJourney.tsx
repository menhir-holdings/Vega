"use client";

import { useEffect, useState } from "react";
import type { AlbumDeliveryState } from "@/types/album";
import { DELIVERY_STATE_LABELS } from "@/lib/delivery";

const STEPS = [
  { key: "ingest", label: "Upload" },
  { key: "curate", label: "Curate" },
  { key: "deliver", label: "Deliver" },
  { key: "retouch", label: "Retouch" },
  { key: "showcase", label: "Showcase" },
] as const;

export type JourneyStep = (typeof STEPS)[number]["key"];

type AlbumJourneyProps = {
  deliveryState: AlbumDeliveryState;
  assetCount: number;
  showcasedAt?: string;
  activeStep: JourneyStep;
  onStepChange: (step: JourneyStep) => void;
};

function suggestedStep(
  deliveryState: AlbumDeliveryState,
  assetCount: number,
  showcasedAt?: string,
): JourneyStep {
  if (showcasedAt) return "showcase";
  if (deliveryState === "finalized") return "showcase";
  if (deliveryState === "picked") return "retouch";
  if (deliveryState === "ready_to_pick") return "deliver";
  if (assetCount > 0) return "curate";
  return "ingest";
}

export function AlbumJourney({
  deliveryState,
  assetCount,
  showcasedAt,
  activeStep,
  onStepChange,
}: AlbumJourneyProps) {
  const suggested = suggestedStep(deliveryState, assetCount, showcasedAt);

  useEffect(() => {
    if (deliveryState === "finalized" && !showcasedAt) onStepChange("showcase");
    else if (deliveryState === "picked") onStepChange("retouch");
    else if (deliveryState === "ready_to_pick") onStepChange("deliver");
    else if (assetCount > 0 && activeStep === "ingest") onStepChange("curate");
  }, [deliveryState, assetCount, showcasedAt, activeStep, onStepChange]);

  return (
    <nav aria-label="Shoot workflow" className="mb-8 border-b border-line pb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ol className="flex flex-wrap gap-1 sm:gap-2">
          {STEPS.map((step, i) => {
            const isActive = activeStep === step.key;
            const suggestedIdx = STEPS.findIndex((s) => s.key === suggested);
            const isPast = i < suggestedIdx || (step.key === "ingest" && assetCount > 0);

            return (
              <li key={step.key} className="flex items-center">
                <button
                  type="button"
                  onClick={() => onStepChange(step.key)}
                  className={`px-2 py-2 text-[11px] tracking-[0.08em] transition-colors sm:px-3 sm:text-xs ${
                    isActive
                      ? "bg-ink text-paper"
                      : isPast
                        ? "text-ink hover:bg-paper-elevated"
                        : "text-ink-faint hover:text-ink-muted"
                  }`}
                >
                  <span className="mr-1 hidden sm:inline">{i + 1}.</span>
                  {step.label}
                </button>
                {i < STEPS.length - 1 && (
                  <span className="mx-0.5 text-ink-faint sm:mx-1" aria-hidden>
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="text-xs tracking-[0.08em] text-ink-faint">
          {showcasedAt ? "On your site" : DELIVERY_STATE_LABELS[deliveryState]}
        </p>
      </div>
    </nav>
  );
}
