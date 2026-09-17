import type { ComponentType, ReactNode } from "react";
import { SUBJECT_FOR_ROUND } from "@/bench/rounds";
import "./takes.css";

export function BenchSubject<P extends object>({
  subject,
  round,
  take,
  takes,
  slotProps,
  children,
}: {
  subject: string;
  round?: string;
  take?: string;
  takes: Record<string, Record<string, ComponentType<P>>>;
  slotProps?: P;
  children: ReactNode;
}) {
  if (!round || !take) return children;
  if (SUBJECT_FOR_ROUND[round] !== subject) return children;
  const Comp = takes[round]?.[take];
  if (!Comp) return children;
  return <Comp {...(slotProps ?? ({} as P))} />;
}
