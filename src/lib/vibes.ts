export interface VibeCategory {
  id: string;
  emoji: string;
  label: string;
  description: string;
  /** マッチするvibeタグ群 */
  tags: string[];
}

export const VIBE_CATEGORIES: VibeCategory[] = [
  {
    id: "cafe-oshare",
    emoji: "☕",
    label: "カフェ・おしゃれ",
    description: "個人カフェや雑貨屋が点在する街",
    tags: ["カフェ", "おしゃれ", "コーヒー", "スイーツ", "雑貨", "パン屋", "ビストロ"],
  },
  {
    id: "shitamachi",
    emoji: "🏮",
    label: "下町・レトロ",
    description: "商店街や銭湯が残る人情の街",
    tags: ["下町", "レトロ", "商店街", "人情", "庶民的", "銭湯", "食べ歩き", "老舗", "職人"],
  },
  {
    id: "culture",
    emoji: "🎸",
    label: "カルチャー・サブカル",
    description: "古着、ライブ、アートを楽しめる",
    tags: ["カルチャー", "サブカル", "古着", "ライブ", "音楽", "アート", "アニメ", "クラフト"],
  },
  {
    id: "nature",
    emoji: "🌿",
    label: "自然・のんびり",
    description: "公園や緑が多く穏やかな暮らし",
    tags: ["自然", "公園", "緑", "散歩", "穏やか", "静か", "桜", "水辺", "緑豊か", "自然豊か", "渓谷", "多摩川"],
  },
  {
    id: "cospa",
    emoji: "💰",
    label: "コスパ重視",
    description: "家賃も物価も抑えめで暮らしやすい",
    tags: ["コスパ", "コスパ最強", "激安", "安くて旨い", "穴場"],
  },
  {
    id: "gourmet",
    emoji: "🍜",
    label: "グルメ・飲み歩き",
    description: "飲み屋街や名店が集まるエリア",
    tags: ["グルメ", "飲み屋", "飲み屋街", "ラーメン", "カレー", "多国籍", "エスニック", "もんじゃ"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    label: "ファミリー・子育て",
    description: "治安がよく公園や学校が充実",
    tags: ["ファミリー", "ファミリー向け", "子育て", "のびのび", "住みやすい", "住宅街", "閑静"],
  },
  {
    id: "academic",
    emoji: "📚",
    label: "文教・知的",
    description: "大学や書店、文化施設が身近に",
    tags: ["文教", "学生街", "知的", "アカデミック", "古書", "文学", "歴史"],
  },
  {
    id: "urban",
    emoji: "🏙️",
    label: "都会・アクセス便利",
    description: "ターミナル駅近くで何でも揃う",
    tags: ["アクセス", "交通便利", "ターミナル", "再開発", "都心", "利便性", "商業施設", "ショッピング"],
  },
  {
    id: "otona",
    emoji: "🍷",
    label: "大人・落ち着き",
    description: "洗練された大人の雰囲気の街",
    tags: ["大人", "洗練", "落ち着き", "品がいい", "隠れ家", "セレブ"],
  },
];

/** vibeカテゴリIDの配列から、対応するvibeタグ群を返す */
export function getVibeTagsFromCategories(categoryIds: string[]): string[] {
  const tags = new Set<string>();
  for (const id of categoryIds) {
    const cat = VIBE_CATEGORIES.find((c) => c.id === id);
    if (cat) {
      for (const tag of cat.tags) {
        tags.add(tag);
      }
    }
  }
  return [...tags];
}
