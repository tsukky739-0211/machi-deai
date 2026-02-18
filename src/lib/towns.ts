import type { Town } from "@/types/town";
import townsData from "@/data/towns.json";

const towns: Town[] = townsData as Town[];

export function getAllTowns(): Town[] {
  return towns;
}

export function getTownBySlug(slug: string): Town | undefined {
  return towns.find((t) => t.slug === slug);
}

export function getTownSlugs(): string[] {
  return towns.map((t) => t.slug);
}

/** 通勤先の駅名一覧（データから動的に取得） */
export function getCommuteStations(): string[] {
  const stations = new Set<string>();
  for (const town of towns) {
    for (const station of Object.keys(town.commuteMinutes)) {
      stations.add(station);
    }
  }
  return [...stations].sort();
}
