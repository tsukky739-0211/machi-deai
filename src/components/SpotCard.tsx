"use client";

import type { Spot } from "@/types/town";

interface SpotCardProps {
  spot: Spot;
  index: number;
  townName?: string;
}

export default function SpotCard({ spot, index, townName }: SpotCardProps) {
  const isTopThree = spot.rank <= 3;
  const isFirst = spot.rank === 1;

  const mapQuery = townName
    ? encodeURIComponent(`${spot.name} ${townName}`)
    : encodeURIComponent(spot.name);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div
      className={`spot-card flex gap-4 p-4 rounded-2xl ${
        isFirst
          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300"
          : isTopThree
          ? "bg-orange-50/50 border border-orange-200"
          : "bg-white border border-stone-100"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* ランク番号 */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center">
        <span
          className={`font-black ${
            isFirst
              ? "text-4xl text-amber-500"
              : isTopThree
              ? "text-3xl text-orange-400"
              : "text-2xl text-stone-400"
          }`}
        >
          {spot.rank}
        </span>
        <span className="text-[10px] text-muted -mt-1">位</span>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{spot.icon}</span>
          <h4 className={`font-bold truncate ${isFirst ? "text-lg" : "text-base"}`}>
            {spot.name}
          </h4>
        </div>
        <span className="inline-block px-2 py-0.5 bg-stone-100 rounded-full text-[10px] text-muted mb-2">
          {spot.category}
        </span>
        <p className="text-sm text-stone-600 leading-relaxed">
          {spot.description}
        </p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:text-orange-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Googleマップで見る
        </a>
      </div>
    </div>
  );
}
