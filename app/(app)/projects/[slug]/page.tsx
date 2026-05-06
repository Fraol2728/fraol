import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";
import { projectBySlugQuery } from "@/lib/queries/projects";
import { client } from "@/sanity/lib/client";

type Project = {
  title: string;
  slug?: { current?: string };
  description?: string;
  thumbnail?: unknown;
  images?: unknown[];
  tags?: string[];
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
  publishedAt?: string;
  body?: unknown[];
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) {
    return { title: "Project Not Found | Portfolio" };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description ?? "Project details",
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug?: { current?: string } }>>(
    `*[_type == "project" && defined(slug.current)]{slug}`,
  );

  return slugs
    .map((item) => item.slug?.current)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
