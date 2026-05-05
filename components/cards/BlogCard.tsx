"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

type Post = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  thumbnail?: unknown;
  tags?: string[];
  publishedAt?: string;
};

type BlogCardProps = {
  post: Post;
  delay?: number;
};

export default function BlogCard({ post, delay = 0 }: BlogCardProps) {
  const imageUrl = post.thumbnail
    ? urlFor(post.thumbnail).width(1200).height(900).url()
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="group overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#111111] transition-colors duration-300 hover:border-[#c9ff47]"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:w-2/5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-[#1a1a1a]" />
          )}
        </div>

        <div className="flex w-full flex-col justify-between p-6 md:w-3/5">
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {(post.tags ?? []).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#1f1f1f] px-2.5 py-1 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-zinc-500">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>

            <h3 className="line-clamp-2 text-lg font-bold text-white">{post.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm text-[#666666]">{post.excerpt}</p>
          </div>

          <Link
            href={`/blog/${post.slug?.current ?? ""}`}
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#c9ff47] underline-offset-4 transition hover:underline"
          >
            Read Article <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
