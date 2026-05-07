  "use client";

import { Cpu, Heart, User, Zap, Hand } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AppleActivityCard from "./apple-activity-card";

export function RotatingImages({ images, className }: { images: string[], className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute w-full h-full object-contain"
          alt="Certification Logo"
        />
      </AnimatePresence>
    </div>
  )
}

const TILT_MAX = 5;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

export interface AboutItem {
  icon?: React.ElementType;
  images?: string[];
  customImage?: string;
  component?: React.ReactNode;
  title: string;
  description: string;
}

const ITEMS: AboutItem[] = [
  {
    images: [
      "/cert-logos/aws.webp",
      "/cert-logos/easycode.png",
      "/cert-logos/geekcorp.png",
      "/cert-logos/google.png",
      "/cert-logos/ibm.png",
      "/cert-logos/linkedin.svg",
      "/cert-logos/mintic.png",
      "/cert-logos/ms.webp",
      "/cert-logos/platzi.png",
      "/cert-logos/pmi-removebg-preview.png",
      "/cert-logos/sinu.png",
      "/cert-logos/unal.png"
    ],
    title: "Experto Especializado",
    description:
      "Tengo certificaciones por entidades importantes del sector tecnológico en Colombia y el mundo.",
  },
  {
    component: (
      <div className="w-full flex items-center justify-center pointer-events-none [transform:scale(0.65)] origin-center h-[140px] -mt-6">
        <AppleActivityCard title="" className="p-0 bg-transparent border-0 shadow-none" />
      </div>
    ),
    title: "Amor por lo que hago",
    description:
      "Me apasiona la tecnología y ayudar a las personas a mejorar sus vidas con ella.",
  },
  {
    customImage: "/psi.png",
    title: "Enfoque Humano",
    description:
      "Mi trabajo es que la tecnología aumente la productividad de las personas y les ahorre tiempo, no que las reemplace.",
  },
  {
    component: (
      <motion.img
        src="/guarantee.png"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="w-[86px] h-[86px] object-contain invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        alt="Garantía"
      />
    ),
    title: "Devolución como Garantia",
    description: "La meta es implementar la solución ante el problema.",
  },
];

function FlipCard({ item, dimmed, onHoverStart, onHoverEnd }: { item: AboutItem, dimmed: boolean, onHoverStart: () => void, onHoverEnd: () => void }) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);
  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    setIsFlipped(true);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    setIsFlipped(false);
    onHoverEnd();
  };

  return (
    <div 
      className="group relative h-[320px] w-full [perspective:2000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        animate={{ scale: dimmed ? 0.95 : 1, opacity: dimmed ? 0.5 : 1 }}
        className="h-full w-full"
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className={cn(
            "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out",
            isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
          )}
        >
          {/* FRONT */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden rounded-2xl border",
              "border-border bg-background p-8 flex flex-col justify-between",
              "shadow-lg"
            )}
          >
            {/* Spotlight Glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(ellipse at 20% 20%, var(--primary)40, transparent 65%)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-6">
              {item.images ? (
                <div className="flex h-16 w-32 items-center justify-center">
                  <RotatingImages images={item.images} className="w-full h-full" />
                </div>
              ) : item.customImage ? (
                <motion.img
                  src={item.customImage}
                  loading="lazy"
                  decoding="async"
                  animate={{ scale: [1.4, 1.2, 1.4], y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 object-contain invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  alt={item.title}
                />
              ) : item.component ? (
                <div className="w-full flex items-center justify-center">
                  {item.component}
                </div>
              ) : Icon && (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/40">
                  <Icon className="h-8 w-8 text-foreground" />
                </div>
              )}
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-2 text-muted-foreground animate-pulse">
              <Hand className="h-4 w-4" />
              <span className="text-sm font-medium">Toca para descubrir</span>
            </div>
          </div>

{/* BACK */}
<div
  className={cn(
    "absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-2xl border",
    "border-primary/50 bg-primary/10 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center",
    "shadow-[0_0_30px_rgba(var(--primary),0.2)]"
  )}
>
  {item.images ? (
    <div className="w-full h-24 mb-6">
      <RotatingImages images={item.images} className="w-full h-full opacity-90" />
    </div>
  ) : item.customImage ? (
    <motion.img
      src={item.customImage}
      loading="lazy"
      decoding="async"
      // Ajustado para ser idéntico al frente (escala y movimiento Y)
      animate={{ scale: [1.4, 1.2, 1.4], y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      // Tamaño w-24, h-24 y la sombra especial del frente
      className="w-24 h-24 object-contain invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6"
      alt={item.title}
    />
  ) : item.component ? (
              <div className="w-full h-24 flex items-center justify-center opacity-60 mb-6 [transform:scale(0.85)] origin-center">
                {item.component}
              </div>
            ) : Icon && (
              <Icon className="h-6 w-6 text-foreground mb-6 opacity-50" />
            )}
            <p className="text-base text-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Grid-only export — use inside an existing section to avoid duplicate headings */
export function AboutFlipCardsGrid() {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {ITEMS.map((item) => (
        <FlipCard
          key={item.title}
          item={item}
          dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
          onHoverStart={() => setHoveredTitle(item.title)}
          onHoverEnd={() => setHoveredTitle(null)}
        />
      ))}
    </div>
  );
}

/** Full standalone section with heading — use as a page-level section */
export default function AboutFlipCards() {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <section className="relative w-full max-w-4xl mx-auto py-12 px-4 bg-background rounded-3xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Quién soy
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ITEMS.map((item) => (
          <FlipCard
            key={item.title}
            item={item}
            dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
            onHoverStart={() => setHoveredTitle(item.title)}
            onHoverEnd={() => setHoveredTitle(null)}
          />
        ))}
      </div>
    </section>
  );
}
