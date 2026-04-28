"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: GlowButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl overflow-hidden transition-all duration-300"
  const variantStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-[0_0_30px_rgba(43,57,109,0.5)]"
      : "bg-transparent border border-border text-foreground hover:border-primary hover:shadow-[0_0_20px_rgba(43,57,109,0.3)]"

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Component>
  )
}
