"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { photographer } from "@/lib/public-site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#inquire", label: "Inquire" },
];

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("hashchange", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("hashchange", onStoreChange);
  };
}

function getOverPlate() {
  return window.scrollY < window.innerHeight * 0.72;
}

export function PublicHeader() {
  const overPlate = useSyncExternalStore(
    subscribeScroll,
    getOverPlate,
    () => true,
  );

  const onPlate = overPlate
    ? "text-[var(--vega-paper-elevated)]"
    : "text-ink";
  const navOnPlate = overPlate
    ? "text-[var(--vega-paper-elevated)]/80 hover:text-[var(--vega-paper-elevated)]"
    : "text-ink-muted hover:text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-700 ease-[var(--ease-cinematic)] ${
        overPlate ? "" : "border-b border-line bg-paper/92 backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-[var(--space-sm)] py-5 sm:px-[var(--space-md)] sm:py-6">
        <Link
          href="/"
          className={`text-[0.8125rem] tracking-[0.16em] uppercase transition-colors duration-700 ${onPlate}`}
        >
          {photographer.name}
        </Link>
        <nav className="flex items-center gap-7 sm:gap-10" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.8125rem] tracking-[0.12em] transition-[color,transform] duration-500 ease-[var(--ease-cinematic)] hover:translate-y-[-2px] ${navOnPlate}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
