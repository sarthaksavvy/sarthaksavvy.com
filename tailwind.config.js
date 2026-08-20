/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: "#F6F3EC",
        ink: "#171410",
        // `muted` is the site's secondary text colour and nothing else — it is
        // never a background or a border. Almost everywhere it lands on 12px
        // uppercase mono with wide letter-spacing (dates, locations, stat
        // labels, section eyebrows, the footer nav), which is the least
        // forgiving shape small text can take.
        //
        // At #8A8478 it measured 3.35:1 against `paper` and 3.12:1 against the
        // `bg-line/40` stat tiles — short of the 4.5:1 WCAG AA asks of body
        // text, and short of even the 3:1 allowed for large text on those
        // tiles. Same hue (40°) and near-identical saturation, darkened until
        // it clears: 4.99:1 on `paper`, 4.65:1 on `bg-line/40`.
        muted: "#6E685C",
        line: "#E4DFD2",
        accent: "#FF5A1F",
        accent2: "#5B4CFF",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        blink: "blink 1.1s step-start infinite",
      },
    },
  },
  plugins: [],
};
