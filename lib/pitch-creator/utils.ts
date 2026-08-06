import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a hex color string (e.g. '#ef9493' or '#0C66E4') into an RGBA string with alpha transparency.
 */
export function hexToRgba(hex: string | undefined, alpha: number): string {
  const fallback = `rgba(239, 148, 147, ${alpha})`;
  if (!hex) return fallback;
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return fallback;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
