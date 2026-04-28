"use client"

import FadeIn from "@/components/kokonutui/fade-in"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "¿Cuánto cuesta tu servicio?",
      answer:
        "Depende del alcance. La auditoría DICE básica tiene un precio accesible. Si luego queremos implementar el plan completo, lo definimos según el tamaño y complejidad del proyecto. Hablemos primero y te doy números claros según tu caso.",
    },
    {
      question: "¿Trabajas solo con empresas grandes?",
      answer:
        "No. Mi cliente ideal son medianas empresas que ya están creciendo pero todavía dependen mucho de procesos manuales y Excel.",
    },
    {
      question: "¿Vas a reemplazar a mi equipo con IA o automatización?",
      answer:
        "No. La tecnología no reemplaza a las personas, las potencia. Mi enfoque es integrarla de forma natural para que tu equipo trabaje mejor y con menos errores.",
    },
    {
      question: "¿Cuánto tiempo toma todo el proceso?",
      answer:
        "La auditoría inicial suele tomar pocos días. La implementación completa depende del proyecto, pero siempre trabajamos con plazos claros y realistas.",
    },
    {
      question: "¿Cómo empezamos?",
      answer:
        "Muy simple: contáctame por WhatsApp o llámame. Hablamos de tu situación y, si encaja, agendamos la auditoría.",
    },
  ]

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-abyss-blue/5 to-transparent">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-silver-mist text-center mb-4">
            Preguntas frecuentes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-abyss-blue to-transparent mx-auto mb-12" />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 border border-silver-mist/10 rounded-xl px-6 data-[state=open]:border-abyss-blue/30 transition-colors"
              >
                <AccordionTrigger className="text-silver-mist hover:text-silver-mist/80 text-left py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-silver-mist/70 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  )
}
