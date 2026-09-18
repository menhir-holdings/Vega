import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk — Vega",
  description: "Production status, live preview, and a change request.",
  robots: { index: false, follow: false },
};

export default function DeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
