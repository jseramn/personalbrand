import ProcessAccordion from "@/components/kokonutui/process-accordion"

export default function Process() {
  return (
    <section id="proceso" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          Cómo te ayudo
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-6" />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Siempre voy directo al grano de forma organizada.
        </p>

        <div className="relative">
          <div className="absolute left-[27px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden sm:block" />
          <ProcessAccordion />
        </div>
      </div>
    </section>
  )
}
