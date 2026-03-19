import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WRITINGS_DIR = path.join(process.cwd(), "content", "writings");

export interface WritingMeta {
  slug: string;
  title: string;
  date: string;
}

export interface Writing extends WritingMeta {
  content: string;
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getAllWritings(): WritingMeta[] {
  if (!fs.existsSync(WRITINGS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(WRITINGS_DIR).filter((f) => f.endsWith(".md"));
  const writings: WritingMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(WRITINGS_DIR, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const title = (data.title as string) ?? slugToTitle(slug);
    const dateStr = data.date as string | undefined;
    let date: string;

    if (dateStr) {
      date = new Date(dateStr).toISOString();
    } else {
      const stats = fs.statSync(fullPath);
      date = stats.mtime.toISOString();
    }

    writings.push({ slug, title, date });
  }

  // Sort by date ascending (oldest first, newest at bottom)
  writings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return writings;
}

export function getWritingBySlug(slug: string): Writing | null {
  const fullPath = path.join(WRITINGS_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const title = (data.title as string) ?? slugToTitle(slug);
  const dateStr = data.date as string | undefined;
  let date: string;

  if (dateStr) {
    date = new Date(dateStr).toISOString();
  } else {
    const stats = fs.statSync(fullPath);
    date = stats.mtime.toISOString();
  }

  return { slug, title, date, content };
}
