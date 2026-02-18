"use client";

import { useState, useMemo } from "react";
import type { Town } from "@/types/town";

interface TownPickerProps {
  towns: Town[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
  label: string;
  multiple?: boolean;
}

// 人気の街をクイックピック表示
const POPULAR_SLUGS = [
  "shimokitazawa",
  "kichijoji",
  "nakameguro",
  "koenji",
  "sangenjaya",
  "jiyugaoka",
  "ebisu",
  "kitasenju",
  "asakusa",
];

export default function TownPicker({
  towns,
  selectedSlugs,
  onToggle,
  label,
  multiple = true,
}: TownPickerProps) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const popularTowns = useMemo(
    () => POPULAR_SLUGS.map((s) => towns.find((t) => t.slug === s)).filter(Boolean) as Town[],
    [towns]
  );

  const filtered = useMemo(() => {
    if (!search) return towns;
    const q = search.toLowerCase();
    return towns.filter(
      (t) =>
        t.name.includes(q) ||
        t.area.includes(q) ||
        t.station.some((s) => s.includes(q)) ||
        t.slug.includes(q)
    );
  }, [towns, search]);

  // エリアごとにグルーピング
  const grouped = useMemo(() => {
    const map = new Map<string, Town[]>();
    for (const town of filtered) {
      const key = town.area;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(town);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <label className="block text-sm font-bold mb-2 text-foreground">
        {label}
        {multiple && (
          <span className="text-muted font-normal ml-2">（複数選択OK）</span>
        )}
      </label>

      {/* クイックピック（人気の街） */}
      {!search && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {popularTowns.map((town) => {
            const isSelected = selectedSlugs.includes(town.slug);
            return (
              <button
                key={town.slug}
                onClick={() => {
                  if (!multiple && !isSelected) {
                    selectedSlugs.forEach((s) => onToggle(s));
                  }
                  onToggle(town.slug);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
                style={
                  isSelected
                    ? { background: `linear-gradient(135deg, ${town.colorFrom}, ${town.colorTo})` }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={
                    isSelected
                      ? { backgroundColor: "white" }
                      : { background: `linear-gradient(135deg, ${town.colorFrom}, ${town.colorTo})` }
                  }
                />
                {town.name}
              </button>
            );
          })}
        </div>
      )}

      {/* 選択中の街（クイックピックに含まれない街のみ表示） */}
      {selectedSlugs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedSlugs
            .filter((slug) => !POPULAR_SLUGS.includes(slug))
            .map((slug) => {
              const town = towns.find((t) => t.slug === slug);
              if (!town) return null;
              return (
                <button
                  key={slug}
                  onClick={() => onToggle(slug)}
                  className="flex items-center gap-1 px-3 py-1 text-white rounded-full text-xs font-medium"
                  style={{ background: `linear-gradient(135deg, ${town.colorFrom}, ${town.colorTo})` }}
                >
                  {town.name}
                  <span className="ml-0.5">×</span>
                </button>
              );
            })}
        </div>
      )}

      {/* 検索 + 全リスト展開 */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="街名・エリアで検索..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowAll(true);
          }}
          onFocus={() => setShowAll(true)}
          className="flex-1 px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
        {!search && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-2 bg-stone-100 text-stone-500 rounded-xl text-xs hover:bg-stone-200 transition-colors whitespace-nowrap"
          >
            {showAll ? "閉じる" : "全て表示"}
          </button>
        )}
      </div>

      {/* 街一覧（展開時のみ） */}
      {showAll && (
        <div className="max-h-56 overflow-y-auto border border-stone-200 rounded-xl bg-white">
          {[...grouped.entries()].map(([area, areaTowns]) => (
            <div key={area}>
              <div className="px-3 py-1.5 bg-stone-50 text-xs font-medium text-muted sticky top-0 z-10">
                {area}
              </div>
              {areaTowns.map((town) => {
                const isSelected = selectedSlugs.includes(town.slug);
                return (
                  <button
                    key={town.slug}
                    onClick={() => {
                      if (!multiple && !isSelected) {
                        selectedSlugs.forEach((s) => onToggle(s));
                      }
                      onToggle(town.slug);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-stone-50 transition-colors ${
                      isSelected ? "bg-accent-light" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${town.colorFrom}, ${town.colorTo})`,
                        }}
                      />
                      {town.name}
                      <span className="text-muted text-xs">
                        {town.station[0]}
                      </span>
                    </span>
                    {isSelected && (
                      <span className="text-accent text-xs font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
