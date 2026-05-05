import CTASection from "@/components/sections/CTASection";
import FeaturedPosts from "@/components/sections/FeaturedPosts";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import HeroSection from "@/components/sections/HeroSection";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <Services />
      <FeaturedPosts />
      <CTASection />
    </>
  );
}
