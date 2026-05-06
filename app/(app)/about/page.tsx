import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Dribbble, Github, Linkedin, Twitter } from "lucide-react";
import { aboutQuery } from "@/lib/queries/about";
import { urlFor } from "@/lib/sanity/image";
import { client } from "@/sanity/lib/client";

type About = { name?: string; role?: string; bio?: unknown[]; avatar?: unknown; resumeUrl?: string; skills?: Array<{ label?: string; category?: string }>; socialLinks?: Array<{ platform?: string; url?: string }> };

export const metadata: Metadata = { title: "About | Portfolio", description: "Learn more about who I am and what I do" };

const timeline = [
  ["2025-Present", "Independent Graphic Designer & Web Developer", "Addis Ababa, Ethiopia", "Delivering brand systems and high-performance websites for startups and local businesses."],
  ["2023-2025", "Senior UI/UX & Brand Designer", "Creative Agency", "Led cross-functional design projects, brand refreshes, and product UX improvements."],
  ["2021-2023", "Frontend Developer", "Product Startup", "Built and maintained scalable React interfaces with strong accessibility and performance practices."],
  ["2019-2021", "Graphic Designer", "Design Studio", "Created visual identities, campaign assets, and social content for growing brands."],
] as const;

export default async function AboutPage() {
  const about = await client.fetch<About | null>(aboutQuery);
  const avatar = about?.avatar ? urlFor(about.avatar).width(1000).height(1200).url() : null;
  const grouped = (about?.skills ?? []).reduce<Record<string, string[]>>((acc, skill) => {
    const key = skill.category ?? "General";
    if (!acc[key]) acc[key] = [];
    if (skill.label) acc[key].push(skill.label);
    return acc;
  }, {});

  const iconMap: Record<string, typeof Github> = { github: Github, linkedin: Linkedin, twitter: Twitter, dribbble: Dribbble };

  return <main className="bg-[#080808] text-white">
    <section className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[55%_45%]">
      <div>
        <p className="mb-4 text-xs tracking-[0.3em] text-zinc-400">— ABOUT ME —</p>
        <h1 className="text-5xl font-black md:text-7xl"><span className="text-white">I&apos;m a</span><br /><span className="text-[#c9ff47]">{about?.name ?? "Creative Professional"}</span></h1>
        <p className="mt-4 text-2xl text-zinc-400">{about?.role}</p>
        <div className="prose prose-invert mt-8 max-w-none prose-p:text-[#999999]"><PortableText value={about?.bio ?? []} /></div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {about?.resumeUrl ? <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#c9ff47] px-5 py-2 font-semibold text-[#0a0a0a]">Download Resume</a> : null}
          {(about?.socialLinks ?? []).map((social) => {
            const Icon = iconMap[(social.platform ?? "").toLowerCase()];
            if (!Icon || !social.url) return null;
            return <a key={`${social.platform}-${social.url}`} href={social.url} target="_blank" rel="noreferrer" className="rounded-full border border-[#1f1f1f] p-2 text-zinc-300 hover:border-[#c9ff47] hover:text-[#c9ff47]"><Icon className="h-4 w-4" /></a>;
          })}
        </div>
        <div className="mt-10 flex gap-8 text-sm text-zinc-400"><span>5+ Years</span><span>50+ Projects</span><span>20+ Clients</span></div>
      </div>
      <div className="relative mx-auto w-full max-w-md">
        <div className="relative rounded-2xl border-2 border-[#1f1f1f] p-3 transition hover:shadow-[0_0_30px_rgba(201,255,71,0.25)]">{avatar ? <Image src={avatar} alt={about?.name ?? "Avatar"} width={800} height={1000} className="rounded-2xl" /> : <div className="h-[520px] rounded-2xl bg-[#111111]" />}<div className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border-2 border-[#c9ff47]" /></div>
        <div className="absolute top-4 left-4 rounded-full bg-[#101010] px-4 py-2 text-sm text-white"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />Open to Work</div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-4xl font-black"><span className="text-white">Skills & </span><span className="text-[#c9ff47]">Expertise</span></h2>
      <div className="mt-10 space-y-8">{Object.entries(grouped).map(([category, skills]) => <div key={category}><h3 className="mb-3 text-xl font-bold">{category}</h3><div className="flex flex-wrap gap-2">{skills.map((s) => <span key={s} className="rounded-full border border-[#1f1f1f] bg-[#111111] px-4 py-1.5 text-sm text-zinc-400 transition hover:border-[#c9ff47] hover:text-[#c9ff47]">{s}</span>)}</div></div>)}</div>
    </section>

    <section className="mx-auto max-w-5xl px-6 pb-24">
      <h2 className="text-4xl font-black"><span className="text-white">My </span><span className="text-[#c9ff47]">Journey</span></h2>
      <div className="relative mt-12 border-l border-[#1f1f1f] pl-8">{timeline.map((item) => <div key={item[0]} className="relative mb-10"><span className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-[#c9ff47]" /><p className="text-xs text-zinc-500">{item[0]}</p><h3 className="mt-1 text-xl font-bold">{item[1]}</h3><p className="text-[#c9ff47]">{item[2]}</p><p className="mt-2 text-sm text-zinc-400">{item[3]}</p></div>)}</div>
      <Link href="/contact" className="mt-6 inline-block text-[#c9ff47]">Let&apos;s work together →</Link>
    </section>
  </main>;
}
