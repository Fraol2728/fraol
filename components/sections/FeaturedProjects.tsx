import Link from "next/link";
import ProjectCard from "@/components/cards/ProjectCard";
import { featuredProjectsQuery } from "@/lib/queries/projects";
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

export default async function FeaturedProjects() {
  const projects = await client.fetch<Project[]>(featuredProjectsQuery);

  return (
    <section className="bg-[#080808] py-32 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-zinc-500">
            <span className="h-px w-12 bg-zinc-700" />
            SELECTED WORK
            <span className="h-px w-12 bg-zinc-700" />
          </p>
          <h2 className="text-4xl font-black sm:text-5xl">
            <span className="text-white">Featured </span>
            <span className="text-[#c9ff47]">Projects</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            A selection of my recent work in design and development
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.length > 0
            ? projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  delay={index * 0.1}
                />
              ))
            : ["sk-1", "sk-2", "sk-3", "sk-4"].map((skeletonId) => (
                <div
                  key={skeletonId}
                  className="animate-pulse overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#111111]"
                >
                  <div className="aspect-video bg-[#1a1a1a]" />
                  <div className="space-y-4 p-6">
                    <div className="h-6 w-24 rounded-full bg-[#222222]" />
                    <div className="h-8 w-2/3 rounded bg-[#222222]" />
                    <div className="h-4 w-full rounded bg-[#1e1e1e]" />
                    <div className="h-4 w-4/5 rounded bg-[#1e1e1e]" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 rounded-full bg-[#222222]" />
                      <div className="h-6 w-16 rounded-full bg-[#222222]" />
                      <div className="h-6 w-16 rounded-full bg-[#222222]" />
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-[#c9ff47] px-6 py-3 font-semibold text-[#c9ff47] transition hover:bg-[#c9ff47] hover:text-[#0b0b0b]"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
