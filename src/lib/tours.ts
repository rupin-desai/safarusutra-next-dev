import fs from "fs/promises";
import path from "path";

export type Tour = {
  id?: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  html?: string;
  subtitle?: string;
};

const dataFile = path.join(process.cwd(), "src", "data", "tours.json");

async function loadData(): Promise<Tour[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (err) {
    // log the error so the variable is used and the warning is resolved
    console.error("Failed to load tours.json:", err);
    // fallback: empty list if file missing or invalid
    return [];
  }
}

export async function getAllTours(): Promise<Pick<Tour, "slug" | "title" | "excerpt">[]> {
  const all = await loadData();
  return all.map(({ slug, title, excerpt }) => ({ slug, title, excerpt }));
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const all = await loadData();
  const found = all.find((t) => t.slug === slug);
  return found ?? null;
}