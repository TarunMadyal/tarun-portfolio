import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Learning from "@/components/Learning";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NatureParticles from "@/components/NatureParticles";
import SectionDivider from "@/components/SectionDivider";
import FooterLandscape from "@/components/FooterLandscape";
import CampfireClosing from "@/components/CampfireClosing";

export default function Page() {
  return (
    <main>
      <NatureParticles />
      <Navbar />

      {/* Hero — full sky + forest background built in */}
      <Hero />

      {/* Transition: open meadow grass */}
      <SectionDivider variant="grass" />

      <About />

      {/* Transition: first treeline appears */}
      <SectionDivider variant="treeline" />

      <Skills />

      {/* Transition: denser treeline */}
      <SectionDivider variant="treeline" />

      <Projects />

      {/* Transition: enter the forest */}
      <SectionDivider variant="forest" />

      <Experience />

      {/* Transition: deeper forest */}
      <SectionDivider variant="forest" />

      <Learning />

      {/* Transition: forest floor undergrowth */}
      <SectionDivider variant="deep" />

      <Contact />

      {/* Closing campfire — the end of the trail */}
      <CampfireClosing />

      {/* Forest ending landscape — foot of the trail */}
      <FooterLandscape />

      <Footer />
    </main>
  );
}
