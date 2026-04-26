import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import AiTools from "../components/layout/AiTools";
import Pricing from "../components/layout/Pricing";
import Testimonials from "../components/layout/Testimonials";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      {/* ✅ Features Section */}
      <div id="features" className="pt-24">
        <AiTools />
      </div>

      {/* ✅ Pricing Section */}
      <div id="pricing" className="pt-24">
        <Pricing />
      </div>

      {/* ✅ Reviews / Testimonials Section */}
      <div id="reviews" className="scroll-mt-24">
        <Testimonials />
      </div>

      <Footer />
    </>
  );
}