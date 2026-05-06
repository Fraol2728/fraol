import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/cards/BlogCard";
import ShareButtons from "@/components/blog/ShareButtons";
import { allPostsQuery, postBySlugQuery } from "@/lib/queries/posts";
import { urlFor } from "@/lib/sanity/image";
import { client } from "@/sanity/lib/client";
import env from "@/lib/env";

type Post = { _id: string; title: string; slug?: { current?: string }; excerpt?: string; thumbnail?: unknown; tags?: string[]; publishedAt?: string; body?: unknown[] };
const readTime = (body?: unknown[]) => Math.max(1, Math.ceil(JSON.stringify(body ?? []).split(/\s+/).filter(Boolean).length / 200));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) return { title: "Article Not Found | Portfolio" };
  return { title: `${post.title} | Blog`, description: post.excerpt ?? "Article details" };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug?: { current?: string } }>>(`*[_type == "post" && defined(slug.current)]{slug}`);
  return slugs.map((s) => s.slug?.current).filter((s): s is string => Boolean(s)).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) notFound();
  const allPosts = await client.fetch<Post[]>(allPostsQuery);
  const relatedPosts = allPosts.filter((p) => p._id !== post._id).slice(0, 3);
  const heroImage = post.thumbnail ? urlFor(post.thumbnail).width(1800).height(1000).url() : null;

  return <main className="bg-[#080808] pb-24 text-white">
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden text-center">
      {heroImage ? <Image src={heroImage} alt={post.title} fill className="object-cover opacity-20 blur-sm" /> : null}
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-5 flex flex-wrap justify-center gap-2">{(post.tags ?? []).map((tag) => <span key={tag} className="rounded-full bg-[#c9ff47] px-3 py-1 text-xs font-semibold text-[#0a0a0a]">{tag}</span>)}</div>
        <h1 className="text-4xl font-black md:text-6xl">{post.title}</h1>
        <p className="mt-4 text-zinc-400">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""} · {readTime(post.body)} min read</p>
        <p className="mt-4 text-sm text-zinc-300">👤 Written by {env.site.name}</p>
      </div>
    </section>
    <article className="mx-auto mt-16 max-w-[720px] px-6">
      {heroImage ? <Image src={heroImage} alt={post.title} width={1200} height={700} className="mb-10 w-full rounded-2xl shadow-2xl" /> : null}
      <div className="prose prose-invert max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-bold prose-headings:text-white prose-p:mb-4 prose-p:leading-[1.9] prose-p:text-[#999999] prose-a:text-[#c9ff47] prose-a:hover:underline prose-code:rounded prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:text-[#c9ff47] prose-pre:rounded-xl prose-pre:border prose-pre:border-[#1f1f1f] prose-pre:bg-[#0d0d0d] prose-pre:p-6 prose-pre:text-[#c9ff47] prose-blockquote:border-l-4 prose-blockquote:border-[#c9ff47] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-400 prose-img:my-8 prose-img:rounded-xl"><PortableText value={post.body ?? []} /></div>
    </article>
    <section className="mx-auto mt-16 max-w-[720px] border-t border-[#1f1f1f] px-6 pt-8">
      <div className="mb-6 flex flex-wrap gap-2">{(post.tags ?? []).map((tag) => <span key={tag} className="rounded-full border border-[#1f1f1f] px-3 py-1 text-xs text-zinc-300">#{tag}</span>)}</div>
      <ShareButtons title={post.title} />
      <Link href="/blog" className="mt-8 inline-flex items-center text-[#c9ff47]">← Back to Blog</Link>
    </section>
    <section className="mx-auto mt-20 max-w-7xl px-6"><h2 className="mb-8 text-3xl font-bold">More Articles</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{relatedPosts.map((p, i) => <BlogCard key={p._id} post={p} delay={i * 0.06} />)}</div></section>
  </main>;
}
