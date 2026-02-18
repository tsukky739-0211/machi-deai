"use client";

import type { Town } from "@/types/town";
import BookmarkButton from "./BookmarkButton";

interface TownCardProps {
  town: Town;
  onTap?: () => void;
}

export default function TownCard({ town, onTap }: TownCardProps) {
  return (
    <div
      className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-card-bg cursor-pointer no-select"
      onClick={onTap}
    >
      {/* 背景画像 or カラーグラデーション */}
      <div
        className="absolute inset-0"
        style={
          town.image
            ? {
                backgroundImage: `url(${town.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background: `linear-gradient(135deg, ${town.colorFrom}22 0%, ${town.colorTo}44 50%, ${town.colorFrom}11 100%)`,
              }
        }
      />
      {/* 街名の大きなウォーターマーク */}
      {!town.image && (
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black opacity-[0.06] pointer-events-none whitespace-nowrap"
          style={{ color: town.colorFrom }}
        >
          {town.name}
        </div>
      )}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* ブックマークボタン */}
      <div className="absolute top-4 right-4 z-10">
        <BookmarkButton slug={town.slug} size="md" />
      </div>

      {/* エリアバッジ */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-700">
          {town.area}
        </span>
      </div>

      {/* コンテンツ */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-3xl font-black mb-1">{town.name}</h2>
        <p className="text-sm text-white/80 mb-3">{town.catchcopy}</p>

        {/* vibeタグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {town.vibe.map((v) => (
            <span
              key={v}
              className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs"
            >
              {v}
            </span>
          ))}
        </div>

        {/* 家賃 */}
        <div className="flex items-center gap-4 text-xs text-white/70">
          <span>1R {town.avgRent.oneRoom}</span>
          <span>1K {town.avgRent.oneK}</span>
          <span>1LDK {town.avgRent.oneLDK}</span>
        </div>

        {/* タップ誘導 */}
        <div className="mt-4 text-center text-xs text-white/50">
          タップして街の魅力を見る →
        </div>
      </div>
    </div>
  );
}
