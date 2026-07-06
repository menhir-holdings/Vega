import { NextResponse } from "next/server";
import { isAuthError, requireAuth } from "@/lib/auth/guard";
import { emit } from "@/lib/events";
import { addAlbumToSiteShowcase } from "@/lib/site/showcase";
import { loadStore, mutateStore } from "@/lib/store";

type RouteParams = { params: Promise<{ id: string }> };

type ShowcaseBody = {
  assetIds?: string[];
  sectionTitle?: string;
  subtitle?: string;
  layout?: "masonry" | "horizontal";
  republish?: boolean;
};

export async function POST(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = (await request.json()) as ShowcaseBody;

  let assetCount = 0;
  let albumName = "";
  let siteSlug = "";

  await mutateStore((store) => {
    const album = store.albums.find((a) => a.id === id);
    if (!album) return;
    albumName = album.name;
    const result = addAlbumToSiteShowcase(store, id, body);
    assetCount = result.assetCount;
    siteSlug = store.site.slug;
  });

  if (!albumName) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  await emit({
    type: "album.showcased",
    albumId: id,
    albumName,
    assetCount,
    siteSlug,
  });

  const store = await loadStore();
  const album = store.albums.find((a) => a.id === id);

  return NextResponse.json({
    ok: true,
    showcasedAt: album?.showcasedAt,
    assetCount,
    siteUrl: `/s/${siteSlug}`,
  });
}
