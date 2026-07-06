import { put, del } from "@vercel/blob";

export type MediaVariant = "original" | "preview" | "final";

function blobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export function mediaPath(
  workspaceId: string,
  albumId: string,
  assetId: string,
  variant: MediaVariant,
  ext = "jpg",
): string {
  return `media/${workspaceId}/${albumId}/${assetId}/${variant}.${ext}`;
}

export function isBlobStorageEnabled(): boolean {
  return Boolean(blobToken());
}

/** Upload bytes to Vercel Blob. Returns public URL. */
export async function putMedia(
  pathname: string,
  body: Buffer | Blob | ArrayBuffer | string,
  contentType = "image/jpeg",
): Promise<string> {
  const token = blobToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN not configured");
  }

  const result = await put(pathname, body, {
    access: "public",
    token,
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return result.url;
}

/** Delete a blob by URL (best-effort). */
export async function deleteMedia(url: string): Promise<void> {
  const token = blobToken();
  if (!token || !url.startsWith("http")) return;
  try {
    await del(url, { token });
  } catch {
    // Asset may already be gone
  }
}

/** Parse a data URL into buffer + mime type. */
export function parseDataUrl(dataUrl: string): { buffer: Buffer; mime: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return { mime: match[1], buffer: Buffer.from(match[2], "base64") };
}
