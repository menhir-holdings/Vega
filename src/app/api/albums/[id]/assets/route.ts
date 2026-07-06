import { NextResponse } from "next/server";
import { isAuthError, requireAuth } from "@/lib/auth/guard";
import { createAssetsFromUpload, slugify } from "@/lib/storage/upload-asset";
import { mutateStore } from "@/lib/store";
import type { Category, MediaAsset } from "@/types/album";

type RouteParams = { params: Promise<{ id: string }> };

type UploadBody = {
  files: Array<{
    filename: string;
    dataUrl: string;
    width: number;
    height: number;
    categoryName?: string;
  }>;
  categoryId?: string | null;
};

function ensureCategory(
  album: { id: string; categories: Category[] },
  name: string,
): string {
  const slug = slugify(name);
  let cat = album.categories.find((c) => c.slug === slug);
  if (!cat) {
    cat = {
      id: crypto.randomUUID(),
      albumId: album.id,
      name,
      slug,
      sortOrder: album.categories.length,
    };
    album.categories.push(cat);
  }
  return cat.id;
}

export async function POST(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = (await request.json()) as UploadBody;

  if (!body.files?.length) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
  }

  let added: MediaAsset[] = [];

  const store = await mutateStore(async (s) => {
    const album = s.albums.find((a) => a.id === id);
    if (!album) return;

    const baseOrder = album.assets.length;
    const filesWithCat = body.files.map((file) => {
      let categoryId = body.categoryId ?? null;
      if (file.categoryName && !categoryId) {
        categoryId = ensureCategory(album, file.categoryName);
      }
      return {
        filename: file.filename,
        dataUrl: file.dataUrl,
        width: file.width,
        height: file.height,
        categoryId,
      };
    });

    added = await createAssetsFromUpload(
      s.workspace.id,
      album.id,
      album.projectId,
      filesWithCat,
      baseOrder,
    );

    album.assets.push(...added);
    if (!album.coverAssetId && added[0]) album.coverAssetId = added[0].id;
  });

  if (!added.length) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  void store;
  return NextResponse.json({ assets: added }, { status: 201 });
}
