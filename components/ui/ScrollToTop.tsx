"use client";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const onScroll = () => setShow(window.scrollY > 400); window.addEventListener("scroll", onScroll); onScroll(); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed right-8 bottom-8 z-50 rounded-full bg-[#c9ff47] p-3 text-[#080808] shadow-lg transition ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}><ChevronUp className="h-5 w-5" /></button>;
}
