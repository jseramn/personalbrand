"use client"

import FadeIn from "@/components/kokonutui/fade-in"
import { Search, Lightbulb, Wrench, CheckCircle } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "auditoria",
    number: "01",
    icon: Search,
    title: "Auditoría",
    description:
      "Analizo tu negocio usando el marco DICE para identificar exactamente qué está frenando tu crecimiento.",
    content: (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {[
          { label: "Disponibilidad", desc: "¿El sistema se cae?" },
          { label: "Integridad", desc: "¿La info es confiable?" },
          { label: "Confidencialidad", desc: "¿Está protegida?" },
          { label: "Escalabilidad", desc: "¿Resiste más volumen?" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20"
          >
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-foreground font-medium text-xs block">
                {item.label}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "claridad",
    number: "02",
    icon: Lightbulb,
    title: "Claridad",
    description:
      "Te entrego un diagnóstico honesto: qué está fallando, qué herramientas tienes sin aprovechar, y cómo destrabar tu negocio para que pueda crecer.",
    content: (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 mt-4">
        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          Sin tecnicismos innecesarios. Solo lo que necesitas saber para tomar decisiones.
        </p>
      </div>
    ),
  },
  {
    id: "implementacion",
    number: "03",
    icon: Wrench,
    title: "Implementación",
    description:
      "Construimos un plan y lo ejecutamos paso a paso. Te explico todo de forma sencilla y le echamos mano a lo que haga falta para que la solución funcione.",
    content: (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 mt-4">
        <Wrench className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          Soluciones que se ven en el día a día, no solo en papel.
        </p>
      </div>
    ),
  },
]

export default function Process() {
  const [openId, setOpenId] = useState<string>("auditoria")

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id))
  }

  return (
    <section id="proceso" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
            Cómo te ayudo
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-6" />
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Siempre voy directo al grano de forma organizada.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[27px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden sm:block" />

            <div className="space-y-3">
              {steps.map((step) => {
                const Icon = step.icon
                const isOpen = openId === step.id

                return (
                  <motion.div
                    key={step.id}
                    layout
                    className={cn(
                      "relative rounded-2xl border transition-colors duration-300",
                      isOpen
                        ? "border-primary/40 bg-card/80"
                        : "border-border/50 bg-card/30 hover:border-border"
                    )}
                  >
                    {/* Header row */}
                    <button
                      type="button"
                      onClick={() => toggle(step.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                    >
                      {/* Icon circle */}
                      <div
                        className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                          isOpen
                            ? "bg-primary/30 shadow-[0_0_18px_rgba(43,57,109,0.5)]"
                            : "bg-muted"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 transition-colors duration-300",
                            isOpen ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                      </div>

                      {/* Number + title */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold tracking-widest text-primary/60">
                            {step.number}
                          </span>
                          <h3
                            className={cn(
                              "font-semibold text-base transition-colors duration-300",
                              isOpen ? "text-foreground" : "text-muted-foreground"
                            )}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Chevron */}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className={cn(
                            "transition-colors duration-300",
                            isOpen
                              ? "text-primary"
                              : "text-muted-foreground/50"
                          )}
                        >
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                            {step.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
