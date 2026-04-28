"use client"

import FadeIn from "@/components/kokonutui/fade-in"
import { Code, Zap, TrendingUp } from "lucide-react"

export default function CaseStudy() {
  return (
    <section id="casos" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-silver-mist text-center mb-4">
            Mi ultimo caso real
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-abyss-blue to-transparent mx-auto mb-12" />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-abyss-blue/30 via-abyss-blue/10 to-abyss-blue/30 rounded-3xl blur-xl opacity-50" />

            <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card via-card to-void-eclipse border border-abyss-blue/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-abyss-blue to-abyss-blue/50 flex items-center justify-center">
                  <Code className="w-6 h-6 text-silver-mist" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-silver-mist">
                    Auditoria DICE sobre uso de Fax Plus.
                  </h3>
                  <p className="text-sm text-silver-mist/60">Fax Plus</p>
                </div>
              </div>

              <div className="space-y-6 text-silver-mist/80">
                <div>
                  <h4 className="text-abyss-blue font-medium mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-abyss-blue" />
                    El problema
                  </h4>
                  <p>
                    Julia Herniak, en Panamá, utilizaba un software para enviar faxes y mensajes masivos. Dependía las opciones de la pagina de la plataforma y siempre tenia problemas para cargar listados de contactos desde archivos de Excel.
                  </p>
                </div>

                <div>
                  <h4 className="text-abyss-blue font-medium mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    La solución
                  </h4>
                  <p>
                    Audite el sistema y el uso que le daban, analicé lo que ve el cliente y lo que no, descubrí que tenía un backend completo que ella ni sabía que existía. Escribí el código necesario en Python y JavaScript para conectar todo correctamente y analizar la base de datos que tenían con mas de 5.000 contactos.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-abyss-blue/10 border border-abyss-blue/20">
                  <h4 className="text-silver-mist font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-abyss-blue" />
                    Resultado
                  </h4>
                  <p>
                    Ahora puede crear nuevos contactos sin problemas, enviar mensajes masivos y pagar a un desarrollador de software para automatizar todo porque sabe lo que necesita, descubrió capacidades que ya tenía pagadas pero no sabia que existían, gano tiempo y elimino el estres que le causaba usar la herramienta.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-silver-mist/10">
                <p className="text-silver-mist/60 text-sm italic text-center">
                  Este es mi ultimo ejemplo REAL de lo que puedo lograr cuando alguien confia en mi trabajo, tu puedes ser el proximo caso real que ponga en esta sección de mi pagina.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
