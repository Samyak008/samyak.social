import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

type PostMeta = { title?: string; date?: string; [k: string]: any };
type Post = { slug: string; meta: PostMeta; content: string };

function normalizeDateInMeta(data: any) {
  if (!data) return data;
  if (data.date) {
    const dt = data.date instanceof Date ? data.date : new Date(data.date);
    if (!isNaN(dt.getTime())) data.date = dt.toISOString();
    else data.date = String(data.date);
  }
  return data;
}

function walkMdFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...walkMdFiles(full));
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = walkMdFiles(POSTS_DIR);

  const posts: Post[] = files.map((full) => {
    const rel = path.relative(POSTS_DIR, full);
    const parts = rel.split(path.sep);
    const filename = parts[parts.length - 1].toLowerCase();

    // slug rules:
    // - if file is README.md -> slug is the containing folder path (e.g. my-first-post)
    // - otherwise slug is the relative path without .md (e.g. hackathons/hackrush)
    let slug: string;
    if (filename === "readme.md") {
      slug = parts.slice(0, -1).join("/");
    } else {
      slug = rel.replace(/\.md$/i, "").replace(/\\/g, "/");
    }

    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const meta = normalizeDateInMeta(data);
    return { slug: slug || path.basename(path.dirname(full)), meta: meta as PostMeta, content };
  });

  // remove duplicates (if any) preferring README-based slugs
  const bySlug = new Map<string, Post>();
  for (const p of posts) {
    bySlug.set(p.slug, p);
  }

  const unique = Array.from(bySlug.values());

  // sort by date descending (missing dates go last)
  return unique.sort((a, b) => {
    const ta = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
    const tb = b.meta?.date ? new Date(b.meta?.date).getTime() : 0;
    return tb - ta;
  });
}

export function getPostBySlug(slug: string): Post | null {
  // 1) try folder README (slug = folder name or nested folder path)
  const folderReadme = path.join(POSTS_DIR, slug, "README.md");
  if (fs.existsSync(folderReadme)) {
    const raw = fs.readFileSync(folderReadme, "utf8");
    const { data, content } = matter(raw);
    const meta = normalizeDateInMeta(data);
    return { slug, meta: meta as PostMeta, content };
  }

  // 2) try straight file at POSTS_DIR/slug.md (works for nested paths like hackathons/hackrush)
  const fileMd = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(fileMd)) {
    const raw = fs.readFileSync(fileMd, "utf8");
    const { data, content } = matter(raw);
    const meta = normalizeDateInMeta(data);
    return { slug, meta: meta as PostMeta, content };
  }

  // 3) fallback: try treating slug as folder and look for any .md inside it (pick README or first .md)
  if (fs.existsSync(path.join(POSTS_DIR, slug))) {
    const folder = path.join(POSTS_DIR, slug);
    const readme = path.join(folder, "README.md");
    if (fs.existsSync(readme)) {
      const raw = fs.readFileSync(readme, "utf8");
      const { data, content } = matter(raw);
      const meta = normalizeDateInMeta(data);
      return { slug, meta: meta as PostMeta, content };
    }
    const entries = fs.readdirSync(folder);
    const md = entries.find((n) => n.toLowerCase().endsWith(".md"));
    if (md) {
      const full = path.join(folder, md);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      const meta = normalizeDateInMeta(data);
      // create a nested slug like folder/filename (without .md)
      const nestedSlug = path.join(slug, md.replace(/\.md$/i, "")).replace(/\\/g, "/");
      return { slug: nestedSlug, meta: meta as PostMeta, content };
    }
  }

  return null;
}