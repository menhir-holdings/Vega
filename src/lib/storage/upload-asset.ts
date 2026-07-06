import { newId, slugify } from "@/lib/id";
import {
  isBlobStorageEnabled,
  mediaPath,
  parseDataUrl,
  putMedia,
} from "@/lib/storage";
import type { MediaAsset } from "@/types/album";

type UploadFile = {
  filename: string;
  dataUrl: string;
  width: number;
  height: number;
  categoryId?: string | null;
};

async function uploadUrls(
  workspaceId: string,
  albumId: string,
  assetId: string,
  dataUrl: string,
): Promise<{ previewUrl: string; originalUrl: string }> {
  if (!isBlobStorageEnabled()) {
    return { previewUrl: dataUrl, originalUrl: dataUrl };
  }

  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    return { previewUrl: dataUrl, originalUrl: dataUrl };
  }

  const ext = parsed.mime.includes("png") ? "png" : "jpg";
  const originalPath = mediaPath(workspaceId, albumId, assetId, "original", ext);
  const previewPath = mediaPath(workspaceId, albumId, assetId, "preview", ext);
  const originalUrl = await putMedia(originalPath, parsed.buffer, parsed.mime);
  const previewUrl = await putMedia(previewPath, parsed.buffer, parsed.mime);
  return { previewUrl, originalUrl };
}

export async function createAssetsFromUpload(
  workspaceId: string,
  albumId: string,
  projectId: string,
  files: UploadFile[],
  baseOrder: number,
): Promise<MediaAsset[]> {
  const assets: MediaAsset[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const assetId = newId();
    const { previewUrl, originalUrl } = await uploadUrls(
      workspaceId,
      albumId,
      assetId,
      file.dataUrl,
    );

    assets.push({
      id: assetId,
      projectId,
      albumId,
      categoryId: file.categoryId ?? null,
      filename: file.filename,
      previewUrl,
      originalUrl,
      width: file.width,
      height: file.height,
      alt: file.filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      sortOrder: baseOrder + i,
      visibleToClient: true,
      visibleOnSite: false,
      selectionState: "none",
    });
  }

  return assets;
}

export async function uploadFinalAsset(
  workspaceId: string,
  albumId: string,
  assetId: string,
  dataUrl: string,
): Promise<string> {
  if (isBlobStorageEnabled()) {
    const parsed = parseDataUrl(dataUrl);
    if (parsed) {
      const ext = parsed.mime.includes("png") ? "png" : "jpg";
      const path = mediaPath(workspaceId, albumId, assetId, "final", ext);
      return putMedia(path, parsed.buffer, parsed.mime);
    }
  }
  return dataUrl;
}

export { slugify };
