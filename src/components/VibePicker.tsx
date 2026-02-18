"use client";

import { VIBE_CATEGORIES } from "@/lib/vibes";

interface VibePickerProps {
  selectedVibes: string[];
  onToggle: (vibeId: string) => void;
}

export default function VibePicker({ selectedVibes, onToggle }: VibePickerProps) {
  return (
    <div>
      <label className="block text-sm font-bold mb-1 text-foreground">
        どんな暮らしがしたい？
      </label>
      <p className="text-xs text-muted mb-3">
        気になるものを選んでね（複数OK）
      </p>
      <div className="grid grid-cols-2 gap-2">
        {VIBE_CATEGORIES.map((cat) => {
          const isSelected = selectedVibes.includes(cat.id);
          const photoUrl = cat.photo
            ? `https://images.unsplash.com/${cat.photo}?w=400&q=70&auto=format&fit=crop`
            : null;

          return (
            <button
              key={cat.id}
              onClick={() => onToggle(cat.id)}
              className={`relative text-left rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected
                  ? "border-accent shadow-md scale-[0.98]"
                  : "border-stone-200 hover:border-stone-300 hover:shadow-sm"
              }`}
            >
              {/* 写真背景 or カラー背景 */}
              {photoUrl ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${photoUrl})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-stone-100" />
              )}

              {/* 暗いグラデーションオーバーレイ */}
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  photoUrl
                    ? isSelected
                      ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10"
                      : "bg-gradient-to-t from-black/70 via-black/30 to-black/5"
                    : isSelected
                    ? "bg-orange-50/80"
                    : "bg-white/80"
                }`}
              />

              {/* 選択チェックマーク */}
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-accent rounded-full flex items-center justify-center z-10">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              {/* テキストコンテンツ */}
              <div className="relative z-10 px-3 py-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base">{cat.emoji}</span>
                  <span className={`text-sm font-bold leading-tight ${photoUrl ? "text-white" : isSelected ? "text-accent" : "text-foreground"}`}>
                    {cat.label}
                  </span>
                </div>
                <p className={`text-[10px] leading-snug pl-6 ${photoUrl ? "text-white/80" : "text-muted"}`}>
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
