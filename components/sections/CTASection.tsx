"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
};

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-40 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,255,71,0.06),transparent_60%)]" />
      {["top-10 left-10", "top-1/2 right-10", "bottom-10 left-1/3"].map((pos) => (
        <motion.div
          key={pos}
          className={`pointer-events-none absolute ${pos} h-80 w-80 rounded-full bg-[#c9ff47]/[0.04] blur-3xl`}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.45 }}
          className="mb-6 flex items-center gap-3 text-xs tracking-[0.25em] text-zinc-400"
        >
          <span className="h-px w-12 bg-zinc-700" />
          READY TO WORK TOGETHER?
          <span className="h-px w-12 bg-zinc-700" />
        </motion.p>

        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-5xl font-black leading-[0.95] sm:text-7xl md:text-8xl"
        >
          <span className="block">Let&apos;s Build</span>
          <span className="block">Something</span>
          <span className="block italic text-[#c9ff47]">Amazing</span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          Have a project in mind? I&apos;d love to hear about it. Let&apos;s create
          something that stands out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-[#c9ff47] px-8 py-3 text-sm font-bold text-[#0a0a0a] transition hover:scale-105 hover:brightness-110"
          >
            Start a Project
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-[#c9ff47] px-8 py-3 text-sm font-bold text-[#c9ff47] transition hover:bg-[#c9ff47] hover:text-[#0a0a0a]"
          >
            View My Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
