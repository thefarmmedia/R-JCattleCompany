import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display font-bold leading-tight",
          light
            ? "text-brand-black"
            : "text-white",
          "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed max-w-2xl",
            align === "center" ? "mx-auto" : "",
            light ? "text-gray-600" : "text-brand-off-white/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
