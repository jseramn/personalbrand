"use client"

import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { useMounted } from "@/hooks/use-mounted"

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

export default function BeamsBackground({
  children,
}: {
  children?: React.ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const MINIMUM_BEAMS = 25

  const isDark = mounted ? resolvedTheme === "dark" : true

  function createBeam(width: number, height: number, isDarkMode: boolean): Beam {
    const angle = -35 + Math.random() * 10

    return {
      x: Math.random() * width * 1.5 - width * 0.25,
      y: Math.random() * height * 1.5 - height * 0.25,
      width: 40 + Math.random() * 80,
      length: height * 2.5,
      angle,
      speed: 1.5 + Math.random() * 2,
      opacity: isDarkMode ? 0.2 + Math.random() * 0.25 : 0.08 + Math.random() * 0.12,
      hue: isDarkMode ? 215 + Math.random() * 3 : 230 + Math.random() * 5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.04 + Math.random() * 0.05,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      beamsRef.current = Array.from({ length: MINIMUM_BEAMS }, () =>
        createBeam(canvas.width, canvas.height, isDark)
      )
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam, isDarkMode: boolean) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const opacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2)
      const saturation = isDarkMode ? 90 : 50
      const lightness = isDarkMode ? 60 : 55

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

      gradient.addColorStop(0, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, 0)`)
      gradient.addColorStop(0.3, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, ${opacity})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)

      ctx.restore()
    }

    function animate() {
      if (!(canvas && ctx)) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.filter = "blur(22px)"

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed

        if (beam.y + beam.length < -100) {
          beam.y = canvas.height + 100
        }

        drawBeam(ctx, beam, isDark)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isDark])

  return (
    <div
      className="relative min-h-screen w-full bg-background overflow-x-hidden transition-colors duration-300"
      suppressHydrationWarning
    >

      {/* CANVAS (BASE REAL) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* CAPA ANIMADA (motion) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1]"
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity }}
        suppressHydrationWarning
        style={{
          background: isDark
            ? `linear-gradient(125deg, transparent 20%, rgba(80, 90, 160, 0.15) 40%, transparent 60%)`
            : `linear-gradient(125deg, transparent 20%, rgba(43, 57, 109, 0.08) 40%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      {/* GRADIENTES RADIALES */}
      <div
        className="pointer-events-none fixed inset-0 z-[2] transition-opacity duration-300"
        suppressHydrationWarning
        style={{
          opacity: isDark ? 0.4 : 0.25,
          background: isDark
            ? `radial-gradient(ellipse 60% 70% at 0% 60%, rgba(43, 57, 109, 0.25), transparent 70%),
               radial-gradient(ellipse 50% 60% at 100% 30%, rgba(43, 57, 109, 0.2), transparent 70%)`
            : `radial-gradient(ellipse 60% 70% at 0% 60%, rgba(43, 57, 109, 0.12), transparent 70%),
               radial-gradient(ellipse 50% 60% at 100% 30%, rgba(43, 57, 109, 0.08), transparent 70%)`,
        }}
      />

      {/* CONTENIDO */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
