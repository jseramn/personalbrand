"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface SlideTextButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  text: string;
  hoverText: string;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export function SlideTextButton({
  text,
  hoverText,
  href = "#",
  className,
  variant = "primary",
  icon,
  ...props
}: SlideTextButtonProps) {
  const isPrimary = variant === "primary";
  const variantStyles = isPrimary
    ? "bg-[linear-gradient(110deg,#28396D,45%,#4b6cb7,55%,#28396D)] bg-[length:200%_100%] text-white hover:bg-[position:-100%_0] border border-[#28396D]"
    : "bg-transparent text-foreground border border-border hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(43,57,109,0.1)]";

  return (
    <motion.div
      animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
      className="relative"
      initial={{ x: 20, opacity: 0 }}
    >
      <Link
        className={cn(
          "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg px-8 font-medium text-md tracking-tighter transition-all duration-500 min-w-48",
          variantStyles,
          className
        )}
        href={href}
        {...props as any}
      >
        <span className="relative inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          <span className="flex h-12 items-center justify-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            <span className="font-medium">{text}</span>
          </span>
          <span className="absolute top-full left-0 flex h-12 w-full items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {icon && <span className="flex items-center">{icon}</span>}
            <span className="font-medium">{hoverText}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function SlideTextButtonDemo() {
  const whatsappIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0B0B0B] p-8 rounded-2xl w-full justify-center">
      <SlideTextButton
        text="Contáctame"
        hoverText="WhatsApp"
        variant="primary"
        icon={whatsappIcon}
      />
      <SlideTextButton
        text="¿Que es DICE?"
        hoverText="La auditoria"
        variant="secondary"
      />
    </div>
  );
}
