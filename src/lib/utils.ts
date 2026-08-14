import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mileage classification for service area
export function classifyMileage(miles: number): {
  label: string;
  category: "local" | "core" | "regional" | "long-distance";
  color: string;
  description: string;
} {
  if (miles <= 75) {
    return {
      label: "Local Haul",
      category: "local",
      color: "green",
      description: "Within our primary local service area.",
    };
  } else if (miles <= 150) {
    return {
      label: "Core Service Area",
      category: "core",
      color: "blue",
      description: "Within our core regional service area.",
    };
  } else if (miles <= 300) {
    return {
      label: "Regional Haul",
      category: "regional",
      color: "amber",
      description: "Regional hauling available based on schedule and equipment.",
    };
  } else {
    return {
      label: "Long-Distance Request",
      category: "long-distance",
      color: "red",
      description: "Send us the details — longer hauls may be available.",
    };
  }
}

// Demo distance estimator (used when no routing API is configured)
export function estimateDemoDistance(fromZip: string, toZip: string): number {
  if (!fromZip || !toZip || fromZip === toZip) return 0;
  const from = parseInt(fromZip.replace(/\D/g, ""), 10) || 65556;
  const to = parseInt(toZip.replace(/\D/g, ""), 10) || 65556;
  const raw = Math.abs(from - to);
  const miles = Math.min(350, Math.max(25, (raw % 300) + 25));
  return miles;
}

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw;
}
