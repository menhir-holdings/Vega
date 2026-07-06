/**
 * Clerk provider wiring — Phase 2.
 *
 * 1. npm install @clerk/nextjs
 * 2. Set CLERK_SECRET_KEY + NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
 * 3. Wrap app in ClerkProvider (src/app/layout.tsx)
 * 4. Add sign-in at /sign-in
 * 5. Map clerk userId → workspace.ownerId in requireAuth()
 */

export const CLERK_SETUP = {
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  afterSignInUrl: "/admin",
} as const;
