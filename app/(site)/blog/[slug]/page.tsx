import { getPostBySlug } from "@/lib/blog";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <section className="container">
      <h1 className="text-2xl font-semibold">{post.meta?.title ?? post.slug}</h1>
      <p className="text-sm text-muted">{post.meta?.date}</p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </section>
  );
}