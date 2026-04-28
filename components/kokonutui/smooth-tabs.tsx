"use client"

import type { LucideIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  title: string
  description?: string
  icon?: LucideIcon
  content?: React.ReactNode
  cardContent?: React.ReactNode
  color: string
}

const WaveformPath = () => (
  <motion.path
    animate={{
      x: [0, 10, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    }}
    d="M0 50 
       C 20 40, 40 30, 60 50
       C 80 70, 100 60, 120 50
       C 140 40, 160 30, 180 50
       C 200 70, 220 60, 240 50
       C 260 40, 280 30, 300 50
       C 320 70, 340 60, 360 50
       C 380 40, 400 30, 420 50
       L 420 100 L 0 100 Z"
    initial={false}
  />
)

function TabCardContent({
  title,
  description,
  fillClass,
  children,
}: {
  title: string
  description: string
  fillClass: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute bottom-0 h-32 w-full"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 420 100"
        >
          <motion.g
            animate={{ opacity: 0.15 }}
            className={fillClass}
            initial={{ opacity: 0 }}
            style={{ strokeWidth: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WaveformPath />
          </motion.g>
          <motion.g
            animate={{ opacity: 0.1 }}
            className={fillClass}
            initial={{ opacity: 0 }}
            style={{ strokeWidth: 1, transform: "translateY(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <WaveformPath />
          </motion.g>
        </svg>
      </div>
      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="space-y-2 flex-1">
          <h3 className="bg-gradient-to-r from-silver-mist via-silver-mist/90 to-silver-mist/70 bg-clip-text text-transparent font-semibold text-xl sm:text-2xl tracking-tight">
            {title}
          </h3>
          <p className="text-silver-mist/50 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  )
}

interface SmoothTabsProps {
  items: TabItem[]
  defaultTabId?: string
  className?: string
  onChange?: (tabId: string) => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    position: "absolute" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
}

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
}

export default function SmoothTabs({
  items,
  defaultTabId,
  className,
  onChange,
}: SmoothTabsProps) {
  const [selected, setSelected] = React.useState<string>(
    defaultTabId || items[0]?.id || ""
  )
  const [direction, setDirection] = React.useState(0)
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 })

  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected)
      const container = containerRef.current

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        })
      }
    }

    requestAnimationFrame(() => {
      updateDimensions()
    })

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [selected])

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected)
    const newIndex = items.findIndex((item) => item.id === tabId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setSelected(tabId)
    onChange?.(tabId)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleTabClick(tabId)
    }
  }

  const selectedItem = items.find((item) => item.id === selected)

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Card Content Area */}
      <div className="relative mb-4 flex-1">
        <div className="relative h-[240px] sm:h-[280px] w-full rounded-xl border border-silver-mist/10 bg-card overflow-hidden">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.div
              animate="center"
              className="absolute inset-0 h-full w-full bg-card will-change-transform"
              custom={direction}
              exit="exit"
              initial="enter"
              key={`card-${selected}`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              transition={transition}
              variants={slideVariants}
            >
              {selectedItem?.cardContent ??
                (selectedItem && (
                  <TabCardContent
                    description={selectedItem.description ?? ""}
                    fillClass={`fill-abyss-blue stroke-abyss-blue`}
                    title={selectedItem.title}
                  >
                    {selectedItem.content}
                  </TabCardContent>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div
        aria-label="Smooth tabs"
        className={cn(
          "relative flex items-center justify-between gap-1 py-1 px-1",
          "w-full bg-card/50",
          "rounded-xl border border-silver-mist/10",
          "transition-all duration-200"
        )}
        ref={containerRef}
        role="tablist"
      >
        {/* Sliding Background */}
        <motion.div
          animate={{
            width: dimensions.width - 8,
            x: dimensions.left + 4,
            opacity: 1,
          }}
          className="absolute z-[1] rounded-lg bg-abyss-blue"
          initial={false}
          style={{ height: "calc(100% - 8px)", top: "4px" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />

        <div
          className={cn(
            "relative z-[2] grid w-full gap-1",
            items.length === 2 && "grid-cols-2",
            items.length === 3 && "grid-cols-3",
            items.length === 4 && "grid-cols-4"
          )}
        >
          {items.map((item) => {
            const isSelected = selected === item.id
            return (
              <motion.button
                aria-controls={`panel-${item.id}`}
                aria-selected={isSelected}
                className={cn(
                  "relative flex items-center justify-center gap-1 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5",
                  "font-medium text-xs sm:text-sm transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "truncate",
                  isSelected
                    ? "text-white"
                    : "text-silver-mist/50 hover:bg-silver-mist/5 hover:text-silver-mist"
                )}
                id={`tab-${item.id}`}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el)
                  else buttonRefs.current.delete(item.id)
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                {item.icon && <item.icon className="w-4 h-4 hidden sm:block" />}
                <span className="truncate">{item.title}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
