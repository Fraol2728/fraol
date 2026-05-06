"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useScrollPosition } from "./useScrollPosition";
import env from "@/lib/env";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isScrolled = useScrollPosition();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full px-4 py-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-300 ${
          isScrolled
            ? "border-[color:var(--color-border)] bg-black/60 backdrop-blur-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="text-lg font-semibold text-[color:var(--color-text)]">
          {env.site.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-[color:var(--color-primary)]"
                    : "text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-text)] md:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-[color:var(--color-border)] bg-black/80 p-4 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm ${
                      isActive
                        ? "text-[color:var(--color-primary)]"
                        : "text-[color:var(--color-text)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
