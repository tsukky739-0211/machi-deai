"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCommuteStations } from "@/lib/towns";
import VibePicker from "@/components/VibePicker";
import StationInput from "@/components/StationInput";

export default function Home() {
  const router = useRouter();
  const commuteStations = getCommuteStations();

  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [currentTown, setCurrentTown] = useState("");
  const [commuteStation, setCommuteStation] = useState("");

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId) ? prev.filter((v) => v !== vibeId) : [...prev, vibeId]
    );
  };

  const canProceed = selectedVibes.length > 0;

  const handleDiscover = () => {
    const params = new URLSearchParams();
    params.set("vibes", selectedVibes.join(","));
    if (commuteStation) params.set("commute", commuteStation);
    router.push(`/discover?${params.toString()}`);
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

        {/* 今住んでる街（フリーテキスト） */}
        <div>
          <label className="block text-sm font-bold mb-1.5 text-foreground">
            今住んでる街
            <span className="text-muted font-normal ml-1.5 text-xs">（任意）</span>
          </label>
          <input
            type="text"
            placeholder="例: 品川、世田谷、吉祥寺..."
            value={currentTown}
            onChange={(e) => setCurrentTown(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
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
