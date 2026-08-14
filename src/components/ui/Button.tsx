"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:opacity-50 disabled:cursor-not-allowed",
          {
            // Variants
            "bg-brand-red text-white hover:bg-brand-red-dark shadow-brand hover:shadow-brand-lg active:scale-[0.98]":
              variant === "primary",
            "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white active:scale-[0.98]":
              variant === "outline",
            "text-brand-off-white hover:text-white hover:bg-white/10 active:scale-[0.98]":
              variant === "ghost",
            "bg-brand-charcoal text-brand-off-white hover:bg-brand-dark-gray border border-white/10 active:scale-[0.98]":
              variant === "dark",
            "bg-white text-brand-black hover:bg-brand-off-white active:scale-[0.98]":
              variant === "white",

            // Sizes
            "text-xs px-4 py-2 rounded": size === "sm",
            "text-sm px-5 py-3 rounded-md": size === "md",
            "text-base px-7 py-4 rounded-md": size === "lg",
            "text-lg px-9 py-5 rounded-md": size === "xl",

            // Width
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
