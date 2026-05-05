import Link from "next/link";

const links = ["Home", "Projects", "Blog", "About", "Contact"];
const socials = ["GitHub", "LinkedIn", "Twitter", "Dribbble"];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">YourName</h3>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Designer & developer crafting modern digital experiences.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link} href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="text-sm hover:text-[color:var(--color-primary)]">
              {link}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 md:justify-end">
          {socials.map((social) => (
            <a key={social} href="#" className="text-sm hover:text-[color:var(--color-primary)]">
              {social}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-[color:var(--color-border)] pt-4 text-xs text-[color:var(--color-muted)]">
        © {new Date().getFullYear()} YourName. All rights reserved.
      </div>
    </footer>
  );
}
