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

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });

  const posts: Post[] = entries.flatMap((e) => {
    if (e.isDirectory()) {
      const readme = path.join(POSTS_DIR, e.name, "README.md");
      if (fs.existsSync(readme)) {
        const raw = fs.readFileSync(readme, "utf8");
        const { data, content } = matter(raw);
        const meta = normalizeDateInMeta(data);
        return [{ slug: e.name, meta: meta as PostMeta, content }];
      }
      return [];
    }
    if (e.isFile() && e.name.endsWith(".md")) {
      const slug = e.name.replace(/\.md$/, "");
      const full = path.join(POSTS_DIR, e.name);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      const meta = normalizeDateInMeta(data);
      return [{ slug, meta: meta as PostMeta, content }];
    }
    return [];
  });

  // sort by date descending (missing dates go last)
  return posts.sort((a, b) => {
    const ta = a.meta?.date ? new Date(a.meta.date).getTime() : 0;
    const tb = b.meta?.date ? new Date(b.meta.date).getTime() : 0;
    return tb - ta;
  });
}

export function getPostBySlug(slug: string): Post | null {
  const folderReadme = path.join(POSTS_DIR, slug, "README.md");
  if (fs.existsSync(folderReadme)) {
    const raw = fs.readFileSync(folderReadme, "utf8");
    const { data, content } = matter(raw);
    const meta = normalizeDateInMeta(data);
    return { slug, meta: meta as PostMeta, content };
  }
  const fileMd = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(fileMd)) {
    const raw = fs.readFileSync(fileMd, "utf8");
    const { data, content } = matter(raw);
    const meta = normalizeDateInMeta(data);
    return { slug, meta: meta as PostMeta, content };
  }
  return null;
}