"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <nav className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between" aria-label="メインナビゲーション">
        <Link href="/" className="text-lg font-bold tracking-tight" aria-label="街deai ホーム">
          <span className="text-accent">街</span>
          <span className="text-foreground">deai</span>
        </Link>

        <Link
          href="/bookmarks"
          aria-label="保存した街を見る"
          className={`flex items-center gap-1 text-sm transition-colors ${
            pathname === "/bookmarks"
              ? "text-accent font-medium"
              : "text-muted hover:text-foreground"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={pathname === "/bookmarks" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span>保存</span>
        </Link>
      </nav>
    </header>
  );
}
