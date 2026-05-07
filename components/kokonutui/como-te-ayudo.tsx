"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const cards = [
  {
    number: "01",
    title: "Auditoría",
    description:
      "Analizo tu negocio usando el marco DICE para identificar exactamente qué está frenando tu crecimiento.",
    tags: [
      "Disponibilidad: ¿El sistema se cae?",
      "Integridad: ¿La info es confiable?",
      "Confidencialidad: ¿Está protegida?",
      "Escalabilidad: ¿Resiste más volumen?",
    ],
  },
  {
    number: "02",
    title: "Claridad",
    description:
      "Te entrego un diagnóstico honesto: qué está fallando, qué herramientas tienes sin aprovechar, y cómo destrabar tu negocio para que pueda crecer.",
    tags: [
      "Sin tecnicismos innecesarios.",
      "Solo lo que necesitas saber para tomar decisiones.",
    ],
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Construimos un plan y lo ejecutamos paso a paso. Te explico todo de forma sencilla y le echamos mano a lo que haga falta para que la solución funcione.",
    tags: ["Soluciones que se ven en el día a día, no solo en papel."],
  },
];

export default function ComoTeAyudo() {
  const [active, setActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  // Integra el hook proporcionado para cerrar el acordeón al hacer clic fuera
  useOutsideClick(containerRef, () => setActive(null));

  const toggle = (title: string) => {
    setActive((prev) => (prev === title ? null : title));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0B0B0B] to-[#1a2547] rounded-3xl">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-3">
          Cómo te ayudo
        </h2>
        <p className="text-[#E4E4E4]/60 text-center text-sm mb-12">
          Siempre voy directo al grano de forma organizada.
        </p>

        <ul ref={containerRef} className="flex flex-col gap-4">
          {cards.map((card) => {
            const isActive = active === card.title;

            return (
              <motion.li
                key={card.title}
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer select-none"
                onClick={() => toggle(card.title)}
              >
                {/* Header row */}
                <div className="flex justify-between items-center p-5">
                  <div>
                    <span className="text-xs font-semibold text-[#7C9ED9] block mb-1 tracking-wider">
                      {card.number}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {card.title}
                    </h3>
                  </div>
                  <motion.span
                    className="text-sm text-[#E4E4E4]/60 font-medium shrink-0 ml-4"
                    animate={{ opacity: 1 }}
                  >
                    {isActive ? "Cerrar" : "Ver"}
                  </motion.span>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 flex flex-col gap-4">
                        <p className="text-[#E4E4E4]/75 text-sm leading-relaxed">
                          {card.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {card.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-[#E4E4E4]/65 border border-white/10 rounded-xl px-3 py-2 bg-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
