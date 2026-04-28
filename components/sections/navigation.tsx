"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const navItems = [
  { label: "Quién soy", href: "#quien-soy" },
  { label: "Qué hago", href: "#problemas" },
  { label: "Cómo lo hago", href: "#proceso" },
  { label: "Qué aporto", href: "#valor" },
  { label: "Casos reales", href: "#casos" },
  { label: "Contacto", href: "#contacto" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              JR<span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-primary/10 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/95"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative pt-20 px-6 transition-transform duration-200 ease-out">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
