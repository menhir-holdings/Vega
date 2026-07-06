import type { MediaAsset } from "@/types/album";

/** Client-facing preview URL — compressed proof, not full-res original. */
export function clientPreviewUrl(asset: MediaAsset): string {
  return asset.previewUrl;
}

/** Download URL for finalized picks only. */
export function clientFinalUrl(asset: MediaAsset): string | undefined {
  return asset.finalUrl ?? undefined;
}
