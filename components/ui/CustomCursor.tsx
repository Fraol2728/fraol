"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = document.getElementById("cursor-dot"); const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;
    let x = 0, y = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px, ${y}px)`; ring.style.transform = `translate(${x}px, ${y}px)`; };
    document.addEventListener("mousemove", move); return () => document.removeEventListener("mousemove", move);
  }, []);
  return <><div id="cursor-dot" className="pointer-events-none fixed z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9ff47] md:block"/><div id="cursor-ring" className="pointer-events-none fixed z-[99] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9ff47]/80 transition-transform duration-150 md:block"/></>;
}
