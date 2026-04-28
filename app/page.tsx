import BeamsBackground from "@/components/kokonutui/beams-background"
import Navigation from "@/components/sections/navigation"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Problems from "@/components/sections/problems"
import Process from "@/components/sections/process"
import Value from "@/components/sections/value"
import CaseStudy from "@/components/sections/case-study"
import FAQ from "@/components/sections/faq"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <BeamsBackground>
      <Navigation />
      <main className="scroll-smooth">
        <Hero />
        <About />
        <Problems />
        <Process />
        <Value />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </BeamsBackground>
  )
}
