import { NextResponse } from "next/server";
import { isAuthError, requireAuth } from "@/lib/auth/guard";
import { newId, slugify } from "@/lib/id";
import { loadStore, mutateStore } from "@/lib/store";
import type { Category } from "@/types/album";

type RouteParams = { params: Promise<{ id: string }> };

type CategoryBody = {
  action: "create" | "rename" | "delete" | "reorder";
  name?: string;
  categoryId?: string;
  order?: string[];
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireAuth();
  if (isAuthError(auth)) return auth;

  const { id } = await params;
  const body = (await request.json()) as CategoryBody;

  let found = false;

  await mutateStore((store) => {
    const album = store.albums.find((a) => a.id === id);
    if (!album) return;
    found = true;

    if (body.action === "create" && body.name) {
      const cat: Category = {
        id: newId(),
        albumId: id,
        name: body.name,
        slug: slugify(body.name),
        sortOrder: album.categories.length,
      };
      album.categories.push(cat);
    }

    if (body.action === "rename" && body.categoryId && body.name) {
      const cat = album.categories.find((c) => c.id === body.categoryId);
      if (cat) {
        cat.name = body.name;
        cat.slug = slugify(body.name);
      }
    }

    if (body.action === "delete" && body.categoryId) {
      album.categories = album.categories.filter((c) => c.id !== body.categoryId);
      album.assets.forEach((a) => {
        if (a.categoryId === body.categoryId) a.categoryId = null;
      });
    }

    if (body.action === "reorder" && body.order) {
      body.order.forEach((catId, index) => {
        const cat = album.categories.find((c) => c.id === catId);
        if (cat) cat.sortOrder = index;
      });
      album.categories.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  });

  if (!found) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  const store = await loadStore();
  const album = store.albums.find((a) => a.id === id);
  return NextResponse.json({ categories: album?.categories ?? [] });
}
