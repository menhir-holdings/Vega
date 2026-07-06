import { NextResponse } from "next/server";
import { isAuthError, requireAuth } from "@/lib/auth/guard";
import { emit } from "@/lib/events";
import { deliveryToken, newId, slugify } from "@/lib/id";
import { loadStore, mutateStore } from "@/lib/store";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const store = await loadStore();
  const session = store.deliverySessions.find((s) => s.albumId === id);
  return NextResponse.json({ session: session ?? null });
}

export async function POST(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = (await request.json()) as {
    pin?: string;
    clientEmail?: string;
    openForPicking?: boolean;
  };

  let token = "";
  let albumName = "";

  await mutateStore((store) => {
    const album = store.albums.find((a) => a.id === id);
    if (!album) return;
    albumName = album.name;

    let session = store.deliverySessions.find((s) => s.albumId === id);
    if (!session) {
      token = deliveryToken();
      session = {
        id: newId(),
        albumId: id,
        token,
        pin: body.pin,
        clientEmail: body.clientEmail,
        createdAt: new Date().toISOString(),
      };
      store.deliverySessions.push(session);
    } else {
      token = session.token;
      if (body.pin !== undefined) session.pin = body.pin || undefined;
      if (body.clientEmail !== undefined) session.clientEmail = body.clientEmail || undefined;
    }

    if (body.openForPicking && album.deliveryState === "draft") {
      album.deliveryState = "ready_to_pick";
    }
  });

  if (!token) return NextResponse.json({ error: "Album not found" }, { status: 404 });

  if (body.openForPicking) {
    await emit({
      type: "delivery.opened",
      albumId: id,
      albumName,
      token,
    });
  }

  return NextResponse.json({ token });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = (await request.json()) as { pin?: string; clientEmail?: string };

  let token = "";

  await mutateStore((store) => {
    const session = store.deliverySessions.find((s) => s.albumId === id);
    if (!session) return;
    token = session.token;
    if (body.pin !== undefined) session.pin = body.pin || undefined;
    if (body.clientEmail !== undefined) session.clientEmail = body.clientEmail || undefined;
  });

  if (!token) return NextResponse.json({ error: "No delivery session" }, { status: 404 });
  return NextResponse.json({ token });
}
