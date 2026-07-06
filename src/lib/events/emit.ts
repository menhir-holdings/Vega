import type { VegaEvent } from "./types";

/**
 * Domain event bus. Logs in dev; Resend adapter in Phase 2.
 */
export async function emit(event: VegaEvent): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[vega:event]", event.type, event);
  }

  if (!process.env.RESEND_API_KEY) return;

  // Phase 2: route to notification handlers
  // await sendPhotographerEmail(event);
  // await sendClientEmail(event);
}
