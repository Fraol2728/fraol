import Link from "next/link";
import BlogCard from "@/components/cards/BlogCard";
import { featuredPostsQuery } from "@/lib/queries/posts";
import { client } from "@/sanity/lib/client";

type Post = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  thumbnail?: unknown;
  tags?: string[];
  publishedAt?: string;
};

export default async function FeaturedPosts() {
  const posts = await client.fetch<Post[]>(featuredPostsQuery);

  return (
    <section className="py-32 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-zinc-500">
            <span className="h-px w-12 bg-zinc-700" />
            FROM THE BLOG
            <span className="h-px w-12 bg-zinc-700" />
          </p>
          <h2 className="text-4xl font-black sm:text-5xl">
            <span className="text-white">Latest </span>
            <span className="text-[#c9ff47]">Articles</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Thoughts on design, development, and the creative process
          </p>
        </div>

        <div className="space-y-6">
          {posts.length > 0
            ? posts.map((post, index) => (
                <BlogCard key={post._id} post={post} delay={index * 0.12} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`post-skeleton-${index + 1}`}
                  className="animate-pulse overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#111111]"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="aspect-[4/3] w-full bg-[#1a1a1a] md:w-2/5" />
                    <div className="w-full space-y-4 p-6 md:w-3/5">
                      <div className="flex justify-between">
                        <div className="h-6 w-32 rounded-full bg-[#222222]" />
                        <div className="h-4 w-20 rounded bg-[#1e1e1e]" />
                      </div>
                      <div className="h-6 w-3/4 rounded bg-[#222222]" />
                      <div className="h-4 w-full rounded bg-[#1e1e1e]" />
                      <div className="h-4 w-5/6 rounded bg-[#1e1e1e]" />
                      <div className="h-5 w-28 rounded bg-[#1e1e1e]" />
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-[#c9ff47] px-6 py-3 font-semibold text-[#c9ff47] transition hover:bg-[#c9ff47] hover:text-[#0b0b0b]"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
