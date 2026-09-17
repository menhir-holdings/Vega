export const SUBJECT_FOR_ROUND: Record<string, string> = {
  "hero-r1": "opening-bleed",
  "desk-r1": "owner-desk",
};

export function firstQuery(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
