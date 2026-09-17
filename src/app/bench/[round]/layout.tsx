import type { Metadata } from "next";
import "../bench-shell.css";

export const metadata: Metadata = {
  title: "Bench — Vega",
  robots: { index: false, follow: false },
};

export default function BenchRoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
