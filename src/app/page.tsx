"use client";

import { useState, useMemo, useRef } from "react";
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

  // 今住んでる街：直接入力型
  const [townInput, setTownInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const townInputRef = useRef<HTMLInputElement>(null);

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

  // サジェスト候補：入力文字にマッチする街（最大8件）
  const suggestions = useMemo(() => {
    if (!townInput) return [];
    return towns
      .filter(
        (t) =>
          t.name.includes(townInput) ||
          t.area.includes(townInput) ||
          t.station.some((s) => s.includes(townInput))
      )
      .slice(0, 8);
  }, [towns, townInput]);

  // 選択中の街オブジェクト
  const selectedTown = towns.find((t) => t.slug === currentSlug);

  // 街を選択したとき
  const handleSelectTown = (slug: string, name: string) => {
    setCurrentSlug(slug);
    setTownInput(name);
    setShowSuggestions(false);
  };

  // クリア
  const handleClearTown = () => {
    setCurrentSlug("");
    setTownInput("");
    setShowSuggestions(false);
    townInputRef.current?.focus();
  };

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

        {/* 今住んでる街（インライン入力＋サジェスト型） */}
        <div>
          <label className="block text-sm font-bold mb-1.5 text-foreground">
            今住んでる街
            <span className="text-muted font-normal ml-1.5 text-xs">（任意）</span>
          </label>
          <div className="relative">
            <input
              ref={townInputRef}
              type="text"
              placeholder="例: 下北沢、吉祥寺、世田谷..."
              value={townInput}
              onChange={(e) => {
                setTownInput(e.target.value);
                setCurrentSlug(""); // 手入力中は slug をクリア
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent pr-8"
            />
            {/* クリアボタン */}
            {townInput && (
              <button
                onMouseDown={(e) => { e.preventDefault(); handleClearTown(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-lg leading-none"
              >
                ×
              </button>
            )}

            {/* サジェストドロップダウン */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-20 overflow-hidden max-h-52 overflow-y-auto">
                {suggestions.map((town) => (
                  <button
                    key={town.slug}
                    onMouseDown={() => handleSelectTown(town.slug, town.name)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 transition-colors flex items-center justify-between border-b border-stone-50 last:border-0"
                  >
                    <span>{town.name}</span>
                    <span className="text-xs text-muted">{town.area}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* 選択確定済みの表示 */}
          {selectedTown && (
            <p className="text-xs text-accent mt-1.5 flex items-center gap-1">
              <span>✓</span>
              <span>{selectedTown.name}（{selectedTown.area}）を選択中</span>
            </p>
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
