import { Cpu, Heart, Users, Zap } from "lucide-react"

export default function About() {
  const highlights = [
    {
      icon: Cpu,
      title: "Experto Especializado",
      description: "Tengo certificaciones por entidades importantes del sector tecnológico en Colombia y el mundo.",
    },
    {
      icon: Heart,
      title: "Amor por lo que hago",
      description: "Me apasiona la tecnología y ayudar a las personas a mejorar sus vidas con ella.",
    },
    {
      icon: Users,
      title: "Enfoque Humano",
      description: "Mi trabajo es que la tecnología aumente la productividad de las personas y les ahorre tiempo, no que las reemplaze.",
    },
    {
      icon: Zap,
      title: "Acción Visible",
      description: "La meta es implementar la solución ante el problema.",
    },
  ]

  return (
    <section id="quien-soy" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          Quién soy
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-12" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              Mi nombre es <span className="text-foreground font-semibold">José Ramón</span> y ayudo a pequeñas y medianas empresas (PYMES) que ya estan creciendo pero sienten que algo las frena (y a las que no, también).
            </p>
            <p>
              Me estresa ver cuando un negocio funciona pero no al 100%, las experiencias como cliente que suelen ser incomodas y notar tecnologías que "siempre han funcionado" pero en el 2026 no son viables para el crecimiento de un negocio. No estamos para seguir usando Excel, sistemas obsoletos y MUCHO MENOS seguir tomando DESICIONES por MIEDO.
            </p>
            <p>
              Para mi la tecnología no es algo frio, complicado o deshumanizante. Es un reflejo de como funcionamos los seres humanos, son patrones que hacemos que algo los repita y cuando esta filosofía se integra a los procesos de un negocio, se siente natural, como si fuese una extensión de lo que hacemos en nuestro trabajo y no una herramienta ajena.
            </p>
            <p>
              Ayudo principalmente a <span className="text-primary font-medium">dueños de medianas empresas</span> que ya están creciendo, pero sienten que algo los frena.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-background to-card border border-border transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
