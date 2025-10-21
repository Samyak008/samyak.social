import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

function formatDate(d?: string) {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="container">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <ul className="mt-4 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card">
              <h2>{p.meta?.title ?? p.slug}</h2>
              <p className="text-sm text-muted">{formatDate(p.meta?.date) ?? ""}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
