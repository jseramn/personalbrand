"use client";

import { Cpu, Heart, User, Zap, Hand } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TILT_MAX = 5;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

export interface AboutItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ITEMS: AboutItem[] = [
  {
    icon: Cpu,
    title: "Experto Especializado",
    description:
      "Tengo certificaciones por entidades importantes del sector tecnológico en Colombia y el mundo.",
  },
  {
    icon: Heart,
    title: "Amor por lo que hago",
    description:
      "Me apasiona la tecnología y ayudar a las personas a mejorar sus vidas con ella.",
  },
  {
    icon: User,
    title: "Enfoque Humano",
    description:
      "Mi trabajo es que la tecnología aumente la productividad de las personas y les ahorre tiempo, no que las reemplace.",
  },
  {
    icon: Zap,
    title: "Acción Visible",
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
              "border-white/10 bg-[#0B0B0B] p-8 flex flex-col justify-between",
              "shadow-lg"
            )}
          >
            {/* Spotlight Glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(ellipse at 20% 20%, #28396D40, transparent 65%)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#28396D]/20 border border-[#28396D]/40">
                <Icon className="h-8 w-8 text-[#E4E4E4]" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-2 text-[#E4E4E4]/60 animate-pulse">
              <Hand className="h-4 w-4" />
              <span className="text-sm font-medium">Toca para descubrir</span>
            </div>
          </div>

          {/* BACK */}
          <div
            className={cn(
              "absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-2xl border",
              "border-[#28396D]/50 bg-[#28396D]/10 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center",
              "shadow-[0_0_30px_rgba(40,57,109,0.2)]"
            )}
          >
            <Icon className="h-6 w-6 text-[#E4E4E4] mb-6 opacity-50" />
            <p className="text-base text-[#E4E4E4] leading-relaxed">
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
    <section className="relative w-full max-w-4xl mx-auto py-12 px-4 bg-[#0B0B0B] rounded-3xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Quién soy
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#28396D] to-transparent mx-auto mt-4" />
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
