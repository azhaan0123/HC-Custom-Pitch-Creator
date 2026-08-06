/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        docBg: '#F9F5F2',
        docBorder: '#E0D8D0',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Geist Sans', 'Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        doc: ['Geist Sans', 'Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        "collapsible-down": {
          "0%": { height: "0", opacity: "0", transform: "translateY(-6px)" },
          "70%": { height: "var(--radix-collapsible-content-height)", opacity: "1", transform: "translateY(2px)" },
          "100%": { height: "var(--radix-collapsible-content-height)", opacity: "1", transform: "translateY(0)" },
        },
        "collapsible-up": {
          "0%": { height: "var(--radix-collapsible-content-height)", opacity: "1", transform: "translateY(0)" },
          "100%": { height: "0", opacity: "0", transform: "translateY(-6px)" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.35s cubic-bezier(0.34, 1.45, 0.64, 1)",
        "collapsible-up": "collapsible-up 0.22s cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [animate],
}
