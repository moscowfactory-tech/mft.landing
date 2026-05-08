import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Cases from "@/components/landing/Cases";
import Process from "@/components/landing/Process";
import Stack from "@/components/landing/Stack";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Cases />
        <Process />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
