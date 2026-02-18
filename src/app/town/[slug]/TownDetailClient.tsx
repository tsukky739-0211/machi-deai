"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Town } from "@/types/town";
import SpotCard from "@/components/SpotCard";
import BookmarkButton from "@/components/BookmarkButton";
import ExternalLinkBar from "@/components/ExternalLinkBar";
import Header from "@/components/Header";

interface TownDetailClientProps {
  town: Town;
  relatedTowns: Town[];
}

export default function TownDetailClient({
  town,
  relatedTowns,
}: TownDetailClientProps) {
  const router = useRouter();
  const sortedSpots = [...town.spots].sort((a, b) => b.rank - a.rank);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-14">
        {/* ヒーロー */}
        <div
          className="relative h-64"
          style={
            town.image
              ? {
                  backgroundImage: `url(${town.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {
                  background: `linear-gradient(135deg, ${town.colorFrom} 0%, ${town.colorTo} 100%)`,
                }
          }
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-lg mx-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {town.area}
                  </span>
                  <h1 className="text-4xl font-black mt-2">{town.name}</h1>
                  <p className="text-sm text-white/80 mt-1">{town.catchcopy}</p>
                </div>
                <BookmarkButton slug={town.slug} size="lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 py-8">
          {/* 紹介文 */}
          <p className="text-sm leading-relaxed text-stone-700 mb-6">
            {town.description}
          </p>

          {/* vibeタグ */}
          <div className="flex flex-wrap gap-2 mb-6">
            {town.vibe.map((v) => (
              <span
                key={v}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${town.colorFrom}15`,
                  color: town.colorFrom,
                }}
              >
                {v}
              </span>
            ))}
          </div>

          {/* 基本情報 */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">🚃 アクセス</p>
              <p className="text-sm font-medium">{town.lines.join("・")}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">👥 おすすめ</p>
              <p className="text-sm font-medium">{town.bestFor[0]}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">🏠 1R 家賃相場</p>
              <p className="text-sm font-bold text-accent">
                {town.avgRent.oneRoom}
              </p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">🏠 1LDK 家賃相場</p>
              <p className="text-sm font-bold text-accent">
                {town.avgRent.oneLDK}
              </p>
            </div>
          </div>

          {/* アド街風ランキング */}
          <div className="mb-8">
            <h2 className="text-xl font-black mb-1 flex items-center gap-2">
              <span className="text-accent">🏆</span>
              {town.name}の魅力 TOP10
            </h2>
            <p className="text-xs text-muted mb-4">
              アド街ック天国風ランキングでお届け！
            </p>

            <div className="space-y-3">
              {sortedSpots.map((spot, index) => (
                <SpotCard key={spot.rank} spot={spot} index={index} townName={town.name} />
              ))}
            </div>
          </div>

          {/* 物件検索リンク */}
          <div className="mb-8">
            <h3 className="text-sm font-bold mb-3">
              {town.name}で物件を探す
            </h3>
            <ExternalLinkBar
              suumo={town.externalLinks.suumo}
              homes={town.externalLinks.homes}
              townName={town.name}
            />
          </div>

          {/* 似た街 */}
          {relatedTowns.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold mb-3">
                {town.name}が好きなら、こちらも
              </h3>
              <div className="space-y-2">
                {relatedTowns.map((rt) => (
                  <Link
                    key={rt.slug}
                    href={`/town/${rt.slug}`}
                    className="flex items-center justify-between p-3 bg-white border border-stone-100 rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${rt.colorFrom}, ${rt.colorTo})`,
                        }}
                      />
                      <div>
                        <span className="font-bold text-sm">{rt.name}</span>
                        <span className="text-xs text-muted ml-2">
                          {rt.area}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 戻るボタン */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              ← 戻る
            </button>
            <span className="text-stone-300">|</span>
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              街選びに戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
