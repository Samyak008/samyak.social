import { getPostBySlug } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

function formatDate(d?: string) {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// generateStaticParams ensures Vercel builds pages for every post (return slug as array for catch-all)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => {
    const parts = p.slug ? p.slug.split("/").filter(Boolean) : [];
    return { slug: parts };
  });
}

export default async function BlogPostPage({ params }: { params: { slug?: string[] } }) {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug ?? "";

  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <section className="container">
      <h1 className="text-2xl font-semibold">{post.meta?.title ?? post.slug}</h1>
      <p className="text-sm text-muted">{formatDate(post.meta?.date) ?? ""}</p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </section>
  );
}