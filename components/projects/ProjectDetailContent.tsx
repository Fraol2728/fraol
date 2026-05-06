"use client";

import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { urlFor } from "@/lib/sanity/image";

type Project = {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  thumbnail?: unknown;
  images?: unknown[];
  liveUrl?: string;
  githubUrl?: string;
  publishedAt?: string;
  body?: unknown[];
};

export default function ProjectDetailContent({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const heroImage = project.thumbnail ? urlFor(project.thumbnail).width(1800).height(1000).url() : null;

  const galleryImages = useMemo(
    () =>
      (project.images ?? [])
        .map((image) => urlFor(image).width(1400).height(900).url())
        .filter(Boolean),
    [project.images],
  );

  return (
    <main className="bg-[#080808] text-white">
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {heroImage ? <Image src={heroImage} alt={project.title} fill className="object-cover opacity-30 blur-sm" /> : null}
        <div className="absolute inset-0 bg-black/70" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          {project.category ? <span className="rounded-full bg-[#c9ff47] px-4 py-1 text-xs font-bold text-[#0a0a0a]">{project.category}</span> : null}
          <h1 className="mt-4 text-5xl font-black md:text-7xl">{project.title}</h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {(project.tags ?? []).map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-300">#{tag}</span>
            ))}
          </div>
          {project.publishedAt ? <p className="mt-6 text-sm text-zinc-400">Published {new Date(project.publishedAt).toLocaleDateString()}</p> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c9ff47] px-6 py-3 font-semibold text-[#0a0a0a]">View Live <ExternalLink className="h-4 w-4" /></a> : null}
            {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#c9ff47] px-6 py-3 font-semibold text-[#c9ff47]">GitHub <Github className="h-4 w-4" /></a> : null}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-[1.9fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
          {heroImage ? <Image src={heroImage} alt={project.title} width={1400} height={900} className="w-full rounded-2xl shadow-2xl" /> : null}

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {galleryImages.map((image) => (
                <button type="button" key={image} onClick={() => setActiveImage(image)} className="relative overflow-hidden rounded-xl">
                  <Image src={image} alt={project.title} width={800} height={500} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}

          <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#999999] prose-p:leading-8 prose-a:text-[#c9ff47] prose-a:underline prose-code:rounded prose-code:bg-[#111111] prose-code:px-1 prose-code:text-[#c9ff47] prose-blockquote:border-l-[#c9ff47] prose-blockquote:text-zinc-400 prose-blockquote:italic prose-img:rounded-xl">
            <PortableText value={project.body ?? []} />
          </article>
        </motion.div>

        <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[#1f1f1f] bg-[#111111] p-6">
            <h3 className="mb-4 text-xl font-bold">Project Details</h3>
            <div className="space-y-3 text-sm text-zinc-300">
              <p><span className="font-semibold text-white">Category:</span> {project.category ?? "-"}</p>
              <p><span className="font-semibold text-white">Tags:</span> {(project.tags ?? []).join(", ") || "-"}</p>
              <p><span className="font-semibold text-white">Published:</span> {project.publishedAt ? new Date(project.publishedAt).toLocaleDateString() : "-"}</p>
              <p><span className="font-semibold text-white">Live URL:</span> {project.liveUrl ?? "-"}</p>
              <p><span className="font-semibold text-white">GitHub:</span> {project.githubUrl ?? "-"}</p>
            </div>
            <Link href="/projects" className="mt-6 inline-flex items-center gap-2 text-[#c9ff47]"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link>
          </div>
        </motion.aside>
      </section>

      <section className="border-t border-[#1a1a1a] py-20 text-center">
        <h2 className="text-3xl font-bold">Liked this project? Let&apos;s work together</h2>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[#c9ff47] px-6 py-3 font-bold text-[#0a0a0a]">Start a Project</Link>
      </section>

      {activeImage ? (
        <button type="button" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveImage(null)}>
          <Image src={activeImage} alt="Project preview" width={1400} height={900} className="max-h-[90vh] w-auto rounded-xl" />
        </button>
      ) : null}
    </main>
  );
}
