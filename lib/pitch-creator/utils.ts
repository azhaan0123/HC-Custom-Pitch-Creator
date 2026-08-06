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

/**
 * Blends a foreground hex color with a background hex color (default white #ffffff)
 * at a given opacity ratio (0..1) to produce a solid hex color string.
 * This guarantees html2canvas and PDF export engines render the exact color tint reliably.
 */
export function blendHexColor(fgHex: string | undefined, bgHex: string = '#ffffff', alpha: number = 0.1): string {
  if (!fgHex) return '#FFF5F2';
  let c1 = fgHex.replace('#', '').trim();
  let c2 = bgHex.replace('#', '').trim();
  if (c1.length === 3) c1 = c1.split('').map((x) => x + x).join('');
  if (c2.length === 3) c2 = c2.split('').map((x) => x + x).join('');
  const num1 = parseInt(c1, 16);
  const num2 = parseInt(c2, 16);
  if (isNaN(num1) || isNaN(num2)) return '#FFF5F2';

  const r1 = (num1 >> 16) & 255;
  const g1 = (num1 >> 8) & 255;
  const b1 = num1 & 255;

  const r2 = (num2 >> 16) & 255;
  const g2 = (num2 >> 8) & 255;
  const b2 = num2 & 255;

  const r = Math.round(r1 * alpha + r2 * (1 - alpha));
  const g = Math.round(g1 * alpha + g2 * (1 - alpha));
  const b = Math.round(b1 * alpha + b2 * (1 - alpha));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
