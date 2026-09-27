/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        film: {
          void: "#050706",
          dark: "#080B09",
          surface: "#0D120F",
          panel: "#121A15",
          border: "#1C2A22",
        },
        tva: {
          bg: "#050706",
          surface: "#090D0B",
          panel: "#101613",
          border: "#1D2B22",
          "border-amber": "rgba(245, 166, 35, 0.35)",
          "border-green": "rgba(127, 207, 138, 0.35)",
          amber: "#F5A623",
          "amber-bright": "#FFB52E",
          "amber-dark": "#9A6410",
          orange: "#FF6B00",
          bone: "#E8E2D0",
          "bone-dim": "#9B9582",
          "bone-dark": "#4C493F",
          // The Cinematic Temporal Greens (TIME)
          "green-dark": "#173F32",
          green: "#245C46",
          "green-muted": "#3E7B5B",
          "green-energy": "#7FCF8A",
          "green-bright": "#A8E6A3",
          // Failure Glitch
          magenta: "#FF3366",
          cyan: "#00F0FF",
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Space Mono"', '"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'amber-sm': '0 0 10px rgba(245, 166, 35, 0.25)',
        'amber-md': '0 0 25px rgba(245, 166, 35, 0.45)',
        'green-sm': '0 0 10px rgba(127, 207, 138, 0.25)',
        'green-md': '0 0 25px rgba(127, 207, 138, 0.45)',
        'green-glow': '0 0 45px rgba(168, 230, 163, 0.5)',
      },
      animation: {
        'radar': 'radar 4s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
