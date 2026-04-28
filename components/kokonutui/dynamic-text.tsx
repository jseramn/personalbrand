"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

interface DynamicTextProps {
  words: string[]
  className?: string
}

export default function DynamicText({ words, className = "" }: DynamicTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`inline-block bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent ${className}`}
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  )
}
