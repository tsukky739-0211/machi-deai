"use client";

import { useState, useMemo } from "react";

interface StationInputProps {
  stations: string[];
  value: string;
  onChange: (station: string) => void;
}

export default function StationInput({
  stations,
  value,
  onChange,
}: StationInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!inputValue) return [];
    return stations.filter((s) => s.includes(inputValue)).slice(0, 8);
  }, [stations, inputValue]);

  return (
    <div>
      <label className="block text-sm font-bold mb-2 text-foreground">
        通勤先の駅
        <span className="text-muted font-normal ml-2">（任意）</span>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="例: 渋谷、東京、新宿..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
            if (!e.target.value) onChange("");
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />

        {/* サジェスト */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-20 overflow-hidden">
            {suggestions.map((station) => (
              <button
                key={station}
                onMouseDown={() => {
                  setInputValue(station);
                  onChange(station);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 transition-colors"
              >
                {station}駅
              </button>
            ))}
          </div>
        )}
      </div>
      {value && (
        <p className="text-xs text-muted mt-1.5">
          {value}駅から30分以内の街を優先表示します
        </p>
      )}
    </div>
  );
}
