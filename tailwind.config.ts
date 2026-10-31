import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brick: {
          DEFAULT: "var(--brick)",
          hover: "var(--brick-hover)",
          light: "var(--brick-light)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--muted-text)",
        },
        cream: {
          DEFAULT: "var(--cream)",
          dark: "var(--cream-dark)",
        },
        sand: {
          DEFAULT: "var(--sand)",
          light: "var(--sand-light)",
          border: "var(--sand-border)",
        },
        dark: {
          DEFAULT: "var(--dark)",
          surface: "var(--dark-surface)",
          text: "var(--dark-text)",
        },
        success: {
          DEFAULT: "var(--success)",
        },
        danger: {
          DEFAULT: "var(--danger)",
        },
      },
      fontFamily: {
        montreal: ["var(--font-montreal)", "var(--font-poppins)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.12em",
        tighterHeading: "-0.02em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
