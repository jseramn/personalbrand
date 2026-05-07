import dynamic from "next/dynamic"

const AboutFlipCardsGrid = dynamic(
  () => import("@/components/kokonutui/about-flip-cards").then((mod) => mod.AboutFlipCardsGrid),
  {
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[320px] rounded-3xl border border-border/30 bg-card/80"
          />
        ))}
      </div>
    ),
  }
)

export default function About() {
  return (
    <section id="quien-soy" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          Quién soy
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mb-12" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio text */}
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

          {/* Interactive flip cards — hover to reveal cada aspecto */}
          <AboutFlipCardsGrid />
        </div>
      </div>
    </section>
  )
}
