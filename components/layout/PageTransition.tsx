"use client";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname} className="animate-in fade-in slide-in-from-bottom-2 duration-500">{children}</div>;
}
