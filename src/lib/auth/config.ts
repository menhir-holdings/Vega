export type AuthMode = "disabled" | "owner" | "clerk";

export function getAuthMode(): AuthMode {
  if (process.env.VEGA_AUTH_DISABLED === "true") return "disabled";
  if (process.env.CLERK_SECRET_KEY) return "clerk";
  return "owner";
}

export function isAuthEnabled(): boolean {
  return getAuthMode() !== "disabled";
}
