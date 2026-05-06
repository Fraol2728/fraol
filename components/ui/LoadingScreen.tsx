"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!sessionStorage.getItem("visited")) { setShow(true); sessionStorage.setItem("visited", "1"); setTimeout(() => setShow(false), 2000); } }, []);
  if (!show) return null;
  return <div className="fixed inset-0 z-[120] flex flex-col justify-center bg-[#080808]"><div className="text-center text-3xl font-black text-white">Your <span className="text-[#c9ff47]">Portfolio</span></div><div className="absolute right-0 bottom-0 left-0 h-1 bg-[#1f1f1f]"><div className="h-full w-full origin-left animate-pulse bg-[#c9ff47]"/></div></div>;
}
