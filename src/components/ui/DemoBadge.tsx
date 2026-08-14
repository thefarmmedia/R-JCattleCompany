import { cn } from "@/lib/utils";

interface DemoBadgeProps {
  className?: string;
  label?: string;
}

export default function DemoBadge({ className, label = "DEMO" }: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 bg-red-950/40 border border-red-800/40 text-red-400 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
      {label}
    </span>
  );
}
