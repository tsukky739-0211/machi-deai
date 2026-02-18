"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllTowns, getCommuteStations } from "@/lib/towns";
import VibePicker from "@/components/VibePicker";
import StationInput from "@/components/StationInput";

export default function Home() {
  const router = useRouter();
  const towns = getAllTowns();
  const commuteStations = getCommuteStations();

  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string>("");
  const [commuteStation, setCommuteStation] = useState("");
  const [showTownList, setShowTownList] = useState(false);
  const [townSearch, setTownSearch] = useState("");

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId) ? prev.filter((v) => v !== vibeId) : [...prev, vibeId]
    );
  };

  const canProceed = selectedVibes.length > 0;

  const handleDiscover = () => {
    const params = new URLSearchParams();
    params.set("vibes", selectedVibes.join(","));
    if (currentSlug) params.set("current", currentSlug);
    if (commuteStation) params.set("commute", commuteStation);
    router.push(`/discover?${params.toString()}`);
  };

  const selectedTown = towns.find((t) => t.slug === currentSlug);

  const filteredTowns = townSearch
    ? towns.filter(
        (t) =>
          t.name.includes(townSearch) ||
          t.area.includes(townSearch) ||
          t.station.some((s) => s.includes(townSearch))
      )
    : towns;

  // エリアごとにグルーピング
  const grouped = new Map<string, typeof towns>();
  for (const town of filteredTowns) {
    if (!grouped.has(town.area)) grouped.set(town.area, []);
    grouped.get(town.area)!.push(town);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ヒーロー（コンパクト版） */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white px-6 pt-12 pb-5">
        <div className="max-w-lg mx-auto">
          <span className="text-lg font-black tracking-tight">
            街<span className="text-white/70">deai</span>
          </span>
          <p className="text-sm text-white/90 mt-1">
            好みを選んで、ぴったりの穴場な街を見つけよう
          </p>
        </div>
      </div>

      {/* フォーム */}
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-5 space-y-5">
        {/* どんな暮らしがしたい？ */}
        <VibePicker
          selectedVibes={selectedVibes}
          onToggle={toggleVibe}
        />

        {/* 今住んでる街（ドロップダウン型） */}
        <div>
          <label className="block text-sm font-bold mb-1.5 text-foreground">
            今住んでる街
            <span className="text-muted font-normal ml-1.5 text-xs">（任意）</span>
          </label>
          <button
            onClick={() => setShowTownList(!showTownList)}
            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-left flex items-center justify-between hover:border-stone-300 transition-colors"
          >
            <span className={selectedTown ? "text-foreground" : "text-stone-400"}>
              {selectedTown ? selectedTown.name : "選択してください"}
            </span>
            <svg
              className={`w-4 h-4 text-stone-400 transition-transform ${showTownList ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showTownList && (
            <div className="mt-1.5 border border-stone-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="p-2 border-b border-stone-100">
                <input
                  type="text"
                  placeholder="街名・エリアで検索..."
                  value={townSearch}
                  onChange={(e) => setTownSearch(e.target.value)}
                  className="w-full px-3 py-1.5 bg-stone-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent/30"
                  autoFocus
                />
              </div>
              {/* 選択中なら解除ボタン */}
              {currentSlug && (
                <button
                  onClick={() => {
                    setCurrentSlug("");
                    setShowTownList(false);
                    setTownSearch("");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-muted hover:bg-stone-50 border-b border-stone-100"
                >
                  × 選択を解除
                </button>
              )}
              <div className="max-h-48 overflow-y-auto">
                {[...grouped.entries()].map(([area, areaTowns]) => (
                  <div key={area}>
                    <div className="px-3 py-1 bg-stone-50 text-[11px] font-medium text-muted sticky top-0">
                      {area}
                    </div>
                    {areaTowns.map((town) => (
                      <button
                        key={town.slug}
                        onClick={() => {
                          setCurrentSlug(town.slug === currentSlug ? "" : town.slug);
                          setShowTownList(false);
                          setTownSearch("");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 flex items-center justify-between ${
                          town.slug === currentSlug ? "bg-orange-50" : ""
                        }`}
                      >
                        <span>{town.name}</span>
                        {town.slug === currentSlug && (
                          <span className="text-accent text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 通勤先 */}
        <StationInput
          stations={commuteStations}
          value={commuteStation}
          onChange={setCommuteStation}
        />

        {/* アクションボタン（選択時にアニメーション出現） */}
        <div className="sticky bottom-4 z-30">
          <button
            onClick={handleDiscover}
            disabled={!canProceed}
            className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-300 ${
              canProceed
                ? "bg-accent text-white hover:bg-orange-600 shadow-lg shadow-orange-200/50 translate-y-0 opacity-100"
                : "bg-stone-200 text-stone-400 cursor-not-allowed translate-y-2 opacity-60"
            }`}
          >
            {canProceed
              ? `${selectedVibes.length}つのスタイルで街を探す →`
              : "好みを1つ以上選んでね"}
          </button>
        </div>
      </div>
    </div>
  );
}
