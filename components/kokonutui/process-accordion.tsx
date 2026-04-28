"use client"

import { useState } from "react"

const steps = [
  {
    id: "auditoria",
    number: "01",
    title: "Auditoría",
    description:
      "Analizo tu negocio usando el marco DICE para identificar exactamente qué está frenando tu crecimiento.",
    details: [
      "Disponibilidad: ¿El sistema se cae?",
      "Integridad: ¿La info es confiable?",
      "Confidencialidad: ¿Está protegida?",
      "Escalabilidad: ¿Resiste más volumen?",
    ],
  },
  {
    id: "claridad",
    number: "02",
    title: "Claridad",
    description:
      "Te entrego un diagnóstico honesto: qué está fallando, qué herramientas tienes sin aprovechar, y cómo destrabar tu negocio para que pueda crecer.",
    details: [
      "Sin tecnicismos innecesarios.",
      "Solo lo que necesitas saber para tomar decisiones.",
    ],
  },
  {
    id: "implementacion",
    number: "03",
    title: "Implementación",
    description:
      "Construimos un plan y lo ejecutamos paso a paso. Te explico todo de forma sencilla y le echamos mano a lo que haga falta para que la solución funcione.",
    details: [
      "Soluciones que se ven en el día a día, no solo en papel.",
    ],
  },
]

export default function ProcessAccordion() {
  const [openId, setOpenId] = useState("auditoria")

  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const isOpen = openId === step.id
        return (
          <div
            key={step.id}
            className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
              isOpen ? "border-primary/40 bg-card/80" : "border-border/50 bg-card/30"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : step.id)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
              aria-expanded={isOpen}
            >
              <div>
                <p className="text-xs font-bold tracking-widest text-primary/60">{step.number}</p>
                <h3 className={`text-base font-semibold ${isOpen ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </h3>
              </div>
              <span className="text-muted-foreground">{isOpen ? "Cerrar" : "Ver"}</span>
            </button>

            {isOpen && (
              <div className="border-t border-border/50 px-5 pb-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {step.details.map((detail, index) => (
                    <div key={index} className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-[13px] text-muted-foreground">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
