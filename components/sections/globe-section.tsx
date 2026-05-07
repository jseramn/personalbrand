import Globe from "@/components/ui/globe"

export default function GlobeSection() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-abyss-blue">
            Huella global
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-silver-mist sm:text-3xl">
            Casos reales en distintas ciudades
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-silver-mist/65 sm:text-base">
            No son ejemplos inventados. Son resultados concretos acumulados en
            distintas localidades para que veas el alcance real del trabajo.
          </p>
        </div>

        <Globe />
      </div>
    </section>
  )
}
