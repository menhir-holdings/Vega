import Link from "next/link";
import { photographer } from "@/lib/public-site";

export function PublicHeader() {
  return (
    <header className="px-[var(--space-sm)] pt-7 pb-2 sm:px-[var(--space-md)] sm:pt-9">
      <div className="flex items-baseline justify-between gap-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-serif)] text-[1.0625rem] italic tracking-[-0.01em] text-ink"
        >
          {photographer.name}
        </Link>
        <a
          href={`mailto:${photographer.email}`}
          className="font-[family-name:var(--font-serif)] text-[0.9375rem] text-ink-muted transition-colors duration-500 hover:text-ink"
        >
          {photographer.email}
        </a>
      </div>
    </header>
  );
}
