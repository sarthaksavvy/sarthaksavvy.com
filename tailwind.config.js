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
        // `accent` is also the site's most common text colour — every italic
        // flourish word in a headline, the FAQ/AI-consulting eyebrows, stat
        // values, and every inline link that isn't part of a button. At
        // #FF5A1F it measures 2.81:1 against `paper`, short of the 3:1 WCAG AA
        // floor for large text and well short of the 4.5:1 body text needs —
        // the exact class of bug #56 fixed for accent-hover buttons, just in
        // the *rest* state this time, which is why a static screenshot never
        // caught it. `accent` itself has to stay bright, though: it is also
        // the background `hover:bg-accent` buttons switch to, and `ink` text
        // on it only clears AA (5.89:1) because `accent` is this light — a
        // uniform darkening would silently fail that pair again. `accentText`
        // is the same hue and saturation, darkened until legible on `paper`
        // (5.03:1), for every place `accent` is read as text rather than
        // painted as a surface: icons, list markers and `bg-accent` stay on
        // the original `accent`.
        accentText: "#C23300",
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
