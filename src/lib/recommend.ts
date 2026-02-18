import type { Town } from "@/types/town";

/** vibeタグのJaccard類似度を計算 */
function jaccardSimilarity(setA: string[], setB: string[]): number {
  const a = new Set(setA);
  const b = new Set(setB);
  const intersection = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

export interface RecommendOptions {
  /** 好きな街のslug一覧（従来モード） */
  favoriteSlugs?: string[];
  /** vibeタグの直接指定（vibeベースモード） */
  vibeTags?: string[];
  /** 今住んでる街のslug */
  currentSlug?: string;
  /** 通勤先の駅名（例: "渋谷"） */
  commuteStation?: string;
  /** 通勤時間の上限（分） */
  commuteMaxMinutes?: number;
}

/**
 * 好きな街のvibeタグをマージし、類似度の高い穴場街を返す
 */
export function getRecommendedTowns(
  allTowns: Town[],
  options: RecommendOptions
): Town[] {
  const { favoriteSlugs = [], vibeTags, currentSlug, commuteStation, commuteMaxMinutes = 30 } = options;

  // vibeタグを決定: vibeTags が指定されていればそのまま使う、なければ好きな街から抽出
  let mergedVibe: string[];
  if (vibeTags && vibeTags.length > 0) {
    mergedVibe = vibeTags;
  } else {
    const favoriteTowns = allTowns.filter((t) => favoriteSlugs.includes(t.slug));
    mergedVibe = [...new Set(favoriteTowns.flatMap((t) => t.vibe))];
  }

  // 除外対象: 好きな街 + 今住んでる街
  const excludeSlugs = new Set([...favoriteSlugs, ...(currentSlug ? [currentSlug] : [])]);

  // 候補街をスコアリング
  const candidates = allTowns
    .filter((t) => !excludeSlugs.has(t.slug))
    .map((town) => {
      const similarity = jaccardSimilarity(mergedVibe, town.vibe);
      // 知名度が低いほどボーナス（穴場発見）
      const popularityBonus = (6 - town.popularity) * 0.05;
      const score = similarity + popularityBonus;
      return { town, score };
    });

  // 通勤フィルタ
  let filtered = candidates;
  if (commuteStation) {
    filtered = candidates.filter((c) => {
      const minutes = c.town.commuteMinutes[commuteStation];
      return minutes !== undefined && minutes <= commuteMaxMinutes;
    });
    // フィルタで全滅した場合はフィルタなしにフォールバック
    if (filtered.length === 0) filtered = candidates;
  }

  // スコア順にソートし、上位15件に絞る
  return filtered
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map((c) => c.town);
}
