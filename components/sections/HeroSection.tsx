"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });
const FloatingCube = dynamic(() => import("@/components/three/FloatingCube"), { ssr: false });
const headingLines = [
  { text: "Designing", className: "text-white" },
  { text: "Digital", className: "text-white" },
  { text: "Experiences", className: "text-[#c9ff47] italic" },
];

const stats = ["6+ Years Experience", "70+ Projects Done", "35+ Happy Clients"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      <ParticleField />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center justify-center gap-8 px-6 py-20 lg:flex-row lg:gap-12">
        <div className="w-full max-w-2xl">
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#c9ff47]/50 bg-[#0f0f0f] px-4 py-2 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9ff47] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c9ff47]" />
            </span>
            Available for work
          </motion.div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {headingLines.map((line, index) => (
              <motion.span
                key={line.text}
                className={`block ${line.className}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base text-zinc-300 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Graphic Designer &amp; Web Developer based in Addis Ababa, Ethiopia, crafting bold visuals and seamless digital products with personality and purpose.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <Link
              href="/projects"
              className="rounded-full bg-[#c9ff47] px-6 py-3 text-center font-semibold text-[#080808] transition hover:bg-[#dbff80]"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-center font-semibold text-white transition hover:border-[#c9ff47] hover:text-[#c9ff47]"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-zinc-300 sm:grid-cols-3 sm:gap-4 sm:text-base">
            {stats.map((stat, index) => (
              <motion.span
                key={stat}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
              >
                {stat}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <div className="hidden md:block">
            <FloatingCube />
          </div>
          <div className="mx-auto block md:hidden">
            <FloatingCube />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-xs uppercase tracking-[0.2em] text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <motion.span
          className="mt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          ⌄
        </motion.span>
      </motion.div>
    </section>
  );
}
