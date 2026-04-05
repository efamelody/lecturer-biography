import Navbar from "@/components/Navbar";
import Hero from '@/components/Hero';
import About from '@/components/About';
import Bio from '@/components/Bio';
import Research from '@/components/Research';
import Publications from '@/components/Publications';
import Affiliations from '@/components/Affiliations';
import Awards from '@/components/Awards';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Bio />
        <Research />
        <Publications />
        <Affiliations />
        <Awards />
      </main>
      <Footer />
    </>
  );
}
