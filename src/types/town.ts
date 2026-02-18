export type SpotCategory =
  | "グルメ"
  | "カフェ"
  | "ショッピング"
  | "公園・自然"
  | "文化・アート"
  | "夜の街"
  | "子育て"
  | "生活便利"
  | "イベント"
  | "ランドマーク";

export interface Spot {
  rank: number;
  name: string;
  category: SpotCategory;
  description: string;
  icon: string;
}

export interface Town {
  slug: string;
  name: string;
  area: string;
  station: string[];
  lines: string[];
  catchcopy: string;
  description: string;
  vibe: string[];
  popularity: number; // 1-5（低いほど穴場）
  avgRent: {
    oneRoom: string;
    oneK: string;
    oneLDK: string;
  };
  bestFor: string[];
  spots: Spot[];
  commuteMinutes: Record<string, number>; // {"渋谷": 5, "新宿": 15, ...}
  image: string;
  colorFrom: string; // グラデーション開始色 (e.g. "#f97316")
  colorTo: string;   // グラデーション終了色
  externalLinks: {
    suumo: string;
    homes: string;
  };
}
