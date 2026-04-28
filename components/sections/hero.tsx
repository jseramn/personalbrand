"use client"

import DynamicText from "@/components/kokonutui/dynamic-text"
import GlowButton from "@/components/kokonutui/glow-button"
import FadeIn from "@/components/kokonutui/fade-in"
import { MessageCircle, FileSearch } from "lucide-react"

export default function Hero() {
  const dynamicWords = ["crece", "escala", "avanza", "mejora", "evoluciona", "expande", "sube", "progresa", "prospera", "marcha", "procede", "adelanta", "fluye", "circula", "transforma", "cambia", "madura"]
  const resourceWords = ["plata", "energía", "tiempo", "esfuerzo", "recursos"]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn delay={0.2}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Si tu negocio no{" "}
            <DynamicText words={dynamicWords} className="text-primary" />
            {" "}como quieres, hay que solucionarlo... con tecnología.
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Los errores cuestan{" "}
            <DynamicText words={resourceWords} className="text-primary" />
            {" "}(varias veces)<br></br>
            Solucionarlos también (una sola vez).
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="mt-4 text-base text-muted-foreground/80 max-w-xl mx-auto">
            Mi auditoria te{" "}
            <span className="text-primary font-semibold">DICE</span>{" "}
            si la tecnología de tu negocio estara siempre disponible, si es integral, si mantiene la confidencialidad y si es escalable.
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton href="#contacto" variant="primary">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contáctame
            </GlowButton>
            <GlowButton href="#proceso" variant="secondary">
              <FileSearch className="w-5 h-5 mr-2" />
              ¿Que es DICE?
            </GlowButton>
          </div>
        </FadeIn>

        <FadeIn delay={1}>
          <div className="mt-16 flex justify-center">
            <a
              href="#quien-soy"
              className="flex flex-col items-center text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <span className="text-sm mb-2">Enterate del resto</span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
