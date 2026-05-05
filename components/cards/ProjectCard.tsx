"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

type Project = {
  _id: string;
  title: string;
  slug?: { current?: string };
  description?: string;
  thumbnail?: unknown;
  tags?: string[];
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
};

type ProjectCardProps = {
  project: Project;
  delay?: number;
};

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(1200).height(675).url()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#111111] transition-all duration-300 hover:border-[#c9ff47] hover:shadow-[0_0_28px_rgba(201,255,71,0.2)]"
    >
      <div className="relative aspect-video overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[#1a1a1a]" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      <div className="space-y-4 p-6">
        {project.category ? (
          <span className="inline-flex rounded-full bg-[#c9ff47] px-3 py-1 text-xs font-semibold text-[#111111]">
            {project.category}
          </span>
        ) : null}

        <h3 className="text-2xl font-bold text-white">{project.title}</h3>

        <p className="line-clamp-2 text-sm text-[#666666]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {(project.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#1c1c1c] px-2.5 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/projects/${project.slug?.current ?? ""}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-[#c9ff47]"
          >
            View Project <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 transition hover:text-[#c9ff47]"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 transition hover:text-[#c9ff47]"
              >
                <Github className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
