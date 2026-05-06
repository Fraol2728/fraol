"use client";

import { Linkedin, Link2, Twitter } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex flex-wrap gap-3">
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#1f1f1f] px-4 py-2 text-sm text-zinc-300 hover:border-[#c9ff47] hover:text-[#c9ff47]"> <Twitter className="mr-2 inline h-4 w-4" />Twitter</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#1f1f1f] px-4 py-2 text-sm text-zinc-300 hover:border-[#c9ff47] hover:text-[#c9ff47]"><Linkedin className="mr-2 inline h-4 w-4" />LinkedIn</a>
      <button type="button" onClick={() => navigator.clipboard.writeText(url)} className="rounded-full border border-[#1f1f1f] px-4 py-2 text-sm text-zinc-300 hover:border-[#c9ff47] hover:text-[#c9ff47]"><Link2 className="mr-2 inline h-4 w-4" />Copy link</button>
    </div>
  );
}
