"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SocialButtonItem {
  icon: LucideIcon
  label: string
  href: string
}

interface SocialButtonGroupProps {
  items: SocialButtonItem[]
  className?: string
}

function SocialContactButton({
  icon: Icon,
  label,
  href,
  index,
  total,
}: SocialButtonItem & { index: number; total: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        "relative flex items-center h-10 overflow-hidden",
        "bg-muted/50 border border-border",
        "hover:bg-primary/20 hover:border-primary/40",
        "transition-colors duration-200",
        index === 0 && "rounded-l-xl",
        index === total - 1 && "rounded-r-xl",
        "border-r-0 last:border-r last:border-border"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={false}
      animate={{ width: hovered ? "auto" : 40 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Icon — always visible */}
      <span className="flex items-center justify-center w-10 h-10 shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      </span>

      {/* Label — slides in on hover */}
      <motion.span
        className="pr-4 text-sm text-muted-foreground whitespace-nowrap overflow-hidden"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.15, delay: hovered ? 0.1 : 0 }}
      >
        {label}
      </motion.span>
    </motion.a>
  )
}

export default function SocialButtonGroup({
  items,
  className,
}: SocialButtonGroupProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {items.map((item, i) => (
        <SocialContactButton
          key={item.label}
          {...item}
          index={i}
          total={items.length}
        />
      ))}
    </div>
  )
}
