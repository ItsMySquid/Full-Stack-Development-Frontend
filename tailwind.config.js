/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#f5f5f5',
          100: '#e0d2b8',
          200: '#c2a67f',
          300: '#a6894d',
          400: '#8a6b2a',
          500: '#734e08',
          600: '#5b3f06',
          700: '#432f04',
          800: '#2b2002',
          900: '#121100',
        },
      },
    },
  },
  plugins: [],
}
