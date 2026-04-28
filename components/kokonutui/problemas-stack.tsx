"use client"

import { AlertTriangle, ShieldOff, TrendingDown, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface Problema {
  id: string
  number: string
  icon: React.ElementType
  title: string
  description: string
  detail: string
  colorDark: string
  colorLight: string
}

const problemas: Problema[] = [
  {
    id: "resistencia",
    number: "01",
    icon: TrendingDown,
    title: "Resistencia al cambio",
    description:
      'Todo funciona "como siempre se ha hecho", pero tus resultados ya no te permiten crecer al ritmo que quisieras.',
    detail:
      "La resistencia al cambio te está costando tiempo, plata y oportunidades. Cada semana que pasa sin actualizar tus procesos es una semana que tu competencia te lleva ventaja.",
    colorDark: "#28396D",
    colorLight: "#4A5A9D",
  },
  {
    id: "miedo",
    number: "02",
    icon: AlertTriangle,
    title: "Miedo a invertir en tecnología",
    description:
      "Sabes que necesitas invertir en tecnología, pero no sabes por dónde empezar ni cómo termina esa inversión.",
    detail:
      "No tienes claridad de qué herramientas necesitas, cuánto cuesta realmente, ni si vale la pena. Ese miedo hace que sigas usando lo que tienes aunque te frene — y eso también tiene un costo, solo que invisible.",
    colorDark: "#2D3A6D",
    colorLight: "#5A6AAD",
  },
  {
    id: "amenaza",
    number: "03",
    icon: ShieldOff,
    title: "Tecnología vista como amenaza",
    description:
      "Ves la IA y la automatización como algo frío, deshumanizante o que va a complicar más las cosas.",
    detail:
      "Es lógico sentirlo así cuando nadie te lo ha explicado bien. La tecnología mal implementada sí deshumaniza. Bien implementada, libera a tu equipo de lo repetitivo y les da tiempo para lo que realmente importa.",
    colorDark: "#1E3358",
    colorLight: "#3E5388",
  },
]

type StackState = "stacked" | "fanned" | "selected"

// Mobile positions (vertical stack)
const mobileStackPositions = [
  { x: 0, y: -8, rotate: -2, scale: 0.94 },
  { x: 0, y: 0, rotate: 0, scale: 0.97 },
  { x: 0, y: 8, rotate: 2, scale: 1 },
]

const mobileFanPositions = [
  { x: 0, y: -180, rotate: -3 },
  { x: 0, y: 0, rotate: 0 },
  { x: 0, y: 180, rotate: 3 },
]

// Desktop positions (horizontal fan)
const desktopStackPositions = [
  { x: -8, rotate: -3, y: 0, scale: 0.96 },
  { x: 0, rotate: 0, y: -6, scale: 0.98 },
  { x: 8, rotate: 3, y: -12, scale: 1 },
]

const desktopFanPositions = [
  { x: -260, rotate: -12, y: 10 },
  { x: 0, rotate: 0, y: -8 },
  { x: 260, rotate: 12, y: 10 },
]

interface CardProps {
  problema: Problema
  index: number
  stackState: StackState
  isSelected: boolean
  isMobile: boolean
  isDark: boolean
  onClickStacked: () => void
  onClickFanned: () => void
  onClickSelected: () => void
}

function ProblemCard({
  problema,
  index,
  stackState,
  isSelected,
  isMobile,
  isDark,
  onClickStacked,
  onClickFanned,
  onClickSelected,
}: CardProps) {
  const Icon = problema.icon
  const color = isDark ? problema.colorDark : problema.colorLight
  const bgBase = isDark ? "#0B0B0B" : "#FAFAFA"

  const stackPositions = isMobile ? mobileStackPositions : desktopStackPositions
  const fanPositions = isMobile ? mobileFanPositions : desktopFanPositions

  const getAnimation = () => {
    if (stackState === "stacked") {
      return {
        x: stackPositions[index].x,
        y: stackPositions[index].y,
        rotate: stackPositions[index].rotate,
        scale: stackPositions[index].scale,
        zIndex: index + 1,
        opacity: 1,
      }
    }
    if (stackState === "fanned") {
      return {
        x: fanPositions[index].x,
        y: fanPositions[index].y,
        rotate: fanPositions[index].rotate,
        scale: 1,
        zIndex: 5,
        opacity: 1,
      }
    }
    // selected state
    if (isSelected) {
      return { x: 0, y: 0, rotate: 0, scale: 1.04, zIndex: 20, opacity: 1 }
    }
    // push non-selected cards off
    if (isMobile) {
      return {
        x: 0,
        y: mobileFanPositions[index].y * 1.8,
        rotate: mobileFanPositions[index].rotate * 1.5,
        scale: 0.82,
        zIndex: 1,
        opacity: 0.15,
      }
    }
    return {
      x: fanPositions[index].x * 1.6,
      y: 60,
      rotate: fanPositions[index].rotate * 1.5,
      scale: 0.82,
      zIndex: 1,
      opacity: 0.15,
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (stackState === "stacked") onClickStacked()
    else if (stackState === "fanned") onClickFanned()
    else if (isSelected) onClickSelected()
  }

  const isDimmed = stackState === "selected" && !isSelected

  return (
    <motion.div
      animate={getAnimation()}
      className={cn(
        "absolute left-1/2 top-1/2",
        "w-[240px] xs:w-[260px] sm:w-[280px] md:w-[300px]",
        "-translate-x-1/2 -translate-y-1/2",
        "cursor-pointer select-none",
        "rounded-2xl overflow-hidden",
        "border border-border/30",
        "pointer-events-auto"
      )}
      initial={false}
      style={{ height: isMobile ? 320 : 360 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 28,
        mass: 0.9,
      }}
      onClick={handleClick}
      whileHover={
        stackState === "fanned" && !isDimmed
          ? { y: fanPositions[index].y - 10, scale: 1.03 }
          : stackState === "stacked"
          ? { scale: (stackPositions[index].scale || 1) + 0.01 }
          : {}
      }
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${color}cc 0%, ${bgBase} 70%)`,
        }}
      />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Inner border glow */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${color}55, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl"
            style={{
              background: `${color}55`,
              border: `1px solid ${color}80`,
              boxShadow: `0 0 20px ${color}40`,
            }}
          >
            <Icon size={18} strokeWidth={1.7} className="text-foreground" />
          </div>
          <span
            className="font-bold text-4xl sm:text-5xl leading-none tracking-tighter"
            style={{ color: `${color}60` }}
          >
            {problema.number}
          </span>
        </div>

        {/* Middle: title + description */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-bold text-[15px] sm:text-[17px] leading-snug tracking-tight text-foreground">
            {problema.title}
          </h3>
          <p className="text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground">
            {problema.description}
          </p>
        </div>

        {/* Bottom: detail (only in selected) */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="rounded-xl p-2 sm:p-3"
              style={{
                background: `${color}30`,
                border: `1px solid ${color}40`,
              }}
            >
              <p className="text-[11px] sm:text-[12px] leading-relaxed text-muted-foreground">
                {problema.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint when stacked (top card only) or fanned */}
        {!isSelected && (
          <motion.p
            className="text-[10px] sm:text-[10.5px] font-medium uppercase tracking-widest text-muted-foreground/50"
            animate={{
              opacity:
                stackState === "stacked" && index === 2
                  ? [0.3, 0.7, 0.3]
                  : stackState === "fanned"
                  ? 0.5
                  : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {stackState === "stacked" && index === 2
              ? "Toca para ver"
              : stackState === "fanned"
              ? "Selecciona"
              : ""}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export default function ProblemasStack() {
  const [stackState, setStackState] = useState<StackState>("stacked")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  const handleStackedClick = () => {
    setStackState("fanned")
  }

  const handleFannedClick = (id: string) => {
    setSelectedId(id)
    setStackState("selected")
  }

  const handleSelectedClick = () => {
    setSelectedId(null)
    setStackState("fanned")
  }

  const handleBackdropClick = () => {
    if (stackState === "fanned") {
      setStackState("stacked")
    } else if (stackState === "selected") {
      setSelectedId(null)
      setStackState("fanned")
    }
  }

  // Dynamic height based on state and viewport
  const containerHeight = isMobile
    ? stackState === "stacked"
      ? 380
      : stackState === "fanned"
      ? 660
      : 440
    : 440

  return (
    <div className="w-full px-4 sm:px-0">
      {/* Instruction text */}
      <motion.p
        animate={{ opacity: 1 }}
        className="mb-6 text-center text-[11px] sm:text-[12px] uppercase tracking-widest text-muted-foreground/50"
        initial={{ opacity: 0 }}
      >
        {stackState === "stacked" && "Toca el stack para explorar"}
        {stackState === "fanned" && "Selecciona un problema"}
        {stackState === "selected" && "Toca la carta para volver"}
      </motion.p>

      {/* Stack container */}
      <div
        className="relative mx-auto w-full max-w-full overflow-hidden sm:overflow-visible"
        style={{ height: containerHeight }}
        onClick={handleBackdropClick}
      >
        {problemas.map((problema, index) => (
          <ProblemCard
            index={index}
            isSelected={selectedId === problema.id}
            isMobile={isMobile}
            isDark={isDark}
            key={problema.id}
            onClickFanned={() => handleFannedClick(problema.id)}
            onClickSelected={handleSelectedClick}
            onClickStacked={handleStackedClick}
            problema={problema}
            stackState={stackState}
          />
        ))}
      </div>

      {/* Reset button when fanned or selected */}
      <AnimatePresence>
        {stackState !== "stacked" && (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            exit={{ opacity: 0, y: 4 }}
            initial={{ opacity: 0, y: 8 }}
            onClick={(e) => {
              e.stopPropagation()
              setStackState("stacked")
              setSelectedId(null)
            }}
            type="button"
          >
            <X size={11} />
            Cerrar
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
