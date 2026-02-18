"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { getAllTowns } from "@/lib/towns";
import { getRecommendedTowns } from "@/lib/recommend";
import { getVibeTagsFromCategories } from "@/lib/vibes";
import Header from "@/components/Header";

const SwipeStack = dynamic(() => import("@/components/SwipeStack"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-muted">読み込み中...</p>
      </div>
    </div>
  ),
});

function DiscoverContent() {
  const searchParams = useSearchParams();
  const [bgImage, setBgImage] = useState<string>("");

  const recommendedTowns = useMemo(() => {
    const allTowns = getAllTowns();
    const currentSlug = searchParams.get("current") || undefined;
    const commuteStation = searchParams.get("commute") || undefined;

    // vibeベースモード（新）
    const vibeIds = (searchParams.get("vibes") || "")
      .split(",")
      .filter(Boolean);
    if (vibeIds.length > 0) {
      const vibeTags = getVibeTagsFromCategories(vibeIds);
      return getRecommendedTowns(allTowns, {
        vibeTags,
        currentSlug,
        commuteStation,
        commuteMaxMinutes: 30,
      });
    }

    // 従来モード（後方互換）
    const favoriteSlugs = (searchParams.get("favorites") || "")
      .split(",")
      .filter(Boolean);
    if (favoriteSlugs.length === 0) return allTowns;

    return getRecommendedTowns(allTowns, {
      favoriteSlugs,
      currentSlug,
      commuteStation,
      commuteMaxMinutes: 30,
    });
  }, [searchParams]);

  const handleIndexChange = useCallback((_index: number, imageUrl: string) => {
    setBgImage(imageUrl);
  }, []);

  return (
    <div className="min-h-screen pt-16 pb-8 px-4">
      {/* 街写真の背景ブラー */}
      {bgImage && (
        <>
          <div
            className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url(${bgImage})`,
              filter: "blur(40px) saturate(0.6)",
              transform: "scale(1.15)",
              opacity: 0.3,
            }}
          />
          <div className="fixed inset-0 -z-10 bg-white/55" />
        </>
      )}
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm text-muted">
            {recommendedTowns.length}件の街が見つかりました
          </p>
        </div>
        <SwipeStack towns={recommendedTowns} onIndexChange={handleIndexChange} />
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen pt-16 flex items-center justify-center">
            <p className="text-muted">読み込み中...</p>
          </div>
        }
      >
        <DiscoverContent />
      </Suspense>
    </>
  );
}
