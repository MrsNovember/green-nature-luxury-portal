import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyCards } from "@/components/PropertyCards";
import { ExperiencesGallery } from "@/components/ExperiencesGallery";
import { Testimonials } from "@/components/Testimonials";
import { CareerSection } from "@/components/CareerSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PropertyCards />
      <ExperiencesGallery />
      <Testimonials />
      <CareerSection />
      <Footer />
    </div>
  );
};

export default Index;
