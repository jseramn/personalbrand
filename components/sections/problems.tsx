"use client"

import FadeIn from "@/components/kokonutui/fade-in"
import ProblemasStack from "@/components/kokonutui/problemas-stack"

export default function Problems() {
  return (
    <section
      id="problemas"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
            Los problemas que resuelvo
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-6" />
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Estas son las 3 situaciones comunes que no permiten que un negocio
            crezca, la buena noticia es que las entiendo a la perfección y por
            eso te puedo ayudar.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <ProblemasStack />
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mt-12 text-lg">
            Las entiendo muy bien, por eso puedo darte soluciones{" "}
            <span className="text-primary">
              más simples, más humanas y más potentes
            </span>{" "}
            de lo que parece a simple vista.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
