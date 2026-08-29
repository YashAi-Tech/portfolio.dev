/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '105': '26.25rem',
        '160': '40rem',
        '275': '68.75rem',
        '312': '78rem',
      },
      spacing: {
        '100': '25rem',
        '225': '56.25rem',
      }
    },
  },
  plugins: [],
}
