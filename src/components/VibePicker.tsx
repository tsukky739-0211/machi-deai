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
          return (
            <button
              key={cat.id}
              onClick={() => onToggle(cat.id)}
              className={`relative text-left px-3 py-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-accent bg-orange-50 shadow-sm"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-lg">{cat.emoji}</span>
                <span className={`text-sm font-bold ${isSelected ? "text-accent" : "text-foreground"}`}>
                  {cat.label}
                </span>
              </div>
              <p className="text-[11px] text-muted leading-snug pl-7">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
