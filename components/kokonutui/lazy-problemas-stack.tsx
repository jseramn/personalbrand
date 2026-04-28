"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const ProblemasStack = dynamic(() => import("./problemas-stack"), {
  ssr: false,
})

export default function LazyProblemasStack() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="min-h-[360px]">
      {visible ? (
        <ProblemasStack />
      ) : (
        <div className="flex h-full items-center justify-center rounded-3xl border border-border/30 bg-card/80 p-6 text-center text-sm text-muted-foreground">
          Cargando problemas...
        </div>
      )}
    </div>
  )
}
