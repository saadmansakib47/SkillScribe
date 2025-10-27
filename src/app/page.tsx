import HeroSection from "@/components/sections/HeroSection";
import FeaturedCourses from "@/components/sections/FeaturedCourses";
import Categories from "@/components/sections/Categories";
import Testimonials from "@/components/sections/Testimonials";
import HowItWorks from "@/components/sections/HowItWorks";
import CtaBanner from "@/components/sections/CtaBanner";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCourses />
      <Categories />
      <Testimonials />
      <HowItWorks />
      <CtaBanner />
    </div>
  );
}
