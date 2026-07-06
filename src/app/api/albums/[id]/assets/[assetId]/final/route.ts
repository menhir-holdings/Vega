import { NextResponse } from "next/server";
import { isAuthError, requireAuth } from "@/lib/auth/guard";
import { uploadFinalAsset } from "@/lib/storage/upload-asset";
import { mutateStore } from "@/lib/store";

type RouteParams = { params: Promise<{ id: string; assetId: string }> };

export async function POST(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id, assetId } = await params;
  const body = (await request.json()) as { dataUrl: string };

  if (!body.dataUrl) {
    return NextResponse.json({ error: "No image data" }, { status: 400 });
  }

  let finalUrl = "";

  await mutateStore(async (store) => {
    const album = store.albums.find((a) => a.id === id);
    if (!album) return;

    const asset = album.assets.find((a) => a.id === assetId);
    if (!asset) return;

    finalUrl = await uploadFinalAsset(store.workspace.id, id, assetId, body.dataUrl);
    asset.finalUrl = finalUrl;
  });

  if (!finalUrl) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json({ finalUrl });
}
