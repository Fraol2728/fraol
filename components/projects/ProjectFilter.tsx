"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/cards/ProjectCard";

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

const filters = [
  "All",
  "Web Development",
  "Graphic Design",
  "Branding",
  "Motion",
  "Other",
] as const;

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section className="mt-12">
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {filters.map((filter) => {
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

      <p className="mb-6 text-sm text-zinc-400">Showing {filteredProjects.length} projects</p>

      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} delay={index * 0.06} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-[#1f1f1f] bg-[#101010] px-6 py-14 text-center"
          >
            <p className="text-lg font-medium text-white">No projects found in this category</p>
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
