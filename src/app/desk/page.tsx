import type { Metadata } from "next";
import { OwnerDesk } from "@/components/desk/OwnerDesk";

export const metadata: Metadata = {
  title: "Desk — Iris Calder",
  description: "What's live, a preview, and how to ask for a change.",
  robots: { index: false, follow: false },
};

export default function DeskPage() {
  return <OwnerDesk />;
}
