"use client"

import createGlobe from "cobe"
import { useEffect, useRef } from "react"

type GlobeLocation = {
  id: string
  label: string
  count: number
  location: [number, number]
  labelOffset: [number, number]
}

const markerElevation = 0.08
const basePhi = 0.32
const baseTheta = 0.18

export const globeLocations: GlobeLocation[] = [
  {
    id: "cartagena",
    label: "Cartagena, COL",
    count: 5,
    location: [10.391, -75.479],
    labelOffset: [-108, -78],
  },
  {
    id: "los-angeles",
    label: "Los Angeles, CA",
    count: 1,
    location: [34.0522, -118.2437],
    labelOffset: [-120, -34],
  },
  {
    id: "panama-city",
    label: "Panama City, PA",
    count: 1,
    location: [8.9824, -79.5199],
    labelOffset: [18, -58],
  },
  {
    id: "valencia",
    label: "Valencia, VE",
    count: 1,
    location: [10.162, -68.0077],
    labelOffset: [26, -26],
  },
  {
    id: "orlando",
    label: "Orlando, FL",
    count: 1,
    location: [28.5383, -81.3792],
    labelOffset: [44, -78],
  },
  {
    id: "queretaro",
    label: "Queretaro, MX",
    count: 1,
    location: [20.5888, -100.3899],
    labelOffset: [-88, -86],
  },
]

const markers = globeLocations.map((entry) => ({
  id: entry.id,
  location: entry.location,
  size: entry.count > 1 ? 0.08 : 0.055,
}))

const totalCases = globeLocations.reduce((sum, entry) => sum + entry.count, 0)

function toCartesian([latitude, longitude]: [number, number]) {
  const lat = (latitude * Math.PI) / 180
  const lon = (longitude * Math.PI) / 180 - Math.PI
  const cosLat = Math.cos(lat)

  return [
    -cosLat * Math.cos(lon),
    Math.sin(lat),
    cosLat * Math.sin(lon),
  ] as const
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = basePhi
    const theta = baseTheta
    let width = 0
    let height = 0
    let animationFrame = 0
    let pointerInteracting = false
    let lastPointerX = 0
    let velocity = 0.0035

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 0,
      height: 0,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.45, 0.95],
      markerColor: [0.55, 0.75, 1],
      glowColor: [0.08, 0.12, 0.24],
      opacity: 1,
      markerElevation,
      context: {
        alpha: true,
        antialias: true,
      },
      markers,
    })

    const projectLocation = (location: [number, number]) => {
      if (!width || !height) return null

      const point = toCartesian(location)
      const radius = 0.8 + markerElevation
      const x = point[0] * radius
      const y = point[1] * radius
      const z = point[2] * radius

      const cosTheta = Math.cos(theta)
      const cosPhi = Math.cos(phi)
      const sinTheta = Math.sin(theta)
      const sinPhi = Math.sin(phi)
      const aspect = width / height

      const projectedX = cosPhi * x + sinPhi * z
      const projectedY =
        sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z
      const visible =
        -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z >= 0

      return {
        x: ((projectedX / aspect + 1) / 2) * width,
        y: ((-projectedY + 1) / 2) * height,
        visible,
      }
    }

    const updateLabels = () => {
      for (const entry of globeLocations) {
        const element = labelRefs.current[entry.id]
        const position = projectLocation(entry.location)
        if (!element || !position) continue

        const [offsetX, offsetY] = entry.labelOffset

        element.style.opacity = position.visible ? "1" : "0"
        element.style.transform = `translate(${position.x}px, ${position.y}px)`
        element.style.zIndex = position.visible ? "2" : "0"
        element.style.setProperty("--offset-x", `${offsetX}px`)
        element.style.setProperty("--offset-y", `${offsetY}px`)
      }
    }

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      globe.update({
        width: width * 2,
        height: height * 2,
      })
      updateLabels()
    }

    onResize()

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)

    const onPointerDown = (event: PointerEvent) => {
      pointerInteracting = true
      lastPointerX = event.clientX
      canvas.style.cursor = "grabbing"
      canvas.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerInteracting) return

      const deltaX = event.clientX - lastPointerX
      lastPointerX = event.clientX
      velocity = deltaX * 0.003
      phi += velocity
      globe.update({ phi, theta })
      updateLabels()
    }

    const onPointerEnd = (event: PointerEvent) => {
      pointerInteracting = false
      canvas.style.cursor = "grab"
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    canvas.style.cursor = "grab"
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerEnd)
    canvas.addEventListener("pointerleave", onPointerEnd)
    canvas.addEventListener("pointercancel", onPointerEnd)

    const animate = () => {
      if (!pointerInteracting) {
        phi += velocity
        velocity *= 0.985
        if (Math.abs(velocity) < 0.0035) {
          velocity = 0.0035
        }
      }

      globe.update({ phi, theta })
      updateLabels()
      animationFrame = window.requestAnimationFrame(animate)
    }

    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerEnd)
      canvas.removeEventListener("pointerleave", onPointerEnd)
      canvas.removeEventListener("pointercancel", onPointerEnd)
      globe.destroy()
    }
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <canvas
        ref={canvasRef}
        className="aspect-square w-full select-none touch-none bg-transparent"
        aria-label="Globo interactivo con clientes en distintas ciudades"
      />

      <div className="pointer-events-none absolute inset-0">
        {globeLocations.map((entry) => (
          <div
            key={entry.id}
            ref={(node) => {
              labelRefs.current[entry.id] = node
            }}
            className="absolute left-0 top-0 transition-opacity duration-200"
          >
            <span className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-abyss-blue/60 bg-silver-mist shadow-[0_0_14px_rgba(74,90,157,0.35)]" />

            <div
              className="absolute rounded-full border border-silver-mist/10 bg-void-eclipse/58 px-2.5 py-1 text-[10px] text-silver-mist/88 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              style={{
                transform:
                  "translate(calc(var(--offset-x) - 50%), calc(var(--offset-y) - 50%))",
              }}
            >
              <div className="whitespace-nowrap">
                <span>{entry.label}</span>
                <span className="mx-1.5 text-silver-mist/35">/</span>
                <span className="text-silver-mist/60">
                  {entry.count} {entry.count === 1 ? "caso" : "casos"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 px-2 text-center">
        <span className="rounded-full border border-abyss-blue/30 bg-card/40 px-4 py-2 text-xs uppercase tracking-[0.22em] text-silver-mist/85">
          {totalCases} casos reales
        </span>
      </div>

      <p className="mx-auto mt-4 max-w-3xl px-4 text-center text-xs leading-6 text-silver-mist/55 sm:text-sm">
        {globeLocations
          .map(
            (entry) =>
              `${entry.label} (${entry.count} ${entry.count === 1 ? "caso" : "casos"})`,
          )
          .join(" / ")}
      </p>
    </div>
  )
}
