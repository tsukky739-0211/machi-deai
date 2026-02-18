import { notFound } from "next/navigation";
import { getAllTowns, getTownBySlug, getTownSlugs } from "@/lib/towns";
import type { Metadata } from "next";
import TownDetailClient from "./TownDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return { title: "街が見つかりません" };

  return {
    title: `${town.name} - ${town.catchcopy} | 街deai`,
    description: town.description,
    openGraph: {
      title: `${town.name} - ${town.catchcopy}`,
      description: town.description,
    },
  };
}

export default async function TownPage({ params }: PageProps) {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();

  const allTowns = getAllTowns();
  const relatedTowns = allTowns
    .filter((t) => t.slug !== town.slug)
    .map((t) => ({
      town: t,
      overlap: t.vibe.filter((v) => town.vibe.includes(v)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map((r) => r.town);

  return <TownDetailClient town={town} relatedTowns={relatedTowns} />;
}
