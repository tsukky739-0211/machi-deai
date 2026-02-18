"use client";

import { useState, useEffect } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  slug: string;
  size?: "sm" | "md" | "lg";
  onToggle?: (saved: boolean) => void;
}

export default function BookmarkButton({
  slug,
  size = "md",
  onToggle,
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setSaved(isBookmarked(slug));
  }, [slug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleBookmark(slug);
    setSaved(newState);
    onToggle?.(newState);

    // トースト通知
    setToast(newState ? "保存しました" : "保存を解除しました");
    setTimeout(() => setToast(null), 1500);

    if (newState) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full transition-all ${
          saved
            ? "bg-red-50 text-red-500"
            : "bg-white/80 text-stone-400 hover:text-red-400"
        } ${animating ? "scale-125" : "scale-100"}`}
        aria-label={saved ? "ブックマーク解除" : "ブックマーク"}
      >
        <svg
          className={size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5"}
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      {/* トースト */}
      {toast && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-stone-800 text-white text-xs rounded-full shadow-lg animate-toast z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
