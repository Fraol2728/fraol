"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import BlogCard from "@/components/cards/BlogCard";
import { urlFor } from "@/lib/sanity/image";

type Post = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  thumbnail?: unknown;
  tags?: string[];
  publishedAt?: string;
  featured?: boolean;
  body?: unknown[];
};

const estimateReadTime = (body?: unknown[]) => {
  const text = JSON.stringify(body ?? []);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export default function BlogFilter({ posts }: { posts: Post[] }) {
  const uniqueTags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags ?? []);
    return ["All", ...Array.from(new Set(allTags))];
  }, [posts]);

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return posts;
    return posts.filter((post) => (post.tags ?? []).includes(activeFilter));
  }, [activeFilter, posts]);

  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
  const remainingPosts = filteredPosts.filter((post) => post._id !== featuredPost?._id);
  const featuredImage = featuredPost?.thumbnail ? urlFor(featuredPost.thumbnail).width(1600).height(1000).url() : null;

  return (
    <section className="mt-12">
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {uniqueTags.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`relative shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-[#c9ff47] bg-[#c9ff47] text-[#0a0a0a]"
                  : "border-[#1f1f1f] bg-[#111111] text-zinc-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-sm text-zinc-400">Showing {filteredPosts.length} articles</p>

      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {featuredPost ? (
              <article className="overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#111111]">
                <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
                  <div className="relative min-h-[280px]">
                    {featuredImage ? <Image src={featuredImage} alt={featuredPost.title} fill className="object-cover" /> : <div className="h-full w-full bg-[#1a1a1a]" />}
                  </div>
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <p className="text-sm text-zinc-400">Featured Article · {estimateReadTime(featuredPost.body)} min read</p>
                      <h2 className="mt-3 text-3xl font-black text-white">{featuredPost.title}</h2>
                      <p className="mt-4 text-[#999999]">{featuredPost.excerpt}</p>
                    </div>
                    <Link href={`/blog/${featuredPost.slug?.current ?? ""}`} className="mt-6 inline-flex text-sm font-semibold text-[#c9ff47]">Read Article →</Link>
                  </div>
                </div>
              </article>
            ) : null}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {remainingPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} delay={index * 0.06} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-[#1f1f1f] bg-[#101010] px-6 py-14 text-center"
          >
            <p className="text-lg font-medium text-white">No articles found</p>
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="mt-5 rounded-full bg-[#c9ff47] px-5 py-2 text-sm font-semibold text-[#0a0a0a]"
            >
              Reset filter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
