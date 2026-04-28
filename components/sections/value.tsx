import { Eye, Languages, Microscope, Settings, ArrowRight } from "lucide-react"

export default function Value() {
  const values = [
    {
      icon: Eye,
      text: "Hago visible lo que otros no ven: herramientas, funciones, integraciones o posibilidades que ya usas pero no estás usando (y oportunidades para las nuevas).",
    },
    {
      icon: Languages,
      text: "Traduzco temas complejos (redes neuronales, automatización con IA, sistemas operativos, hardware, desarrollo de software) a explicaciones fáciles de entender.",
    },
    {
      icon: Microscope,
      text: "Analizo todo desde cero hasta entender el negocio como si fuese mío también.",
    },
    {
      icon: Settings,
      text: "Te acompaño en la implementación para que controles hasta el último detalle para que no queden cabos sueltos.",
    },
  ]

  const results = [
    "Procesos mas eficientes sin errores.",
    "Mayor control y visibilidad sobre tu operación.",
    "Todos los involucrados en el negocio entienden y saben de tecnología.",
    "Capacidad real para escalar tu negocio sin volverte loco.",
  ]

  return (
    <section id="valor" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          Mi valor único
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-6" />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Por estas razones es que logro <span className="text-primary font-semibold">los resultados</span> que te digo.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="group flex gap-4 p-6 rounded-2xl bg-card/50 border border-border transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Al final del proceso terminas con:
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
