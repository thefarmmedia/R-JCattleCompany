import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#CC1B1B",
          "red-dark": "#A01414",
          "red-light": "#E02020",
          black: "#0A0A0A",
          charcoal: "#1A1A1A",
          "dark-gray": "#2A2A2A",
          "med-gray": "#555555",
          "light-gray": "#E8E8E8",
          "off-white": "#F8F6F3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0A0A0A 0%, #1A0808 50%, #0A0A0A 100%)",
        "red-gradient": "linear-gradient(135deg, #CC1B1B 0%, #A01414 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "0.8" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      boxShadow: {
        "brand": "0 4px 20px rgba(204, 27, 27, 0.3)",
        "brand-lg": "0 8px 40px rgba(204, 27, 27, 0.4)",
        "dark": "0 4px 20px rgba(0, 0, 0, 0.5)",
        "dark-lg": "0 8px 40px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
