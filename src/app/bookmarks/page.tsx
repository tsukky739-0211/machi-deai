"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBookmarks } from "@/lib/bookmarks";
import { getAllTowns } from "@/lib/towns";
import type { Town } from "@/types/town";
import BookmarkButton from "@/components/BookmarkButton";
import Header from "@/components/Header";

export default function BookmarksPage() {
  const [bookmarkedTowns, setBookmarkedTowns] = useState<Town[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const slugs = getBookmarks();
    const allTowns = getAllTowns();
    const towns = slugs
      .map((slug) => allTowns.find((t) => t.slug === slug))
      .filter((t): t is Town => t !== undefined);
    setBookmarkedTowns(towns);
  }, [refreshKey]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 pb-8 px-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-black mb-1 pt-4">保存した街</h1>
          <p className="text-sm text-muted mb-6">
            気になった街をここにまとめています
          </p>

          {bookmarkedTowns.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">💝</p>
              <p className="text-muted text-sm mb-4">
                まだ保存した街がありません
              </p>
              <Link
                href="/"
                className="text-accent text-sm font-medium hover:underline"
              >
                街を探しに行く →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedTowns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/town/${town.slug}`}
                  className="flex items-center gap-4 p-4 bg-white border border-stone-100 rounded-2xl hover:bg-stone-50 transition-colors"
                >
                  {/* カラーアイコン */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${town.colorFrom}, ${town.colorTo})`,
                    }}
                  >
                    <span className="text-white text-base font-black">
                      {town.name.slice(0, 1)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">{town.name}</h3>
                      <span className="text-xs text-muted">{town.area}</span>
                    </div>
                    <p className="text-xs text-muted truncate">
                      {town.catchcopy}
                    </p>
                  </div>

                  <div onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}>
                    <BookmarkButton
                      slug={town.slug}
                      size="sm"
                      onToggle={() => setRefreshKey((k) => k + 1)}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
