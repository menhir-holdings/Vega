import { NextResponse } from "next/server";
import { getAuthMode } from "./config";

export type AuthContext = {
  userId: string;
  workspaceId: string;
};

/**
 * Validates write access to the workspace.
 * v1: owner mode trusts a single workspace; clerk mode is a stub for Phase 2.
 */
export async function requireAuth(): Promise<AuthContext | NextResponse> {
  const mode = getAuthMode();

  if (mode === "disabled") {
    return { userId: "dev", workspaceId: "default" };
  }

  if (mode === "clerk") {
    // Phase 2: import { auth } from "@clerk/nextjs/server"
    // const { userId } = await auth();
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json(
      { error: "Clerk auth not wired — set VEGA_AUTH_DISABLED=true or complete clerk.ts" },
      { status: 501 },
    );
  }

  // Owner mode: single-workspace deployment; session cookie or API key later
  return { userId: "owner", workspaceId: "default" };
}

export function isAuthError(
  result: AuthContext | NextResponse,
): result is NextResponse {
  return result instanceof NextResponse;
}
