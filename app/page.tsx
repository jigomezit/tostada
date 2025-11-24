import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Pricing />
      <About />
      <Footer />
    </main>
  );
}

