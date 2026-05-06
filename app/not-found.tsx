import Link from "next/link";
import FloatingCube from "@/components/three/FloatingCube";

export default function NotFound() {
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-6 text-center text-white"><FloatingCube /><div className="relative z-10"><p className="text-8xl font-black text-[#c9ff47] md:text-[12rem]">404</p><h1 className="text-3xl font-bold">Page Not Found</h1><p className="mt-2 text-[#999]">Looks like this page doesn&apos;t exist</p><Link href="/" className="mt-6 inline-block rounded-lg bg-[#c9ff47] px-6 py-3 font-semibold text-[#080808]">Back to Home</Link></div></main>;
}
