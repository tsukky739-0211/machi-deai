"use client";

import { useState, useEffect } from "react";
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // スマホキーボード表示時の高さを検知
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const vv = window.visualViewport;
    const update = () => {
      const kbHeight = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardHeight(Math.max(0, kbHeight));
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

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

        {/* 今住んでる街（ボトムシート型） */}
        <div>
          <label className="block text-sm font-bold mb-1.5 text-foreground">
            今住んでる街
            <span className="text-muted font-normal ml-1.5 text-xs">（任意）</span>
          </label>
          <button
            onClick={() => setShowTownList(true)}
            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-left flex items-center justify-between hover:border-stone-300 transition-colors"
          >
            <span className={selectedTown ? "text-foreground" : "text-stone-400"}>
              {selectedTown ? selectedTown.name : "選択してください"}
            </span>
            <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* ボトムシートモーダル */}
        {showTownList && (
          <>
            {/* 背景オーバーレイ */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => { setShowTownList(false); setTownSearch(""); }}
            />
            {/* シート本体 */}
            <div
              className="fixed left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col"
              style={{
                bottom: keyboardHeight,
                maxHeight: `calc(75vh - ${keyboardHeight}px)`,
              }}
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-stone-100 flex-shrink-0">
                <span className="text-sm font-bold text-foreground">今住んでる街</span>
                <button
                  onClick={() => { setShowTownList(false); setTownSearch(""); }}
                  className="text-stone-400 text-sm px-2 py-1"
                >
                  閉じる
                </button>
              </div>
              {/* 検索ボックス */}
              <div className="px-4 py-2.5 border-b border-stone-100 flex-shrink-0">
                <input
                  type="text"
                  placeholder="街名・エリアで検索..."
                  value={townSearch}
                  onChange={(e) => setTownSearch(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  autoFocus
                />
              </div>
              {/* リスト */}
              <div className="overflow-y-auto flex-1">
                {currentSlug && (
                  <button
                    onClick={() => { setCurrentSlug(""); setShowTownList(false); setTownSearch(""); }}
                    className="w-full text-left px-4 py-3 text-sm text-muted hover:bg-stone-50 border-b border-stone-100"
                  >
                    × 選択を解除
                  </button>
                )}
                {[...grouped.entries()].map(([area, areaTowns]) => (
                  <div key={area}>
                    <div className="px-4 py-1.5 bg-stone-50 text-[11px] font-medium text-muted sticky top-0">
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
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between border-b border-stone-50 ${
                          town.slug === currentSlug ? "bg-orange-50" : "hover:bg-stone-50"
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
          </>
        )}

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
