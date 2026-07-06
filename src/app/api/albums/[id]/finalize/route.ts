import { NextResponse } from "next/server";
import { isAuthError, requireAuth } from "@/lib/auth/guard";
import { emit } from "@/lib/events";
import { mutateStore } from "@/lib/store";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = (await request.json()) as { releaseDownloads?: boolean };

  let token = "";
  let albumName = "";
  let clientEmail: string | undefined;

  await mutateStore(async (store) => {
    const album = store.albums.find((a) => a.id === id);
    if (!album) return;

    const session = store.deliverySessions.find((s) => s.albumId === id);
    albumName = album.name;
    token = session?.token ?? "";
    clientEmail = session?.clientEmail;

    album.assets.forEach((asset) => {
      if (asset.selectionState === "picked" && !asset.finalUrl) {
        asset.finalUrl = asset.originalUrl ?? asset.previewUrl;
      }
    });

    if (body.releaseDownloads !== false) {
      album.deliveryState = "finalized";
      if (session) session.finalizedAt = new Date().toISOString();
    }
  });

  if (!albumName) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  await emit({
    type: "finals.released",
    albumId: id,
    albumName,
    token,
    clientEmail,
  });

  return NextResponse.json({ ok: true });
}
