"use client"

import { useEffect, useRef, useState } from "react"

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

const MINIMUM_BEAMS = 20

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10

  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 40 + Math.random() * 80,
    length: height * 2.5,
    angle,
    speed: 1.2 + Math.random() * 1.5,
    opacity: 0.08 + Math.random() * 0.2,
    hue: 210 + Math.random() * 20,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.03 + Math.random() * 0.04,
  }
}

function useDesktopOnly() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const match = window.matchMedia("(min-width: 768px)")
    setIsDesktop(match.matches)
    const listener = () => setIsDesktop(match.matches)
    match.addEventListener("change", listener)
    return () => match.removeEventListener("change", listener)
  }, [])

  return isDesktop
}

function getThemeIsDark() {
  if (typeof window === "undefined") return true
  return document.documentElement.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches
}

export default function BeamsBackgroundClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number>(0)
  const beamsRef = useRef<Beam[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const isDesktop = useDesktopOnly()

  useEffect(() => {
    if (!isDesktop) return

    const handleIdle = () => setIsMounted(true)
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(handleIdle, { timeout: 1000 })
    } else {
      const timer = window.setTimeout(handleIdle, 800)
      return () => window.clearTimeout(timer)
    }
  }, [isDesktop])

  useEffect(() => {
    if (!isMounted || !isDesktop) return

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
        createBeam(canvas.width, canvas.height)
      )
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const isDark = getThemeIsDark()

    function drawBeam(beam: Beam) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const opacity = beam.opacity * (0.75 + Math.sin(beam.pulse) * 0.25)
      const saturation = isDark ? 80 : 55
      const lightness = isDark ? 65 : 78

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
      gradient.addColorStop(0, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, 0)`)
      gradient.addColorStop(0.3, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, ${opacity})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    const animate = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = "blur(34px)"
      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed
        if (beam.y + beam.length < -100) beam.y = canvas.height + 100
        drawBeam(beam)
      })
      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    animationFrameRef.current = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      window.cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isDesktop, isMounted])

  if (!isDesktop || !isMounted) {
    return null
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: "linear-gradient(125deg, rgba(80, 90, 160, 0.12) 30%, transparent 55%, rgba(43, 57, 109, 0.08) 80%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(74, 85, 157, 0.18), transparent 35%), radial-gradient(circle at 85% 25%, rgba(43, 57, 109, 0.12), transparent 32%)",
        }}
      />
    </>
  )
}
