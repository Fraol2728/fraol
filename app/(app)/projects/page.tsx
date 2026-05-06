import type { Metadata } from "next";
import Link from "next/link";
import ProjectFilter from "@/components/projects/ProjectFilter";
import { allProjectsQuery } from "@/lib/queries/projects";
import { client } from "@/sanity/lib/client";

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

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Browse all my design and development projects",
};

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(allProjectsQuery);

  return (
    <main className="bg-[#080808] pb-24 text-white">
      <section className="flex min-h-[40vh] items-center justify-center border-b border-[#181818] bg-[#0a0a0a] px-6 text-center">
        <div className="max-w-4xl">
          <p className="text-sm text-zinc-400">
            <Link href="/" className="hover:text-[#c9ff47]">Home</Link> → Projects
          </p>
          <h1 className="mt-4 text-5xl font-black md:text-7xl">
            <span className="text-white">My </span>
            <span className="text-[#c9ff47]">Projects</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            A collection of work spanning web development, graphic design, branding, and more
          </p>
          <p className="mt-7 text-sm uppercase tracking-[0.2em] text-zinc-500">Total Projects: {projects.length}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <ProjectFilter projects={projects} />
      </div>
    </main>
  );
}
