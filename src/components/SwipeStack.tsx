"use client";

import { useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { useRouter } from "next/navigation";
import type { Town } from "@/types/town";
import TownCard from "./TownCard";

interface SwipeStackProps {
  towns: Town[];
  onIndexChange?: (index: number, imageUrl: string) => void;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeStack({ towns, onIndexChange }: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(
    x,
    [-300, -100, 0, 100, 300],
    [0.5, 1, 1, 1, 0.5]
  );

  // カードが変わったらx位置をリセット＆親へ通知
  useEffect(() => {
    x.set(0);
    if (towns[currentIndex]) {
      onIndexChange?.(currentIndex, towns[currentIndex].image);
    }
  }, [currentIndex, x, towns, onIndexChange]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // ドラッグ終了後、少し遅延させてisDraggingをリセット（タップ判定のため）
      setTimeout(() => setIsDragging(false), 50);

      if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
        setExitDirection(info.offset.x > 0 ? "right" : "left");
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setExitDirection(null);
        }, 200);
      }
    },
    []
  );

  const handleTap = useCallback(
    (slug: string) => {
      // ドラッグ中はタップとして扱わない
      if (isDragging) return;
      router.push(`/town/${slug}`);
    },
    [router, isDragging]
  );

  const handleNextButton = useCallback(() => {
    setExitDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
    }, 200);
  }, []);

  // キーボード操作（PC向け）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex >= towns.length) return;
      if (e.key === "ArrowLeft") {
        // 左矢印 → スキップ
        setExitDirection("left");
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setExitDirection(null);
        }, 200);
      } else if (e.key === "ArrowRight") {
        // 右矢印 → 詳しく見る
        router.push(`/town/${towns[currentIndex].slug}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, towns, router]);

  if (currentIndex >= towns.length) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <p className="text-5xl mb-4">🎉</p>
        <h3 className="text-xl font-bold mb-2">
          {towns.length}の街をチェックしました！
        </h3>
        <p className="text-muted text-sm mb-6">
          気になった街は保存済み。
          <br />
          条件を変えてもう一度探すこともできます。
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => router.push("/bookmarks")}
            className="w-full px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            保存した街を見る
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-3 bg-stone-100 text-stone-600 rounded-xl font-medium hover:bg-stone-200 transition-colors"
          >
            条件を変えて探す
          </button>
        </div>
      </div>
    );
  }

  const currentTown = towns[currentIndex];
  const nextTown = towns[currentIndex + 1];

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center" style={{ height: "calc(100dvh - 56px - 16px - 80px)" }}>
      {/* カードカウンター */}
      <div className="text-xs text-muted mb-2">
        {currentIndex + 1} / {towns.length}
      </div>

      {/* カードスタック */}
      <div className="relative w-full flex-1 overflow-hidden">
        {/* 次のカード（背景） */}
        {nextTown && (
          <div className="absolute inset-0 scale-95 opacity-60">
            <TownCard town={nextTown} />
          </div>
        )}

        {/* 現在のカード */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTown.slug}
            className="absolute inset-0 no-select"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: exitDirection === "left" ? -400 : exitDirection === "right" ? 400 : 0,
            }}
            exit={{
              x: exitDirection === "left" ? -400 : 400,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <TownCard
              town={currentTown}
              onTap={() => handleTap(currentTown.slug)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* アクションボタン */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNextButton}
            className="px-6 py-2.5 bg-stone-200 text-stone-600 rounded-full text-sm font-medium hover:bg-stone-300 transition-colors"
          >
            スキップ →
          </button>
          <button
            onClick={() => handleTap(currentTown.slug)}
            className="px-6 py-2.5 bg-accent text-white rounded-full text-sm font-medium hover:bg-amber-900 transition-colors"
          >
            詳しく見る
          </button>
        </div>
      </div>
    </div>
  );
}
