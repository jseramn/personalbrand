"use client"

import { motion } from "motion/react"

interface Beam {
  id: number
  x: number
  delay: number
  duration: number
  width: number
  opacity: number
}

const beams: Beam[] = [
  { id: 1, x: 5, delay: 0, duration: 12, width: 280, opacity: 0.25 },
  { id: 2, x: 25, delay: 2, duration: 14, width: 320, opacity: 0.2 },
  { id: 3, x: 45, delay: 1, duration: 13, width: 260, opacity: 0.22 },
  { id: 4, x: 65, delay: 3, duration: 15, width: 300, opacity: 0.18 },
  { id: 5, x: 85, delay: 1.5, duration: 12.5, width: 340, opacity: 0.25 },
]

function Beam({ beam }: { beam: Beam }) {
  return (
    <motion.div
      className="absolute h-[200%] pointer-events-none"
      style={{
        left: `${beam.x}%`,
        width: beam.width,
        background: `linear-gradient(
          180deg,
          transparent 0%,
          rgba(79, 172, 254, ${beam.opacity * 0.15}) 15%,
          rgba(80, 90, 160, ${beam.opacity * 0.4}) 35%,
          rgba(100, 116, 200, ${beam.opacity}) 50%,
          rgba(80, 90, 160, ${beam.opacity * 0.4}) 65%,
          rgba(79, 172, 254, ${beam.opacity * 0.15}) 85%,
          transparent 100%
        )`,
        filter: "blur(80px)",
        transform: "rotate(-25deg) translateY(-35%)",
        transformOrigin: "center",
      }}
      initial={{ 
        y: "-100%",
        opacity: 0 
      }}
      animate={{ 
        y: ["0%", "100%"],
        opacity: [0, beam.opacity, beam.opacity, 0]
      }}
      transition={{
        y: {
          duration: beam.duration,
          repeat: Infinity,
          ease: "linear",
          delay: beam.delay,
        },
        opacity: {
          duration: beam.duration,
          repeat: Infinity,
          ease: "linear",
          delay: beam.delay,
          times: [0, 0.15, 0.85, 1]
        }
      }}
    />
  )
}

export default function BackgroundPaths({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-void-eclipse">
      {/* Ambient background gradient for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 30% 30%, rgba(79, 172, 254, 0.05), transparent 60%),
            radial-gradient(ellipse 80% 60% at 70% 70%, rgba(80, 90, 160, 0.04), transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(100, 116, 200, 0.03), transparent 50%)
          `
        }}
      />
      
      {/* Animated beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {beams.map((beam) => (
          <Beam key={beam.id} beam={beam} />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
