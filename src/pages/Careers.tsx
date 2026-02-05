import { Navbar } from "@/components/Navbar";
import { CareersPage } from "@/components/CareersPage";
import { Footer } from "@/components/Footer";

const Careers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <CareersPage />
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
