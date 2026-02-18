"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCommuteStations } from "@/lib/towns";
import VibePicker from "@/components/VibePicker";
import StationInput from "@/components/StationInput";

const HERO_PHOTOS = [
  {
    id: "-PmHLX2uA-Q",
    url: "https://images.unsplash.com/photo-1648741528255-e98d7ccda4e8?w=1920&q=80&auto=format&fit=crop",
    credit: "Akira Cake",
  },
  {
    id: "h8x0r_z5n00",
    url: "https://images.unsplash.com/photo-1571480123735-ccfda9fc80e9?w=1920&q=80&auto=format&fit=crop",
    credit: "Antonio Prado",
  },
  {
    id: "2X_YEy3-BfM",
    url: "https://images.unsplash.com/photo-1658411418966-ade6a13498ee?w=1920&q=80&auto=format&fit=crop",
    credit: "ayumi kubo",
  },
  {
    id: "cafe",
    url: "https://images.unsplash.com/photo-1769321868432-88627d9fd330?w=1920&q=80&auto=format&fit=crop",
    credit: "Unsplash",
  },
  {
    id: "shitamachi",
    url: "https://images.unsplash.com/photo-1709455237000-678076b41f64?w=1920&q=80&auto=format&fit=crop",
    credit: "Unsplash",
  },
  {
    id: "nature",
    url: "https://images.unsplash.com/photo-1588696495448-8992d308d878?w=1920&q=80&auto=format&fit=crop",
    credit: "Unsplash",
  },
  {
    id: "family",
    url: "https://images.unsplash.com/photo-1593343740156-66bce45d7c38?w=1920&q=80&auto=format&fit=crop",
    credit: "Unsplash",
  },
  {
    id: "urban",
    url: "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?w=1920&q=80&auto=format&fit=crop",
    credit: "Unsplash",
  },
];

export default function Home() {
  const router = useRouter();
  const commuteStations = getCommuteStations();

  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [currentTown, setCurrentTown] = useState("");
  const [commuteStation, setCommuteStation] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // 5秒ごとに写真を切り替え
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setPhotoIndex((prev) => (prev + 1) % HERO_PHOTOS.length);
        setFadeIn(true);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
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
    if (commuteStation) params.set("commute", commuteStation);
    router.push(`/discover?${params.toString()}`);
  };

  const currentPhoto = HERO_PHOTOS[photoIndex];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヒーロー：全画面背景写真 */}
      <div className="relative min-h-[44vh] flex items-end overflow-hidden">
        {/* 背景写真 */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${currentPhoto.url})`,
            opacity: fadeIn ? 1 : 0,
          }}
        />
        {/* ダークオーバーレイ（下が濃い） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* コピー */}
        <div className="relative z-10 px-6 pb-8 pt-16 max-w-lg mx-auto w-full">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-2 font-medium">
            Tokyo Neighborhood Guide
          </p>
          <h1 className="text-white text-3xl font-black leading-tight tracking-tight mb-1">
            まだ知らない街が、<br />東京にはある。
          </h1>
          <p className="text-white/70 text-sm mt-2">
            あなたのセンスで、住みたい街を見つけよう
          </p>

          {/* 写真インジケーター */}
          <div className="flex gap-1.5 mt-4">
            {HERO_PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFadeIn(false); setTimeout(() => { setPhotoIndex(i); setFadeIn(true); }, 300); }}
                className={`h-0.5 rounded-full transition-all duration-300 ${i === photoIndex ? "w-6 bg-white" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        {/* フォト credits */}
        <p className="absolute bottom-2 right-3 text-white/30 text-[10px] z-10">
          Photo: {currentPhoto.credit} / Unsplash
        </p>
      </div>

      {/* フォーム */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-5 map-texture-bg">
        <div className="space-y-4">
          {/* どんな暮らしがしたい？ */}
          <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-stone-200/50 p-4 shadow-sm">
            <VibePicker
              selectedVibes={selectedVibes}
              onToggle={toggleVibe}
            />
          </div>

          {/* 今住んでる街 + 通勤先 */}
          <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-stone-200/50 p-4 shadow-sm space-y-4">
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
          </div>

          {/* アクションボタン */}
          <button
            onClick={handleDiscover}
            disabled={!canProceed}
            className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-300 ${
              canProceed
                ? "bg-accent text-white hover:bg-amber-900 shadow-lg shadow-amber-200/50 translate-y-0 opacity-100"
                : "bg-stone-200/80 text-stone-400 cursor-not-allowed translate-y-2 opacity-60"
            }`}
          >
            {canProceed
              ? `この条件で街を探す →`
              : "好みを1つ以上選んでね"}
          </button>
        </div>
      </div>
    </div>
  );
}
