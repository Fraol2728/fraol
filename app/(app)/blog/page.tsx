import type { Metadata } from "next";
import Link from "next/link";
import BlogFilter from "@/components/blog/BlogFilter";
import { allPostsQuery } from "@/lib/queries/posts";
import { client } from "@/sanity/lib/client";

type Post = { _id: string; title: string; slug?: { current?: string }; excerpt?: string; thumbnail?: unknown; tags?: string[]; publishedAt?: string; featured?: boolean; body?: unknown[] };

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description: "Thoughts on design, development, and the creative process",
};

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(allPostsQuery);

  return (
    <main className="bg-[#080808] pb-24 text-white">
      <section className="flex min-h-[40vh] items-center justify-center border-b border-[#181818] bg-[#0a0a0a] px-6 text-center">
        <div className="max-w-4xl">
          <p className="text-sm text-zinc-400"><Link href="/" className="hover:text-[#c9ff47]">Home</Link> → Blog</p>
          <h1 className="mt-4 text-5xl font-black md:text-7xl"><span className="text-white">My </span><span className="text-[#c9ff47]">Articles</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">Thoughts on design, development, and the creative process</p>
          <p className="mt-7 text-sm uppercase tracking-[0.2em] text-zinc-500">Total Articles: {posts.length}</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6"><BlogFilter posts={posts} /></div>
    </main>
  );
}
