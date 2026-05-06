"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";

function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const animationFrame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-20"><PageTransition>{children}</PageTransition></main>
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default AppLayout;
