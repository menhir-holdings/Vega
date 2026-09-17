import Link from "next/link";
import { photographer } from "@/lib/public-site";

export function PublicHeader() {
  return (
    <header className="px-[var(--space-sm)] pt-6 pb-5 sm:px-[var(--space-md)] sm:pt-8">
      <div className="flex items-baseline justify-between gap-6">
        <Link href="/" className="text-sheet text-ink">
          {photographer.name}
        </Link>
        <a
          href={`mailto:${photographer.email}`}
          className="text-sheet text-right text-ink-muted transition-colors duration-500 hover:text-ink"
        >
          {photographer.email}
        </a>
      </div>
    </header>
  );
}
